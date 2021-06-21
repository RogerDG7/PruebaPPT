import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Partida } from '../Modelo/Partida';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class PartidasService {
  readonly urlPartida = environment.urlApiJuego+'partida';
  constructor(private http: HttpClient) {

   }

   obtenerHisorialPArtidas(): Observable<any> {
    const lstPartidas: Array<Partida> = [];
    return this.http.get<any>(this.urlPartida)
    .pipe(
      map(partida => {
        (partida as Array<any>).forEach((registro: any) => {
          lstPartidas.push({
            IdJugador: registro.idJugador,
            IdJugadorRetador: registro.idJugadorRetador,
            IdEstadoPartida: registro.idEstadoPartida,
            FechaPartida: registro.fechaPartida,
            IdJuego: 1 //piedra papel o tijera juego
          });
        });
        return lstPartidas;
      })
    );
  }

  guardarPartidaService(partida: Partida):Observable<Partida>{
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    const body=JSON.stringify(partida);
    return this.http.post<Partida>(this.urlPartida,body,httpOptions);
  }

}
