using System.ComponentModel.DataAnnotations.Schema;

namespace CollectionAPI.Models;

public class Role
{
    [Column("id")]
    public int Id { get; set; }

    [Column("name")]
    public string? Name { get; set; }
}
