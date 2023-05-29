using System.Text.Json.Serialization;
namespace VendorsAPI.Models;
public class VendorsVehicleHistory
{
    private double totalFreightCharges;
    public double TotalFreightCharges
    {
        get => totalFreightCharges = Math.Round(totalFreightCharges, 2);
        set => totalFreightCharges = value;
    }

    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingDefault)]
    public string? Month { get; set; }
    public string? VehicleNumber { get; set; }
    public int Year { get; set; }
}