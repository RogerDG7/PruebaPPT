using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ApiJuego2.Context;
using ApiJuego2.Models;
using Microsoft.AspNetCore.Cors;

namespace ApiJuego2.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("AllowAll")]
    public class PartidaController : ControllerBase
    {
        private readonly JuegosContext _context;

        public PartidaController(JuegosContext context)
        {
            _context = context;
        }

        // GET: api/Partida
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Partida>>> GetPartida()
        {
            return await _context.Partida.ToListAsync();
        }

        // GET: api/Partida/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Partida>> GetPartida(int id)
        {
            var partida = await _context.Partida.FindAsync(id);

            if (partida == null)
            {
                return NotFound();
            }

            return partida;
        }

        // PUT: api/Partida/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPartida(int id, Partida partida)
        {
            if (id != partida.IdPartida)
            {
                return BadRequest();
            }

            _context.Entry(partida).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PartidaExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Partida
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Partida>> PostPartida(Partida partida)
        {
            _context.Partida.Add(partida);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPartida", new { id = partida.IdPartida }, partida);
        }

        // DELETE: api/Partida/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Partida>> DeletePartida(int id)
        {
            var partida = await _context.Partida.FindAsync(id);
            if (partida == null)
            {
                return NotFound();
            }

            _context.Partida.Remove(partida);
            await _context.SaveChangesAsync();

            return partida;
        }

        private bool PartidaExists(int id)
        {
            return _context.Partida.Any(e => e.IdPartida == id);
        }
    }
}
