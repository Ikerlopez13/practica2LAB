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

        this.pala1 = new Pala (new Punt (30,this.alcada/2-20),10,40,'#FFFF');
        this.pala2 = new Pala (new Punt (this.amplada-40, this.alcada/2-20),10,40,'#FFFF' );
        this.bola = new Bola (new Punt(this.amplada/2,this.alcada/2), 5,5,'#FFFF' );
       

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

             /********************************* 
             * Tasca. Indetificar la tecla premuda si és alguna
             * de les definides com a tecla de moviment
             * Actualitzar la propietat pressed a true 
            **********************************/
            switch(e.which){
                case 39:
                    this.key.RIGHT.pressed=true;break;
                case 37:
                    this.key.LEFT.pressed=true;break;
                case 40:
                    this.key.DOWN.pressed=true;break;
                case 38:
                    this.key.UP.pressed=true;break;
            }
           
        });
        $(document).on("keyup", {joc:this}, function(e){

            /********************************* 
             * Tasca. Indetificar la tecla que ja no està premuda,
             * si és alguna de les definides com a tecla de moviment
             * Actualitzar la propietat pressed a false
            **********************************/
            switch(e.which){
                case 39:
                    this.key.RIGHT.pressed=false;break;
                case 37:
                    this.key.LEFT.pressed=false;break;
                case 40:
                    this.key.DOWN.pressed=false;break;
                case 38:
                    this.key.UP.pressed=false;break;
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
          /********************************* 
         * Tasca. Actualitzar les posicions 
         * dels elements del joc
         * al canva: Pales, bola, etc
        **********************************/ 
        this.bola.update(this.amplada, this.alcada, this.pala1, this.pala2);
        this.pala2.updateAuto(this.alcada);
        this.pala1.update(this.key, this.alcada);
        this.draw();
    }

    draw(){
        
        
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
