using AddressAPI.Models;
using AddressAPI.Contexts;
using AddressAPI.Repository;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;
namespace AddressAPI.Repository;
    public class AddressRepository:IAddressRepository{
        
        private readonly IConfiguration _configuration;

    public AddressRepository(IConfiguration configuration)
    {
        _configuration = configuration;
    } 

    public async Task<List<Address>> GetAddresses(){

          try  {
            using (var context = new AddressContext(_configuration))
            {
                var address = await context.Addresses.ToListAsync();
                if (address == null)
                {
                    return null;
                }
                return address;
            }
        } catch (Exception e)
        {
            Console.WriteLine(e);
            throw e;
        }  
}
public async Task<Address>GetAddress(int id){
    try{
    using (var context = new AddressContext(_configuration))
    {
        var address= await context.Addresses.FindAsync(id);
     if (address == null)
                {
                    return null;
                }
                return address;
            }
        } catch (Exception e)
        {
            Console.WriteLine(e);
            throw e;
        }  
}

public async Task<Address>UserAddress(int userid){
    try{
    using (var context = new AddressContext(_configuration))
    {
        var address= await context.Addresses.FindAsync(userid);
     if (address == null)
                {
                    return null;
                }
                return address;
            }
        } catch (Exception e)
        {
            Console.WriteLine(e);
            throw e;
        }  
}

// public async Task<bool>Insert(Address addresses){

//         bool status = false;
//     try{
//     using (var context = new AddressContext(_configuration))
//     {
//         var address= await context.Addresses.SaveChangesAsync(addresses);
//      if (address != null)
//                 {
//                     return null;
//                 }
//                 return status;
//             }
//         } catch (Exception e)
//         {
//             Console.WriteLine(e);
//             throw e;
//         }  
// }
public async Task<bool>Update(int addressid,Address addresses){

        bool status = false;

    try{
    using (var context = new AddressContext(_configuration))
    {
        var oldAddress= await context.Addresses.FindAsync(addressid,addresses);
     if (oldAddress != null)
                {
                    oldAddress.State = addresses.State;
                    oldAddress.District=addresses.District;
                    oldAddress.Taluka = addresses.Taluka;
                    oldAddress.Village = addresses.Village;
                    await context.SaveChangesAsync();
                    return true;
                }
                return status;
            }
        } catch (Exception e)
        {
            Console.WriteLine(e);
            throw e;
        }  
}
public async Task<bool>Delete(int id){
        bool status = false;

    try{
    using (var context = new AddressContext(_configuration))
    {
        var address= await context.Addresses.FindAsync(id);
     if (address != null)
                {
                    context.Addresses.Remove(address);
                    await context.SaveChangesAsync();
                    status = true;
                }
                return status;
            }
        } catch (Exception e)
        {
            Console.WriteLine(e);
            throw e;
        }  
}
    }
    