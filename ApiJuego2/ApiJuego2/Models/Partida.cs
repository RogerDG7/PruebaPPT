using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

#nullable disable

namespace ApiJuego2.Models
{
    public partial class Partida
    {
        public string IdJugador { get; set; }
        public string IdJugadorRetador { get; set; }
        public int IdEstadoPartida { get; set; }
        public DateTime FechaPartida { get; set; }
        public int IdJuego { get; set; }
        public int IdPartida { get; set; }

        public virtual EstadoPartida IdEstadoPartidaNavigation { get; set; }
        public virtual Juego IdJuegoNavigation { get; set; }
        public virtual Jugador IdJugadorNavigation { get; set; }
        public virtual Jugador IdJugadorRetadorNavigation { get; set; }
    }
}
