export class JugadorActual{
    nombre:string;
    turnoActual:boolean;
    movtoActual:string;
    rondasGanadas:Number;

    constructor(){
        this.nombre = "";
        this.turnoActual = false;
        this.movtoActual = "";
        this.rondasGanadas = 0;
    }

}