using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Transflower.EAgroServices.Shipments.Entities;

[Table("transporters")]
public class Transporter
{
    [Key]
    [Column("id")]
    public int Id { get; set; }

    [Column("corporateid")]
    public int CorporateId { get; set; }

    [Column("managerid")]
    public int ManagerId { get; set; }
}
