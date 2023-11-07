namespace WebutviklingsEksamen.Contexts
{
    using Microsoft.EntityFrameworkCore;
    using WebutviklingsEksamen.Interfaces;
    using WebutviklingsEksamen.Models;

    public class F1Context : DbContext
    {
        public F1Context(DbContextOptions<F1Context> options) : base(options) { }

        public DbSet<Team> Teams { get; set; }
        public DbSet<Race> Races { get; set; }
        public DbSet<Driver> Drivers { get; set; }
        // Implement
        // public DbSet<Car> Cars { get; set; }
    }
}
