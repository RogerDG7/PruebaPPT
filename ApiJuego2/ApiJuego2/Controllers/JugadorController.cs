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
    public class JugadorController : ControllerBase
    {
        private readonly JuegosContext _context;

        public JugadorController(JuegosContext context)
        {
            _context = context;
        }

        // GET: api/Jugador
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Jugador>>> GetJugadors()
        {
            return await _context.Jugador.ToListAsync();
        }

        // GET: api/Jugador/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Jugador>> GetJugador(string id)
        {
            var jugador = await _context.Jugador.FindAsync(id);

            if (jugador == null)
            {
                return NotFound();
            }

            return jugador;
        }

        // PUT: api/Jugador/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutJugador(string id, Jugador jugador)
        {
            if (id != jugador.IdJugador)
            {
                return BadRequest();
            }

            _context.Entry(jugador).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!JugadorExists(id))
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

        // POST: api/Jugador
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Jugador>> PostJugador(Jugador jugador)
        {
            _context.Jugador.Add(jugador);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (JugadorExists(jugador.IdJugador))
                {
                    return Conflict("El jugador no sera creado por que ya existe");
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetJugador", new { id = jugador.IdJugador }, jugador);
        }

        // DELETE: api/Jugador/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Jugador>> DeleteJugador(string id)
        {
            var jugador = await _context.Jugador.FindAsync(id);
            if (jugador == null)
            {
                return NotFound();
            }

            _context.Jugador.Remove(jugador);
            await _context.SaveChangesAsync();

            return jugador;
        }

        private bool JugadorExists(string id)
        {
            return _context.Jugador.Any(e => e.IdJugador == id);
        }
    }
}
