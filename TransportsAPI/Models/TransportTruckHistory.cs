
namespace TransportsAPI.Models;
public class TransportTruckHistory
{
    private double totalFreightCharges;

    public int TransportId { get; set; }
    public double TotalFreightCharges { get => totalFreightCharges=Math.Round(totalFreightCharges,2); set => totalFreightCharges = value; }
    public string? Month { get; set; }
    public string? TruckNumber { get; set; }
    public int Year { get; set; }
}