import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Juego } from 'src/app/Modelo/Juego';
import { JugadorActual } from 'src/app/Modelo/JugadorActual';
import { Jugador } from 'src/app/Modelo/Jugdor';
import { Partida } from 'src/app/Modelo/Partida';
import { JugadorService } from 'src/app/servicios/jugador.service';
import { PartidasService } from 'src/app/servicios/partidas.service';

@Component({
  selector: 'app-jugar',
  templateUrl: './jugar.component.html',
  styleUrls: ['./jugar.component.css']
})
export class JugarComponent implements OnInit {

  //variables para el manejo de las rondas
  juegoEmpezado: any;
  jugadorActual1!: JugadorActual;
  jugadorActual2!: JugadorActual;
  JugadaHecha!: string;
  jugadorMovto!: JugadorActual;
  resultado!: Juego[];
  ronda!: number;
  jugadorGanador!: JugadorActual;

  jugadaHecha!: string;

  constructor(private jugadorService: JugadorService, private frm: FormBuilder, private router: Router,
              private partidasServices: PartidasService) {

  }
  //frmJugadores!: FormGroup;
  frmJugadores = new FormGroup({
    nombreJugador1: new FormControl('', [Validators.required, Validators.maxLength(20)]),
    nombreJugador2: new FormControl('', [Validators.required, Validators.maxLength(20)])
  });
  jugador1 = new Jugador;
  jugador2 = new Jugador;
  partidaJugador1 = new Partida;
  partidaJugador2 = new Partida;

  ngOnInit(): void {
    this.iniciarPropiedadesJuego();
  }

  iniciarPropiedadesJuego() {
    this.juegoEmpezado = {
      empezado: false,
      jugadorActual1: this.jugadorActual1,
      jugadorActual2: this.jugadorActual2
    };
    this.ronda = 0;
    this.resultado = new Array<Juego>();
    this.jugadorGanador = new JugadorActual();

  }

  empezarJuego() {
    this.juegoEmpezado.empezado = true;
    this.jugadorMovto = this.jugadorActual1
    this.ronda++;
    console.log("El juego ha sido iniciado", this.juegoEmpezado);
  }

  getPlayed(played: string) {
    this.jugadaHecha = played;
    this.jugadorMovto.movtoActual = played;
    if (this.jugadorMovto == this.juegoEmpezado.jugadorActual1) {
      this.jugadorMovto = this.juegoEmpezado.jugadorActual2;
    } else {
      this.validarGanadorRonda();
      this.jugadorMovto = this.juegoEmpezado.jugadorActual1;
      this.ronda++;
    }
  }

  validarGanadorRonda() {
    var juego = new Juego();
    if (this.juegoEmpezado.jugadorActual1.movtoActual === this.juegoEmpezado.jugadorActual2.movtoActual){
      juego.jugadorGanador = new JugadorActual();
      juego.jugadorGanador.nombre = "Empate"
      juego.ronda = this.ronda
    }
    if ((this.juegoEmpezado.jugadorActual1.movtoActual === "Priedra" && this.juegoEmpezado.jugadorActual2.movtoActual === "Tijera") ||
      (this.juegoEmpezado.jugadorActual1.movtoActual === "Tijera" && this.juegoEmpezado.jugadorActual2.movtoActual === "Papel") ||
      (this.juegoEmpezado.jugadorActual1.movtoActual === "Papel" && this.juegoEmpezado.jugadorActual2.movtoActual === "Priedra")) {
      this.juegoEmpezado.jugadorActual1.rondasGanadas++;
      juego.jugadorGanador = this.juegoEmpezado.jugadorActual1;
      juego.ronda = this.ronda;
    }
    if ((this.juegoEmpezado.jugadorActual2.movtoActual === "Priedra" && this.juegoEmpezado.jugadorActual1.movtoActual === "Tijera") ||
      (this.juegoEmpezado.jugadorActual2.movtoActual === "Tijera" && this.juegoEmpezado.jugadorActual1.movtoActual === "Papel") ||
      (this.juegoEmpezado.jugadorActual2.movtoActual === "Papel" && this.juegoEmpezado.jugadorActual1.movtoActual === "Priedra")) {
      this.juegoEmpezado.jugadorActual2.rondasGanadas++;
      juego.jugadorGanador = this.juegoEmpezado.jugadorActual2;
      juego.ronda = this.ronda;
    }
    this.resultado.push(juego);
    this.validarYGuardarPArtida();
  }

  validarYGuardarPArtida (){
    if(this.juegoEmpezado.jugadorActual1.rondasGanadas === 3){
      this.jugadorGanador = this.juegoEmpezado.jugadorActual1;
      this.juegoEmpezado.empezado = false;
      this.guardarPartida(1);
    }else if(this.juegoEmpezado.jugadorActual2.rondasGanadas === 3){
      this.jugadorGanador = this.juegoEmpezado.jugadorActual2;
      this.juegoEmpezado.empezado = false;
      this.guardarPartida(2);
    }
  }

  guardarPartida(jugadorGanador: number){
    this.partidaJugador1={
      IdJugador: this.juegoEmpezado.jugadorActual1.nombre,
      IdJugadorRetador: this.juegoEmpezado.jugadorActual2.nombre,
      IdEstadoPartida: jugadorGanador == 1 ? 2 : 1,
      FechaPartida : new Date(),
      IdJuego: 1 //piedra papel o tijera juego
    };
    this.partidaJugador2={
      IdJugador: this.juegoEmpezado.jugadorActual2.nombre,
      IdJugadorRetador: this.juegoEmpezado.jugadorActual1.nombre,
      IdEstadoPartida: jugadorGanador == 2 ? 2 : 1,
      FechaPartida : new Date(),
      IdJuego: 1 //piedra papel o tijera juego
    };
    this.partidasServices.guardarPartidaService(this.partidaJugador1).subscribe(resul => { console.log(resul)});
    this.partidasServices.guardarPartidaService(this.partidaJugador2).subscribe(resul => { console.log(resul)});
  }

  guardarJugadores() {
    if (this.frmJugadores.valid) {
      this.jugador1 = {
        idJugador: this.frmJugadores.get('nombreJugador1')?.value,
        nombreJugador: this.frmJugadores.get('nombreJugador1')?.value
      }
      this.jugador2 = {
        idJugador: this.frmJugadores.get('nombreJugador2')?.value,
        nombreJugador: this.frmJugadores.get('nombreJugador2')?.value
      };
      this.jugadorService.guardarJugadoresService(this.jugador1).subscribe(resul => { console.log(resul) });
      this.jugadorService.guardarJugadoresService(this.jugador2).subscribe(resul => { console.log(resul) });
      this.jugadorActual1 = new JugadorActual();
      this.jugadorActual2 = new JugadorActual();
      this.juegoEmpezado = {
        jugadorActual1: this.jugadorActual1,
        jugadorActual2: this.jugadorActual2
      };
      this.jugadorActual1.nombre = this.jugador1.nombreJugador;
      this.jugadorActual2.nombre = this.jugador2.nombreJugador;
      this.jugadorMovto = new JugadorActual();
      this.frmJugadores.reset();
      //this.router.navigate(['inicio/ronda']);
      this.empezarJuego();
    } else {
      alert("Por favor digite los nombres de los jugadores max 20 caracteres");
    }

  }


}
