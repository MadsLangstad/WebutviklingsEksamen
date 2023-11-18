namespace WebutviklingsEksamen.Interfaces;

public interface IDriver
{
    int Id { get; set; }
    string? Name { get; set; }
    string? Team { get; set; }
    string? Country { get; set; }
    string? Image { get; set; }
}