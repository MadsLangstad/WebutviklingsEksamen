namespace WebutviklingsEksamen.Interfaces;

public interface ICar
{
    int Id { get; set; }
    int Season { get; set; }
    string? Chassis { get; set; }
    string? Motor { get; set; }
    string? Tires { get; set; }
    int Point { get; set; }
    int Place { get; set; }
    string? ImageUrl { get; set; }
}
