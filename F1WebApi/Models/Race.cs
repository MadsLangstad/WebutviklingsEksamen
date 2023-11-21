namespace WebutviklingsEksamen.Models;
using WebutviklingsEksamen.Interfaces;
using System.Text.Json.Serialization;

public class Race : IRace
{
    [JsonPropertyName("id")]
    public int Id { get; set; }

    [JsonPropertyName("grandPrix")]
    public string? GrandPrix { get; set; }

    [JsonPropertyName("winner")]
    public string? Winner { get; set; }

    [JsonPropertyName("laps")]
    public int Laps { get; set; }

    [JsonPropertyName("image")]
    public string? Image { get; set; }
}