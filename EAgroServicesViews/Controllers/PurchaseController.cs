using System.Threading.Tasks;
using EAgroServicesViews.Models.PurchaseModels;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace EAgroServicesViews.Controllers;

public class PurchaseController : Controller
{
    // private static readonly HttpClient client = new HttpClient();

    public async Task<IActionResult> GetAll()
    {
        List<PurchaseViewModel> items = new List<PurchaseViewModel>();

        using (var httpClient = new HttpClient())
        {
            using (var response = await httpClient.GetAsync("http://localhost:5171/api/purchase/getallpurchaseitems"))
            {
                var apiResponse = await response.Content.ReadAsStringAsync();
                items = JsonConvert.DeserializeObject<List<PurchaseViewModel>>(apiResponse);
                return View(items);
            }
        }
    }

    public IActionResult Privacy()
    {
        return View();
    }
}
