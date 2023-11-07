namespace WebutviklingsEksamen.Interfaces;

public interface IDriver
{
    int Id { get; set; }
    string? Name { get; set; }
    int Age { get; set; }
    string? Nationality { get; set; }
    string? DriverImage { get; set; }
}