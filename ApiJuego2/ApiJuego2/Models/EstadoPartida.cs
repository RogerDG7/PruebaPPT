using System;
using System.Collections.Generic;

#nullable disable

namespace ApiJuego2.Models
{
    public partial class EstadoPartida
    {
        public EstadoPartida()
        {
            Partida = new HashSet<Partida>();
        }

        public int IdEstadoPartida { get; set; }
        public string DescEstadoPartida { get; set; }

        public virtual ICollection<Partida> Partida { get; set; }
    }
}
