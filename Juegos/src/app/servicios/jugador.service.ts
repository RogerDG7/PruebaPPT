import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders} from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Jugador } from '../Modelo/Jugdor';

@Injectable({
  providedIn: 'root'
})
export class JugadorService {

  readonly urlJugador = environment.urlApiJuego+'jugador';
  constructor(private http: HttpClient) { }

  guardarJugadoresService(jugador: Jugador):Observable<Jugador>{
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    const body=JSON.stringify(jugador);
    return this.http.post<Jugador>(this.urlJugador,body,httpOptions);
  }

}
