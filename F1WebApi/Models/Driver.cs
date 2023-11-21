namespace WebutviklingsEksamen.Models;
using WebutviklingsEksamen.Interfaces;
using System.Text.Json.Serialization;


public class Driver : IDriver
{
    [JsonPropertyName("id")]
    public int Id { get; set; }

    [JsonPropertyName("name")]
    public string? Name { get; set; }

    [JsonPropertyName("team")]
    public string? Team { get; set; }

    [JsonPropertyName("country")]
    public string? Country { get; set; }

    [JsonPropertyName("image")]
    public string? Image { get; set; }
}