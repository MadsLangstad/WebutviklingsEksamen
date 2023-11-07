namespace WebutviklingsEksamen.Interfaces;

public interface IRace
{
    int Id { get; set; }
    string? WinnerName { get; set; }
    int WinnerTime { get; set; }
    string? GrandPrix { get; set; }
    int NumberOfLaps { get; set; }
}