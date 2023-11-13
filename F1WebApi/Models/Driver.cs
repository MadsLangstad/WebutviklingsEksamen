namespace WebutviklingsEksamen.Models;
using WebutviklingsEksamen.Interfaces;


public class Driver : IDriver
{
    public int Id { get; set; }
    public string? Name { get; set; }
    public string? Team { get; set; }
    public string? Country { get; set; }
    public int? Podiums { get; set; }
    public double Points { get; set; }
    public int GrandsPrixEntered { get; set; }
    public int? WorldChampionships { get; set; }
    public string? HighestRaceFinish { get; set; }
    public int HighestGridPosition { get; set; }
    public DateTime DateOfBirth { get; set; }
    public string? PlaceOfBirth { get; set; }
    public string? Image { get; set; }
}