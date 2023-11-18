namespace WebutviklingsEksamen.Models;
using WebutviklingsEksamen.Interfaces;


public class Driver : IDriver
{
    public int Id { get; set; }
    public string? Name { get; set; }
    public string? Team { get; set; }
    public string? Country { get; set; }
    public string? Image { get; set; }
}