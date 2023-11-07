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
    /*
    - Get something by id
    - Get something by other property than id, for example GetByName
    - Delete something
    - Create something (including image upload)
    - Update something
    */
}
