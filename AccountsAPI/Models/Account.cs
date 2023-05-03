using System.ComponentModel.DataAnnotations.Schema;
namespace AccountsAPI.Models
{
    public class Account
    {
        [Column("account_id")]
        public int AccountId { get; set; }
        [Column("account_number")]

        public string AccountNumber { get; set; }
        [Column("ifsc_code")]
        public string IfscCode { get; set; }
        [Column("user_id")]
        public int UserId { get; set; }

    }

}
