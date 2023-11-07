namespace WebutviklingsEksamen.Models;
using WebutviklingsEksamen.Interfaces;

public class Team : ITeam
{
    public int Id { get; set; }
    public string? Manufacturer { get; set; }
    public string? CarImageDriver1 { get; set; }
    public string? CarImageDriver2 { get; set; }
}