
using TransportsAPI.Context;
using TransportsAPI.Models;
using TransportsAPI.Repositories.Interfaces;

namespace TransportsAPI.Repositories;

public class TransportRepository : ITransportRepository
{
    public List<Transport> GetAllTransports()
    {
        try
        {
            using (var context = new TransportContext())
            {
                var transports = context.Transports.ToList();
                foreach (var transport in transports)
                {
                    Console.WriteLine(transport.TruckNumber);
                }
                return transports;
            }
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            throw e;
        }
    }


    public Transport GetTransportById(string id)
    {
        using (var context = new TransportContext())
        {
            var transport = context.Transports.Find(id);

            return transport;
        }
    }

    public bool InsertTransport(Transport transport)
    {
        bool status = false;
        using (var context = new TransportContext())
        {
            context.Transports.Add(transport);
            context.SaveChanges();
            status = true;
        }
        return status;
    }

    public bool UpdateTransport(Transport transport)
    {
        bool status = false;

        using (var context = new TransportContext())
        {
            var oldTransport = context.Transports.Find(transport.TruckNumber);
            oldTransport.OwnerName = transport.OwnerName;
            oldTransport.OfficeName = transport.OfficeName;
            oldTransport.AccountNumber = transport.AccountNumber;
            oldTransport.IFSCCode = transport.IFSCCode;
            oldTransport.Location = transport.Location;
            oldTransport.ContactNumber = transport.ContactNumber;

            context.SaveChanges();
            status = true;
        }
        return status;
    }


    public bool DeleteTransport(string id)
    {
        bool status = false;

        using (var context = new TransportContext())
        {
            context.Transports.Remove(context.Transports.Find(id));
            context.SaveChanges();
            status= true;
        }
        return status;
    }


}