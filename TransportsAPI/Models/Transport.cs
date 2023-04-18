
using System.ComponentModel.DataAnnotations.Schema;

namespace TransportsAPI.Models;

public class Transport
{
    [Column("truck_id")]
    public int TruckId { get; set; }
    [Column("truck_number")]
    public string? TruckNumber { get; set; }

    [Column("office_name")]
    public string? OfficeName { get; set; }

    [Column("owner_name")]
    public string? OwnerName { get; set; }

    [Column("location")]
    public string? Location { get; set; }

    [Column("contact_number")]
    public long ContactNumber { get; set; }

    [Column("account_number")]
    public string? AccountNumber { get; set; }

    [Column("ifsc_code")]
    public string? IFSCCode { get; set; }
}