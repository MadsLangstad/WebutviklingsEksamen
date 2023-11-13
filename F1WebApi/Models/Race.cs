namespace WebutviklingsEksamen.Models;
using WebutviklingsEksamen.Interfaces;

public class Race : IRace
{
    public int Id { get; set; }
    public string? GrandPrix { get; set; }
    public DateTime Date { get; set; }
    public string? Winner { get; set; }
    public string? Car { get; set; }
    public int Laps { get; set; }
    public TimeSpan Time { get; set; }
    public string? Image { get; set; }
}