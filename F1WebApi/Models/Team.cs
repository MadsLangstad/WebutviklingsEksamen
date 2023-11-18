namespace WebutviklingsEksamen.Models;
using WebutviklingsEksamen.Interfaces;

public class Team : ITeam
{
    public int Id { get; set; }
    public string? FullTeamName { get; set; }
    public string? Base { get; set; }
    public string? WorldChampionships { get; set; }
    public string? Image { get; set; }
}