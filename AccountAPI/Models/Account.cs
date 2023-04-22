
using System.ComponentModel.DataAnnotations.Schema;
namespace AccountAPI.Models
{
    public class Account
    {
        [Column("account_id")]
        public int AccountId{get;set;}
        [Column("account_number")]

        public string AccountNumber{get;set;}
        [Column("ifsc_code")]
        public string IfscCode{get;set;}

    }

}




// CREATE TABLE
//     accounts(
//         account_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
//         account_number VARCHAR(20),
//         ifsc_code VARCHAR(20)
//     );