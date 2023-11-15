namespace WebutviklingsEksamen.Controllers;

using Microsoft.AspNetCore.Mvc;
using WebutviklingsEksamen.Contexts;
using WebutviklingsEksamen.Models;
using Microsoft.EntityFrameworkCore;


[ApiController]
[Route("api/[controller]")]
public class TeamController : ControllerBase
{
    private readonly F1Context context;

    public TeamController(F1Context _context)
    {
        context = _context;
    }

    [HttpGet]
    public async Task<ActionResult<List<Team>>> Get()
    {
        try
        {
            List<Team> teams = await context.Teams.ToListAsync();
            if (teams != null)
            {
                return Ok(teams);
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
    public async Task<ActionResult<Team>> Get(int id)
    {
        try
        {
            Team? team = await context.Teams.FirstOrDefaultAsync(t => t.Id == id);
            if (team != null)
            {
                return Ok(team);
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
    public async Task<ActionResult<Team>> Delete(int id)
    {
        try
        {
            Team? team = await context.Teams.FirstOrDefaultAsync(t => t.Id == id);
            if (team != null)
            {
                context.Teams.Remove(team);
                await context.SaveChangesAsync();
                return Ok(team);
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
    public async Task<ActionResult<Team>> Post([FromBody] Team team)
    {
        try
        {
            var result = await context.Teams.AddAsync(team);
            await context.SaveChangesAsync();
            return Ok(result.Entity);
        }
        catch
        {
            return StatusCode(500);
        }
    }


    [HttpPut("{id}")]
    public async Task<ActionResult<Team>> Put(int id, [FromBody] Team updatedTeam)
    {
        if (updatedTeam == null)
        {
            return BadRequest("Team data is null.");
        }

        try
        {
            var team = await context.Teams.FindAsync(id);
            if (team == null)
            {
                return NotFound($"Team with Id = {id} not found.");
            }

            // Updating properties
            team.FullTeamName = updatedTeam.FullTeamName;
            team.Base = updatedTeam.Base;
            team.WorldChampionships = updatedTeam.WorldChampionships;

            // ... Update other properties as needed

            context.Teams.Update(team);
            await context.SaveChangesAsync();

            return Ok(team);
        }
        catch (Exception ex)
        {
            // Log the exception details
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }

}