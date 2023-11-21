namespace WebutviklingsEksamen.Controllers;

using Microsoft.AspNetCore.Mvc;
using WebutviklingsEksamen.Contexts;
using WebutviklingsEksamen.Models;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/[controller]")]
public class TeamsController : ControllerBase
{
    private readonly F1Context context;
    private readonly IWebHostEnvironment environment;

    public TeamsController(F1Context _context, IWebHostEnvironment _environment)
    {
        context = _context;
        environment = _environment;
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
    public async Task<ActionResult<Team>> Post([FromBody] Team team, [FromForm] IFormFile? image)
    {
        try
        {
            if (image != null)
            {
                string webRootPath = environment.WebRootPath;
                string absolutePath = Path.Combine($"{webRootPath}/images/teams/{image.FileName}");

                using (var stream = new FileStream(absolutePath, FileMode.Create))
                {
                    await image.CopyToAsync(stream);
                }
            }
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
            team.Image = updatedTeam.Image;

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