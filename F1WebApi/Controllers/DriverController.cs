namespace WebutviklingsEksamen.Controllers;

using Microsoft.AspNetCore.Mvc;
using WebutviklingsEksamen.Contexts;
using WebutviklingsEksamen.Models;
using Microsoft.EntityFrameworkCore;


[ApiController]
[Route("api/[controller]")]
public class DriverController : ControllerBase
{
    private readonly F1Context context;

    public DriverController(F1Context _context)
    {
        context = _context;
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
    public async Task<ActionResult<Driver>> Post([FromBody] Driver driver)
    {
        var result = await context.Drivers.AddAsync(driver); ;
        await context.SaveChangesAsync();
        return Ok(result.Entity);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<Driver>> Put(int id, [FromBody] Driver updatedDriver)
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