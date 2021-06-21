using System;
using System.Collections.Generic;

#nullable disable

namespace ApiJuego2.Models
{
    public partial class Juego
    {
        public Juego()
        {
            Partida = new HashSet<Partida>();
        }
        public int IdJuego { get; set; }
        public string NombreJuego { get; set; }

        public virtual ICollection<Partida> Partida { get; set; }
    }
}
