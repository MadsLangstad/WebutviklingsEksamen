namespace WebutviklingsEksamen.Controllers;

using Microsoft.AspNetCore.Mvc;
using WebutviklingsEksamen.Contexts;
using WebutviklingsEksamen.Models;
using Microsoft.EntityFrameworkCore;


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
    public async Task<ActionResult<Race>> Post([FromForm] Race race, [FromForm] IFormFile? image)
    {
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
            race.Image = updatedRace.Image;


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

    // private string FixBase64ForImage(string Image)
    // {
    //     System.Text.StringBuilder sbText = new System.Text.StringBuilder(Image, Image.Length);
    //     sbText.Replace("\r\n", String.Empty); sbText.Replace(" ", String.Empty);
    //     return sbText.ToString();
    // }

}