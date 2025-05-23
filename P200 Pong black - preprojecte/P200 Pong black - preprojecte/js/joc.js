class Joc{
    constructor(myCanvas, myCtx){
        this.myCanvas = myCanvas;
        this.myCtx = myCtx;
        this.amplada = myCanvas.width;
        this.alcada = myCanvas.height;

        //Elements del joc
        /********************************* 
         * Tasca. Crear els elements del joc
         * Pales, bola, etc
        **********************************/

        

        this.pala1 = new Pala (new Punt (30,this.alcada/2-40),20,80,'#000080');
        this.pala2 = new Pala (new Punt (this.amplada-50, this.alcada/2-40),20,80,'#FF0000' );
        this.bola = new Bola (new Punt(this.amplada/2,this.alcada/2), 16,16,'#FFFF' );
       

        //Tecles de control
         //tecles del Joc. Només fem servir up i down
        
         this.key = {
            RIGHT: {code: 39, pressed: false},
            LEFT: {code: 37, pressed: false},
            DOWN: {code: 40, pressed: false},
            UP: {code: 38, pressed: false}
        }
    }
        set velocitat(velocitatJoc){
        this.velocitatJoc = velocitatJoc;
    }

    inicialitza(){

        $(document).on("keydown",{joc:this}, function(e){
            //const joc = e.data.joc;
            if (e.keyCode == e.data.joc.key.UP.code) {
                e.data.joc.key.UP.pressed = true;
            }
            if (e.keyCode == e.data.joc.key.DOWN.code) {
                e.data.joc.key.DOWN.pressed = true;
            }
        });
        $(document).on("keyup", {joc:this}, function(e){
            //const joc = e.data.joc;
            if (e.keyCode === e.data.joc.key.UP.code) {
                e.data.joc.key.UP.pressed = false;
            }
            if (e.keyCode === e.data.joc.key.DOWN.code) {
                e.data.joc.key.DOWN.pressed = false;
            }
        });

        /********************************* 
         * Tasca. Dibuixar inicialment els elements del joc
         * al canva: Pales, bola, etc
        **********************************/
        this.draw();

           //Màtode de crida recursiva per generar l'animació dels objectes
         requestAnimationFrame(animacio);
    }
       

    update(){
        
        this.pala1.update(this.key, this.alcada);
        this.pala2.updateAuto(this.bola, this.alcada);
        this.bola.update(this.amplada, this.alcada, this.pala1, this.pala2);
        this.draw();
    }

    draw(){
        this.clearCanvas();
        
        /********************************* 
         * Tasca. Dibuixar els elements del joc
         * al canva, un cop actualitzades
         * les seves posicions: Pales, bola, etc
        **********************************/  
        this.pala1.draw(this.myCtx);
        this.pala2.draw(this.myCtx);
        this.bola.draw(this.myCtx);
        
    }
    //Neteja el canvas
    clearCanvas(){
        this.myCtx.clearRect(
            0,0,
            this.amplada, this.alcada
        )
    }


}
