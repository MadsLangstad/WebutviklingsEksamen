namespace WebutviklingsEksamen.Models;
using WebutviklingsEksamen.Interfaces;

public class Race : IRace
{
    public int Id { get; set; }
    public string? GrandPrix { get; set; }
    public string? Winner { get; set; }
    public int Laps { get; set; }
    public string? Image { get; set; }
}