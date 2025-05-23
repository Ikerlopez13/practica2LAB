class Pala extends Rectangle{
    constructor(puntPosicio, amplada, alcada, color){
        super(puntPosicio, amplada, alcada);
        this.velocitatX = 2;
        this.velocitatY = 2;
        this.cocolorRectangle = "#eee";
        this.color = color;
    }

    mou(mouX,mouY){
        this.puntPosicio.x += x;
        this.puntPosicio.y += y;
    }
    update(key, alcada){
        if(key.DOWN && key.DOWN.pressed && this.puntPosicio.y + this.alcada < alcada) {
            this.puntPosicio.y += this.velocitatY;
        }
        if(key.UP && key.UP.pressed && this.puntPosicio.y > 0) {
            this.puntPosicio.y -= this.velocitatY;
        }
    }
    updateAuto(bola, alcada){
        // Si la bola está por encima del centro de la pala, sube
        if (bola.puntPosicio.y + bola.alcada/2 < this.puntPosicio.y + this.alcada/2 && this.puntPosicio.y > 0) {
            this.puntPosicio.y -= this.velocitatY;
        }
        // Si la bola está por debajo del centro de la pala, baja
        if (bola.puntPosicio.y + bola.alcada/2 > this.puntPosicio.y + this.alcada/2 && this.puntPosicio.y + this.alcada < alcada) {
            this.puntPosicio.y += this.velocitatY;
        }
    }

}
