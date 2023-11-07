namespace WebutviklingsEksamen.Models;
using WebutviklingsEksamen.Interfaces;


public class Driver : IDriver
{
    public int Id { get; set; }
    public string? Name { get; set; }
    public int Age { get; set; }
    public string? Nationality { get; set; }
    public string? DriverImage { get; set; }
}