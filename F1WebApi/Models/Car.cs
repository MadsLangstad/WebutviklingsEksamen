namespace WebutviklingsEksamen.Models;
using WebutviklingsEksamen.Interfaces;

public class Car : ICar
{
    public int Id { get; set; }
    public int Season { get; set; }
    public string? Chassis { get; set; }
    public string? Motor { get; set; }
    public string? Tires { get; set; }
    public int Point { get; set; }
    public int Place { get; set; }
}
