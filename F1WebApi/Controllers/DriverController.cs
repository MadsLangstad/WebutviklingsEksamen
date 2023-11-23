namespace WebutviklingsEksamen.Controllers;

using Microsoft.AspNetCore.Mvc;
using WebutviklingsEksamen.Contexts;
using WebutviklingsEksamen.Models;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;
using System.Text.Json.Serialization;

[ApiController]
[Route("api/[controller]")]
public class DriversController : ControllerBase
{
    private readonly F1Context context;
    private readonly IWebHostEnvironment environment;

    public DriversController(F1Context _context, IWebHostEnvironment _environment)
    {
        context = _context;
        environment = _environment;
    }

    [HttpGet]
    public async Task<ActionResult<List<Driver>>> Get()
    {
        try
        {
            List<Driver> drivers = await context.Drivers.ToListAsync();
            if (drivers != null)
            {
                return Ok(drivers);
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
    public async Task<ActionResult<Driver>> Get(int id)
    {
        try
        {
            Driver? driver = await context.Drivers.FindAsync(id);
            if (driver != null)
            {
                return Ok(driver);
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
    public async Task<ActionResult<Driver>> Delete(int id)
    {
        try
        {
            Driver? driver = await context.Drivers.FindAsync(id);
            if (driver != null)
            {
                context.Drivers.Remove(driver);
                await context.SaveChangesAsync();
                return Ok(driver);
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
    public async Task<ActionResult<Driver>> Post([FromForm(Name = "driver")] string driverJson, [FromForm(Name = "image")] IFormFile? image)
    {
        Driver? driver = JsonSerializer.Deserialize<Driver>(driverJson, new JsonSerializerOptions()
        {
            NumberHandling = JsonNumberHandling.AllowReadingFromString |
            JsonNumberHandling.WriteAsString
        });

        if (driver == null)
        {
            return BadRequest("Driver data is null.");
        }

        try
        {
            if (image != null)
            {
                string webRootPath = environment.WebRootPath;
                string absolutePath = Path.Combine($"{webRootPath}/images/drivers", image.FileName);

                using (var stream = new FileStream(absolutePath, FileMode.Create))
                {
                    await image.CopyToAsync(stream);
                }
            }

            var result = await context.Drivers.AddAsync(driver); ;
            await context.SaveChangesAsync();
            return Ok(result.Entity);
        }
        catch
        {
            return StatusCode(500);
        }
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<Driver>> Put(int id, [FromForm] Driver updatedDriver, [FromForm(Name = "image")] IFormFile? image)
    {
        if (updatedDriver == null)
        {
            return BadRequest("Driver data is null.");
        }

        try
        {
            var driver = await context.Drivers.FindAsync(id);
            if (driver == null)
            {
                return NotFound($"Driver with Id = {id} not found.");
            }

            // Updating properties
            driver.Name = updatedDriver.Name;
            driver.Team = updatedDriver.Team;
            driver.Country = updatedDriver.Country;

            if (image != null)
            {
                string webRootPath = environment.WebRootPath;
                string absolutePath = Path.Combine($"{webRootPath}/images/drivers/", image.FileName);

                using (var stream = new FileStream(absolutePath, FileMode.Create))
                {
                    await image.CopyToAsync(stream);
                }

                driver.Image = "/images/drivers/" + image.FileName; // Update the image path
            }

            context.Drivers.Update(driver);
            await context.SaveChangesAsync();

            return Ok(driver);
        }
        catch (Exception ex)
        {
            // Log the exception details
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }
}