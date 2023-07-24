using System.Globalization;
using System.Security;

namespace Shipments.Models;
public class VehicleCorporateShipment{
    public int CorporateId{get;set;}
    public string VehicleType{get;set;}
    public string RtoNumber{get;set;}
    public int Kilometers{get;set;}
    public string Status{get;set;}
    public DateTime ShipmentDate{get;set;}
    
    
}