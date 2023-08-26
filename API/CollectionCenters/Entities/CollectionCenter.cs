using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Transflower.EAgroServices.CollectionCenters.Entities;

[Table("collectioncenters")]
public class CollectionCenter
{
    [Key]
    [Column("id")]
    public int Id { get; set; }

    [Column("corporateid")]
    public int CorporateId { get; set; }

    [Column("managerid")]
    public int ManagerId { get; set; }
}
