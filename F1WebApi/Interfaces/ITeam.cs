namespace WebutviklingsEksamen.Interfaces;

public interface ITeam
{
    int Id { get; set; }
    string? Manufacturer { get; set; }
    string? CarImageDriver1 { get; set; }
    string? CarImageDriver2 { get; set; }
    string? ImageUrl { get; set; }
}