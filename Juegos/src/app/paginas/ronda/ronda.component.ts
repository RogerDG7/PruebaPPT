import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Juego } from 'src/app/Modelo/Juego';
import { JugadorActual } from 'src/app/Modelo/JugadorActual';

@Component({
  selector: 'app-ronda',
  templateUrl: './ronda.component.html',
  styleUrls: ['./ronda.component.css']
})
export class RondaComponent implements OnInit {
  @Input() jugadorMovto:JugadorActual;
  @Output() jugadaHecha:EventEmitter<string>;
  @Input() resultado!:Juego[];
  movimientos = ["Priedra","Papel","Tijera"];

  constructor() { 
    this.jugadorMovto = new JugadorActual();
    this.jugadaHecha = new EventEmitter();
  }

  ngOnInit(): void {
  }

  makePlayed(played:string){
    this.jugadaHecha.emit(played);
}

}
