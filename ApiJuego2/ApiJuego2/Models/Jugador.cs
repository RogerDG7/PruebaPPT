using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

#nullable disable

namespace ApiJuego2.Models
{

    public partial class Jugador
    {
        public Jugador()
        {
            PartidaIdJugadorNavigations = new HashSet<Partida>();
            PartidaIdJugadorRetadorNavigations = new HashSet<Partida>();
        }

        public string IdJugador { get; set; }
        public string NombreJugador { get; set; }

        public virtual ICollection<Partida> PartidaIdJugadorNavigations { get; set; }
        public virtual ICollection<Partida> PartidaIdJugadorRetadorNavigations { get; set; }
    }
}
