using System.ComponentModel.DataAnnotations.Schema;

namespace UserRolesManagement.Entities
{
    public class UserRole
    {
        [Column("id")]
        public int Id { get; set; }

        [Column("userid")]
        public int UserId { get; set; }

        [Column("roleid")]
        public int RoleId { get; set; }
    }
}
