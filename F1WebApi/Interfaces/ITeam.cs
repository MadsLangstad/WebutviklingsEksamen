namespace WebutviklingsEksamen.Interfaces;

public interface ITeam
{
    int Id { get; set; }
    string? FullTeamName { get; set; }
    string? Base { get; set; }
    string? TeamChief { get; set; }
    string? TechnicalChief { get; set; }
    string? Chassis { get; set; }
    string? PowerUnit { get; set; }
    string? FirstTeamEntry { get; set; }
    string? WorldChampionships { get; set; }
    string? HighestRaceFinish { get; set; }
    int PolePositions { get; set; }
    string? FastestLaps { get; set; }
    string? Image { get; set; }
}