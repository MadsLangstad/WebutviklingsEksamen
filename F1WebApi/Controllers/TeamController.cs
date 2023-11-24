namespace WebutviklingsEksamen.Controllers;

using Microsoft.AspNetCore.Mvc;
using WebutviklingsEksamen.Contexts;
using WebutviklingsEksamen.Models;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;
using System.Text.Json.Serialization;

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

    [HttpGet("worldChampionships/{worldChampionships}")]
    public async Task<ActionResult<Team>> GetWorldChampionships(String worldChampionships)
    {
        try
        {
            List<Team>? teams = await context.Teams.Where(x => x.WorldChampionships == worldChampionships).ToListAsync();

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
    public async Task<ActionResult<Team>> Post([FromForm(Name = "team")] string teamJson, [FromForm(Name = "image")] IFormFile? image)
    {
        Team? team = JsonSerializer.Deserialize<Team>(teamJson, new JsonSerializerOptions()
        {
            NumberHandling = JsonNumberHandling.AllowReadingFromString |
            JsonNumberHandling.WriteAsString
        });

        if (team == null)
        {
            return BadRequest("Team data is null.");
        }

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
    public async Task<ActionResult<Team>> Put(int id, [FromForm(Name = "team")] string teamJson, [FromForm(Name = "image")] IFormFile? image)
    {
        Team? updatedTeam = JsonSerializer.Deserialize<Team>(teamJson, new JsonSerializerOptions()
        {
            NumberHandling = JsonNumberHandling.AllowReadingFromString |
            JsonNumberHandling.WriteAsString
        });

        if (updatedTeam == null)
        {
            return BadRequest("Team data is null.");
        }

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

            var result = await context.Teams.FindAsync(id);
            if (result == null)
            {
                return NotFound($"Team with Id = {id} not found.");
            }

            // Updating properties
            var local = this.context.Set<Team>()
                .Local
                .FirstOrDefault(entry => entry.Id.Equals(id));

            // Check if local is not null
            if (local != null)
            {
                // Detach
                this.context.Entry(local).State = EntityState.Detached;
            }

            // Set modified flag in your entry
            this.context.Entry(updatedTeam).State = EntityState.Modified;

            await context.SaveChangesAsync();

            return Ok(updatedTeam);
        }
        catch (Exception ex)
        {
            // Log the exception details
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }
}