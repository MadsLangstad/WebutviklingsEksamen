namespace WebutviklingsEksamen.Interfaces;

public interface IDriver
{
    int Id { get; set; }
    string? Name { get; set; }
    string? Team { get; set; }
    string? Country { get; set; }
    int? Podiums { get; set; }
    double Points { get; set; }
    int GrandsPrixEntered { get; set; }
    int? WorldChampionships { get; set; }
    string? HighestRaceFinish { get; set; }
    int HighestGridPosition { get; set; }
    DateTime DateOfBirth { get; set; }
    string? PlaceOfBirth { get; set; }
    string? Image { get; set; }
}