namespace WebutviklingsEksamen.Models;
using WebutviklingsEksamen.Interfaces;

public class Race : IRace
{
    public int Id { get; set; }
    public string? WinnerName { get; set; }
    public double WinnerTime { get; set; }
    public string? GrandPrix { get; set; }
    public int NumberOfLaps { get; set; }
}