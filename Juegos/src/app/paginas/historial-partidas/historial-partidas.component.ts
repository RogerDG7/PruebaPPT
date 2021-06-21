import { Component, OnInit } from '@angular/core';
import { Partida } from 'src/app/Modelo/Partida';
import { PartidasService } from 'src/app/servicios/partidas.service';

@Component({
  selector: 'app-historial-partidas',
  templateUrl: './historial-partidas.component.html',
  styleUrls: ['./historial-partidas.component.css']
})
export class HistorialPartidasComponent implements OnInit {
  partidas: Array<Partida> = [];
  constructor(private partidasServices: PartidasService) {
    
   }

  ngOnInit(): void {
    //this.partidasServices.obtenerHisorialPArtidas().subscribe(d => console.log('retorno',d));
    this.consultarHistorialPartidas();
  }

  consultarHistorialPartidas() {
    this.partidasServices.obtenerHisorialPArtidas()
      .subscribe((lstPartidas: Array<Partida>) => {
        this.partidas = lstPartidas;
      });
  }

}
