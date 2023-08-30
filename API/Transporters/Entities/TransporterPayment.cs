using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Transflower.EAgroServices.Transporters.Entities;

[Table("transporterpayments")]
public class TransporterPayment
{
    [Key]
    [Column("id")]
    public int Id { get; set; }

    [Column("shipmentid")]
    public int ShipmentId { get; set; }

    [Column("paymentid")]
    public int PaymentId { get; set; }
}
