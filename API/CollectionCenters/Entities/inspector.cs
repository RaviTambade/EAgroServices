using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Transflower.EAgroServices.CollectionCenters.Entities;

[Table("inspectors")]
public class Inspector
{
    [Key]
    [Column("id")]
    public int Id { get; set; }

    [Column("userid")]
    public int UserId { get; set; }

    [Column("collectioncenterid")]
    public int CollectionCenterId { get; set; }
}
    