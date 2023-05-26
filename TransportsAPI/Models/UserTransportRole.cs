namespace TransportsAPI.Models;

public class UserTransportRole
{
    public User user { get; set; }
    public Transport transport { get; set; }
    public UserRole userRole { get; set; }
}
