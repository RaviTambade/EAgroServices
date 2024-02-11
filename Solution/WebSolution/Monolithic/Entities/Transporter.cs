using Domain.Entities.Attributes;   
namespace Intranet.Entities;
[TableAttribute("transporters")]
public class Transporter
{
    public int Id { get; set; }
    public int CorporateId { get; set; }
    public int ManagerId { get; set; }
}
