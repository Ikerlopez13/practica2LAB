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

        this.pala1 = new Pala (new Punt (30,this.alcada/2-20),10,40,'#000080');
        this.pala2 = new Pala (new Punt (this.amplada-40, this.alcada/2-20),10,40,'#FF0000' );
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
           
        });
        $(document).on("keyup", {joc:this}, function(e){

            /********************************* 
             * Tasca. Indetificar la tecla que ja no està premuda,
             * si és alguna de les definides com a tecla de moviment
             * Actualitzar la propietat pressed a false
            **********************************/

            
            
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