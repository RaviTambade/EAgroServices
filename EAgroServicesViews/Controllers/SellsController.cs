using System.Collections.Generic;
using System.Runtime.Versioning;
using System.Text;
using System.Threading.Tasks;
using EAgroServicesViews.Models;
using EAgroServicesViews.Models.PurchaseModels;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
namespace EAgroServicesViews.Controllers;
[Route("sells")]
public class SellsController: Controller{
    [HttpGet("showall")]
    public async Task<IActionResult> ShowAll(){
        List<SellBillingView> sellBillingViews=new List<SellBillingView>();
        using(var httpClient = new HttpClient())
        {
            using(var response=await httpClient.GetAsync("http://localhost:5182/api/sells/getallsells"))
            {
            var apiResponse=await response.Content.ReadAsStringAsync();
            sellBillingViews=JsonConvert.DeserializeObject<List<SellBillingView>>(apiResponse);
            return View(sellBillingViews);
            }
        }
    }
}