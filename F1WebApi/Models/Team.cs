namespace WebutviklingsEksamen.Models;
using WebutviklingsEksamen.Interfaces;
using System.Text.Json.Serialization;
public class Team : ITeam
{
    [JsonPropertyName("id")]
    public int Id { get; set; }

    [JsonPropertyName("fullTeamName")]
    public string? FullTeamName { get; set; }

    [JsonPropertyName("base")]
    public string? Base { get; set; }

    [JsonPropertyName("worldChampionships")]
    public string? WorldChampionships { get; set; }

    [JsonPropertyName("image")]
    public string? Image { get; set; }
}