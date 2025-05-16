class Pala extends Rectangle{
    constructor(puntPosicio, amplada, alcada){
        super(puntPosicio, amplada, alcada);
        this.velocitatX = 2;
        this.velocitatY = 2;
        this.cocolorRectangle = "#eee";
    }

    mou(mouX,mouY){
        this.puntPosicio.x += mouX;
        this.puntPosicio.y += mouY;
    }
    update(key, alcada){
        if(key.DOWN.pressed && this.puntPosicio.y < this.alcada){
            this.mou(0, this.velocitatY);
        }
        if(key.UP.pressed && this.puntPosicio.y > 0){
            this.mou(0, -this.velocitatY);
        }
    }
    updateAuto(alcada){
       let puja = true;
       this.puntPosicio.y += this.velocitatY;

       if(this.puntPosicio.y < 0 || this.puntPosicio.y > alcada - this.alcada){
        puja = !puja;
       }

       if(puja){
        this.mou(0, this.velocitatY);
       }else{
        this.mou(0, -this.velocitatY);
       }
    }

}