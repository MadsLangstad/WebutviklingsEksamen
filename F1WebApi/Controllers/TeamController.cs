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
    /*
    - Get something by id
    - Get something by other property than id, for example GetByName
    - Delete something
    - Create something (including image upload)
    - Update something
    */
}