namespace WebutviklingsEksamen.Controllers;

using Microsoft.AspNetCore.Mvc;
using WebutviklingsEksamen.Contexts;
using WebutviklingsEksamen.Models;
using Microsoft.EntityFrameworkCore;


[ApiController]
[Route("api/[controller]")]
public class DriversController : ControllerBase
{
    private readonly F1Context context;

    public DriversController(F1Context _context)
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

    public async Task<ActionResult<Driver>> Post([FromBody] Driver driver)
    {
        try
        {
            var result = await context.Drivers.AddAsync(driver); ;
            await context.SaveChangesAsync();
            return Ok(result.Entity);
        }
        catch
        {
            return StatusCode(500);
        }
    }

}