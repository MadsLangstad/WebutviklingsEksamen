namespace WebutviklingsEksamen.Interfaces;

public interface IRace
{
    int Id { get; set; }
    string? GrandPrix { get; set; }
    string? Winner { get; set; }
    int Laps { get; set; }
    string? Image { get; set; }
}