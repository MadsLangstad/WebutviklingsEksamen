namespace WebutviklingsEksamen.Interfaces;

public interface IRace
{
    int Id { get; set; }
    string? GrandPrix { get; set; }
    DateTime Date { get; set; }
    string? Winner { get; set; }
    string? Car { get; set; }
    int Laps { get; set; }
    TimeSpan Time { get; set; }
    string? Image { get; set; }

}