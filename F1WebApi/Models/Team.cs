namespace WebutviklingsEksamen.Models;
using WebutviklingsEksamen.Interfaces;

public class Team : ITeam
{
    public int Id { get; set; }
    public string? FullTeamName { get; set; }
    public string? Base { get; set; }
    public string? TeamChief { get; set; }
    public string? TechnicalChief { get; set; }
    public string? Chassis { get; set; }
    public string? PowerUnit { get; set; }
    public string? FirstTeamEntry { get; set; }
    public string? WorldChampionships { get; set; }
    public string? HighestRaceFinish { get; set; }
    public int PolePositions { get; set; }
    public string? FastestLaps { get; set; }
    public string? Image { get; set; }
}