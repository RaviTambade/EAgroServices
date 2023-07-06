namespace VendorsAPI.Models;
public class VendorsFareDetails
{
    private double ratePerKm;
    private double freightCharges;
    public string? VehicleNumber { get; set; }
    public string? FromDestination { get; set; }
    public string? ToDestination { get; set; }
    public int Kilometers { get; set; }
    public double RatePerKm
    {
        get => ratePerKm = Math.Round(ratePerKm, 2);
        set => ratePerKm = value;
    }
    public double FreightCharges
    {
        get => freightCharges = Math.Round(freightCharges, 2);
        set => freightCharges = value;
    }
    public DateTime Date { get; set; }
}
