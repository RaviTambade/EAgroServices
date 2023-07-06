using System.Text;
using EAgroServicesViews.Models.PurchaseModels;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace EAgroServicesViews.Controllers;
[Route("purchase")]
public class PurchaseController : Controller
{
    [HttpGet("showall")]
    public async Task<IActionResult> ShowAll()
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

    [HttpGet("showbyid/{id}")]
    public async Task<IActionResult> ShowById(int id)
    {
        PurchaseViewModel item = new PurchaseViewModel();

        using (var httpClient = new HttpClient())
        {
            using (var response = await httpClient.GetAsync("http://localhost:5171/api/purchase/getbyid/" + id))
            {
                var apiResponse = await response.Content.ReadAsStringAsync();
                item = JsonConvert.DeserializeObject<PurchaseViewModel>(apiResponse);
                return View(item);
            }
        }
    }


    [HttpGet("additem")]
    public async Task<IActionResult> AddItem()
    {
        ViewBag.farmers= await GetFarmers();
        ViewBag.varieties= await GetVarieties();
        return View();
    }

    [HttpGet("getfarmers")]
    public async Task<List<Farmer>> GetFarmers()
    {
        using (var httpClient = new HttpClient())
        {
            using (var response = await httpClient.GetAsync("http://localhost:5141/api/farmers/getallfarmers"))
            {
                var apiResponse = await response.Content.ReadAsStringAsync();
                List<Farmer>? farmers = JsonConvert.DeserializeObject<List<Farmer>>(apiResponse);
                return farmers;
            }
        }
    }

[HttpGet("getvarieties")]
    public async Task<List<Variety>> GetVarieties()
    {
        using (var httpClient = new HttpClient())
        {
            using (var response = await httpClient.GetAsync("http://localhost:5224/api/Variety/getall"))
            {
                var apiResponse = await response.Content.ReadAsStringAsync();
                List<Variety>? varieties = JsonConvert.DeserializeObject<List<Variety>>(apiResponse);
                return varieties;
            }
        }
    }

    [HttpPost("additem")]
    public async Task<IActionResult> AddItem(PurchaseItem item)
    {
        var data = JsonConvert.SerializeObject(item);
        var requestContent = new StringContent(data, Encoding.UTF8, "application/json");
        using (var httpClient = new HttpClient())
        {
            using (var response = await httpClient.PostAsync("http://localhost:5171/api/purchase/insert", requestContent))
            {
                response.EnsureSuccessStatusCode();
                string content = await response.Content.ReadAsStringAsync();
                string res = JsonConvert.DeserializeObject<string>(content);
                if (res == "true")
                {
                    return RedirectToAction("ShowAll");
                }
                else
                {
                    Console.WriteLine("Error while adding");
                    return RedirectToAction("Error");
                }
            }
        }
    }

     [HttpGet("updateitem/{id}")]
    public async Task<IActionResult> UpdateItem(int id)
    {
        ViewBag.farmers= await GetFarmers();
        ViewBag.varieties= await GetVarieties();
      PurchaseViewModel item = new PurchaseViewModel();

        using (var httpClient = new HttpClient())
        {
            using (var response = await httpClient.GetAsync("http://localhost:5171/api/purchase/getbyid/" + id))
            {
                var apiResponse = await response.Content.ReadAsStringAsync();
                item = JsonConvert.DeserializeObject<PurchaseViewModel>(apiResponse);
                return View(item);
            }
        }
    }

    [HttpPost("updateitem/{id}")]
    public async Task<IActionResult> UpdateItem(PurchaseItem item)
    {
        var data = JsonConvert.SerializeObject(item);
        var requestContent = new StringContent(data, Encoding.UTF8, "application/json");
        using (var httpClient = new HttpClient())
        {
            using (var response = await httpClient.PutAsync("http://localhost:5171/api/purchase/update/"+item.PurchaseId, requestContent))
            {
                response.EnsureSuccessStatusCode();
                string content = await response.Content.ReadAsStringAsync();
                string res = JsonConvert.DeserializeObject<string>(content);
                if (res == "true")
                {
                    return RedirectToAction("ShowAll");
                }
                else
                {
                    Console.WriteLine("Error while adding");
                    return RedirectToAction("Error");
                }
            }
        }
    }
}
