
namespace AuthAPI.Models

{

    public class AuthenticateResponse{

     public int UserId {get;set;}

     public string ContactNumber{get;set;}

     public string Password{get;set;}


     public string Token {get;set;}



    public AuthenticateResponse(User user, string token){
      UserId =user.UserId;
      ContactNumber= user.ContactNumber;
      Password=user.Password;
      Token=token;
    }

    }
    
}