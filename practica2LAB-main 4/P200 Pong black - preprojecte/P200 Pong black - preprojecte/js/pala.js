class Pala extends Rectangle{
    constructor(puntPosicio, amplada, alcada, color){
        super(puntPosicio, amplada, alcada);
        this.velocitatX = 2;
        this.velocitatY = 2;
        this.cocolorRectangle = "#eee";
        this.color = color;
    }

    mou(mouX, mouY){
        this.puntPosicio.x += mouX;
        this.puntPosicio.y += mouY;
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
        // Añadimos margen aleatorio para que la máquina falle a veces
        let margen = 10 + Math.random() * 30;
        if (bola.puntPosicio.y + bola.alcada/2 < this.puntPosicio.y + this.alcada/2 - margen && this.puntPosicio.y > 0) {
            this.puntPosicio.y -= this.velocitatY;
        }
        if (bola.puntPosicio.y + bola.alcada/2 > this.puntPosicio.y + this.alcada/2 + margen && this.puntPosicio.y + this.alcada < alcada) {
            this.puntPosicio.y += this.velocitatY;
        }
    }

}
