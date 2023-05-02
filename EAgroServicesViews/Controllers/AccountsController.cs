using System.Text;
using System.Threading.Tasks;
using EAgroServicesViews.Models.AccountModel;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
namespace EAgroServicesViews.Controllers;
[Route("Accounts")]
public class AccountsController : Controller
{
      [HttpGet("showall")]
    public async Task<IActionResult> ShowAll()
    {
     List<Account> accounts = new List<Account>();

        using (var httpClient = new HttpClient())
        {
            using (var response = await httpClient.GetAsync("http://localhost:5107/api/accounts/getallaccounts"))
            {
                var apiResponse = await response.Content.ReadAsStringAsync();
                accounts = JsonConvert.DeserializeObject<List<Account>>(apiResponse);
                return View(accounts);
            }
}
}
}