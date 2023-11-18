namespace WebutviklingsEksamen.Interfaces;

public interface ITeam
{
    int Id { get; set; }
    string? FullTeamName { get; set; }
    string? Base { get; set; }
    string? WorldChampionships { get; set; }
    string? Image { get; set; }
}