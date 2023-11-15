namespace WebutviklingsEksamen.Controllers;

using Microsoft.AspNetCore.Mvc;
using WebutviklingsEksamen.Contexts;
using WebutviklingsEksamen.Models;
using Microsoft.EntityFrameworkCore;


[ApiController]
[Route("api/[controller]")]
public class RaceController : ControllerBase
{
    private readonly F1Context context;

    public RaceController(F1Context _context)
    {
        context = _context;
    }

    [HttpGet]
    public async Task<ActionResult<List<Race>>> Get()
    {
        try
        {
            List<Race> races = await context.Races.ToListAsync();
            if (races != null)
            {
                return Ok(races);
            }
            else
            {
                return NotFound();
            }
        }
        catch
        {
            return StatusCode(500);
        }
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Race>> Get(int id)
    {
        try
        {
            Race? race = await context.Races.FirstOrDefaultAsync(r => r.Id == id);
            if (race != null)
            {
                return Ok(race);
            }
            else
            {
                return NotFound();
            }
        }
        catch
        {
            return StatusCode(500);
        }
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult<Race>> Delete(int id)
    {
        try
        {
            Race? race = await context.Races.FindAsync(id);
            if (race != null)
            {
                context.Races.Remove(race);
                await context.SaveChangesAsync();
                return Ok(race);
            }
            else
            {
                return NotFound();
            }
        }
        catch
        {
            return StatusCode(500);
        }
    }

    [HttpPost]
    public async Task<ActionResult<Race>> Post([FromBody] Race race)
    {
        try
        {
            var result = await context.Races.AddAsync(race);
            await context.SaveChangesAsync();
            return Ok(result.Entity);
        }
        catch
        {
            return StatusCode(500);
        }
    }


    [HttpPut("{id}")]
    public async Task<ActionResult<Race>> Put(int id, [FromBody] Race updatedRace)
    {
        if (updatedRace == null)
        {
            return BadRequest("Race data is null.");
        }

        try
        {
            var race = await context.Races.FindAsync(id);
            if (race == null)
            {
                return NotFound($"Race with Id = {id} not found.");
            }

            // Updating properties
            race.GrandPrix = updatedRace.GrandPrix;
            race.Winner = updatedRace.Winner;
            race.Laps = updatedRace.Laps;


            context.Races.Update(race);
            await context.SaveChangesAsync();

            return Ok(race);
        }
        catch (Exception ex)
        {
            // Log the exception details
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }

}