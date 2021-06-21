using System;
using ApiJuego2.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

#nullable disable

namespace ApiJuego2.Context
{
    public partial class JuegosContext : DbContext
    {
        public JuegosContext()
        {
        }

        public JuegosContext(DbContextOptions<JuegosContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Partida> Partida { get; set; }
        public virtual DbSet<Jugador> Jugador { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            /*if (!optionsBuilder.IsConfigured)
            {
            #warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("Server=192.168.1.127;initial catalog=Juegos;User ID=sa;Password=rdg123;MultipleActiveResultSets=True;");
            }*/
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "Modern_Spanish_CI_AS");

            modelBuilder.Entity<EstadoPartida>(entity =>
            {
                entity.HasKey(e => e.IdEstadoPartida)
                    .HasName("PK__ESTADO_P__4517248C12274600");

                entity.ToTable("ESTADO_PARTIDA");

                entity.Property(e => e.IdEstadoPartida).HasColumnName("ID_ESTADO_PARTIDA");

                entity.Property(e => e.DescEstadoPartida)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false)
                    .HasColumnName("DESC_ESTADO_PARTIDA");
            });

            modelBuilder.Entity<Juego>(entity =>
            {
                entity.HasKey(e => e.IdJuego)
                    .HasName("PK__JUEGO__5EAAC25E87A9023E");

                entity.ToTable("JUEGO");

                entity.Property(e => e.IdJuego).HasColumnName("ID_JUEGO");

                entity.Property(e => e.NombreJuego)
                    .IsRequired()
                    .HasMaxLength(300)
                    .IsUnicode(false)
                    .HasColumnName("NOMBRE_JUEGO");
            });

            modelBuilder.Entity<Jugador>(entity =>
            {
                entity.HasKey(e => e.IdJugador)
                    .HasName("PK__JUGADOR__14B5F659BB825E42");

                entity.ToTable("JUGADOR");

                entity.Property(e => e.IdJugador)
                    .HasMaxLength(20)
                    .IsUnicode(false)
                    .HasColumnName("ID_JUGADOR");

                entity.Property(e => e.NombreJugador)
                    .IsRequired()
                    .HasMaxLength(20)
                    .IsUnicode(false)
                    .HasColumnName("NOMBRE_JUGADOR");
            });

            modelBuilder.Entity<Partida>(entity =>
            {
                entity.HasKey(e => e.IdPartida)
                    .HasName("PK__PARTIDA__BF59BB1DB70B3E86");

                entity.ToTable("PARTIDA");

                entity.Property(e => e.IdPartida).HasColumnName("ID_PARTIDA");

                entity.Property(e => e.FechaPartida)
                    .HasColumnType("datetime")
                    .HasColumnName("FECHA_PARTIDA");

                entity.Property(e => e.IdEstadoPartida).HasColumnName("ID_ESTADO_PARTIDA");

                entity.Property(e => e.IdJuego).HasColumnName("ID_JUEGO");

                entity.Property(e => e.IdJugador)
                    .IsRequired()
                    .HasMaxLength(20)
                    .IsUnicode(false)
                    .HasColumnName("ID_JUGADOR");

                entity.Property(e => e.IdJugadorRetador)
                    .IsRequired()
                    .HasMaxLength(20)
                    .IsUnicode(false)
                    .HasColumnName("ID_JUGADOR_RETADOR");

                entity.HasOne(d => d.IdEstadoPartidaNavigation)
                    .WithMany(p => p.Partida)
                    .HasForeignKey(d => d.IdEstadoPartida)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_PARTIDA_ESTADO_PARTIDA");

                entity.HasOne(d => d.IdJuegoNavigation)
                    .WithMany(p => p.Partida)
                    .HasForeignKey(d => d.IdJuego)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_PARTIDA_JUEGO");

                entity.HasOne(d => d.IdJugadorNavigation)
                    .WithMany(p => p.PartidaIdJugadorNavigations)
                    .HasForeignKey(d => d.IdJugador)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_PARTIDA_JUGADOR");

                entity.HasOne(d => d.IdJugadorRetadorNavigation)
                    .WithMany(p => p.PartidaIdJugadorRetadorNavigations)
                    .HasForeignKey(d => d.IdJugadorRetador)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_PARTIDA_RETADOR");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
