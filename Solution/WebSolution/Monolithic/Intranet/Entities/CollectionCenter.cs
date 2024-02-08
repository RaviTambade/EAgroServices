using Domain.Entities.Attributes;   
namespace Intranet.Entities;
[TableAttribute("collectioncenters")]
public class CollectionCenter
{
    public int Id { get; set; }
    public int CorporateId { get; set; }
    public int ManagerId { get; set; }
}