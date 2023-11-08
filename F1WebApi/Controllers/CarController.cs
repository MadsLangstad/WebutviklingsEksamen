namespace WebutviklingsEksamen.Controllers;

using Microsoft.AspNetCore.Mvc;
using WebutviklingsEksamen.Contexts;
using WebutviklingsEksamen.Models;
using Microsoft.EntityFrameworkCore;

[ApiController]
[Route("api/[controller]")]
public class CarController : ControllerBase
{
    private readonly F1Context context;

    public CarController(F1Context _context)
    {
        context = _context;
    }

    [HttpGet]
    public async Task<ActionResult<List<Car>>> Get()
    {
        try
        {
            List<Car> cars = await context.Cars.ToListAsync();
            if (cars != null)
            {
                return Ok(cars);
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
    public async Task<ActionResult<Car>> Get(int id)
    {
        try
        {
            Car? car = await context.Cars.FirstOrDefaultAsync(c => c.Id == id);
            if (car != null)
            {
                return Ok(car);
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
    public async Task<IActionResult> Delete(int id)
    {
        try
        {
            Car? car = await context.Cars.FindAsync(id);
            if (car == null)
            {
                return NotFound();
            }

            context.Cars.Remove(car);
            await context.SaveChangesAsync();

            return NoContent();
        }
        catch
        {
            return StatusCode(500);
        }
    }

    [HttpPost]
    public async Task<ActionResult<Car>> Create([FromForm] Car car, [FromForm] IFormFile image)
    {
        try
        {
            if (image != null && image.Length > 0)
            {
                var fileName = Path.GetFileName(image.FileName);
                var filePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "images", fileName);
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await image.CopyToAsync(stream);
                }
                car.ImageUrl = $"/images/{fileName}";
            }

            context.Cars.Add(car);
            await context.SaveChangesAsync();

            return CreatedAtAction(nameof(Get), new { id = car.Id }, car);
        }
        catch
        {
            return StatusCode(500);
        }
    }

    /*
    - Update something
    */
}
