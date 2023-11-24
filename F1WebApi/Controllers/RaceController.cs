namespace WebutviklingsEksamen.Controllers;

using Microsoft.AspNetCore.Mvc;
using WebutviklingsEksamen.Contexts;
using WebutviklingsEksamen.Models;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;
using System.Text.Json.Serialization;
using System.Web;

[ApiController]
[Route("api/[controller]")]
public class RacesController : ControllerBase
{
    private readonly F1Context context;
    private readonly IWebHostEnvironment environment;

    public RacesController(F1Context _context, IWebHostEnvironment _environment)
    {
        context = _context;
        environment = _environment;
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

    [HttpGet("laps/{laps}")]
    public async Task<ActionResult<Race>> GetLaps(int laps)
    {
        try
        {
            List<Race>? races = await context.Races.Where(x => x.Laps == laps).ToListAsync();

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
    public async Task<ActionResult<Race>> Post([FromForm(Name = "race")] string raceJson, [FromForm(Name = "image")] IFormFile? image)
    {
        Race? race = JsonSerializer.Deserialize<Race>(raceJson, new JsonSerializerOptions()
        {
            NumberHandling = JsonNumberHandling.AllowReadingFromString |
            JsonNumberHandling.WriteAsString
        });

        if (race == null)
        {
            return BadRequest("Race data is null.");
        }

        try
        {
            if (image != null)
            {
                string webRootPath = environment.WebRootPath;
                string absolutePath = Path.Combine($"{webRootPath}/images/races/{image.FileName}");

                using (var stream = new FileStream(absolutePath, FileMode.Create))
                {
                    await image.CopyToAsync(stream);
                }
            }

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
    public async Task<ActionResult<Race>> Put(int id, [FromForm(Name = "race")] string raceJson, [FromForm(Name = "image")] IFormFile? image)
    {
        Race? updatedRace = JsonSerializer.Deserialize<Race>(raceJson, new JsonSerializerOptions()
        {
            NumberHandling = JsonNumberHandling.AllowReadingFromString |
            JsonNumberHandling.WriteAsString
        });

        if (updatedRace == null)
        {
            return BadRequest("Race data is null.");
        }

        try
        {
            if (image != null)
            {
                string webRootPath = environment.WebRootPath;
                string absolutePath = Path.Combine($"{webRootPath}/images/races/{image.FileName}");

                using (var stream = new FileStream(absolutePath, FileMode.Create))
                {
                    await image.CopyToAsync(stream);
                }
            }

            var result = await context.Races.FindAsync(id);
            if (result == null)
            {
                return NotFound($"Race with Id = {id} not found.");
            }

            // Updating properties
            var local = this.context.Set<Race>()
                .Local
                .FirstOrDefault(entry => entry.Id.Equals(id));

            // Check if local is not null
            if (local != null)
            {
                // Detach
                this.context.Entry(local).State = EntityState.Detached;
            }

            // Set modified flag in your entry
            this.context.Entry(updatedRace).State = EntityState.Modified;

            await context.SaveChangesAsync();

            return Ok(updatedRace);
        }
        catch (Exception ex)
        {
            // Log the exception details
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }
}