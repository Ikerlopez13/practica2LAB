class Bola extends Rectangle {
    constructor(puntPosicio, amplada, alcada, color) {
        super(puntPosicio, amplada, alcada);       
        this.velocitatx = 2;
        this.velocitaty = 2;
        this.colorCercle = "#eee";
        this.color = color;
       
    };
    mou(mouX,mouY){
        this.puntPosicio.x += mouX;
        this.puntPosicio.y += mouY;
    }

    update(ampleCanva, altCanva, palaJugador, palaOrdinador){
     /********************************* 
     * Tasca. Actualitzar la posició de la bola tenin en compte
     * Si xoca o no amb els marges del canvas
     * Si xoca o no amb les pales dels jugadors 
     **********************************/  
     /********************************* 
     * Identifica el punt actual
     * Defineix el punt següent. On ha d'anar la bola
     * Definiex un SEGMENT que vagi del PuntActual al PuntSegüent
     * Revisar si xoca amb les vores del canvas 
     * Si xoca amb una vora superior o inferior, canviar el sentit i sortir
     * Si xoca amb una vora lateral, identificar punt aconseguit i reiniciar
     * Revisar si xoca amb una Pala
     * Si xoca, canviar el sentit en funció de si ha xocar
     * a dreta, esquerra, a dalt o a baix de la pala
     * canviar el sentit en funció d'on ha xocat i sortir
     **********************************/  

     let puntA = {
        x: this.puntPosicio.x,
        y: this.puntPosicio.y
        } 

     let puntB = {
        x: this.puntPosicio.x + this.velocitatx,
        y: this.puntPosicio.y + this.velocitaty
        }
        
        let xoc = false; 
        let segmentTrajectoria = new Segment(this.puntA, this.puntB);
     /********************************* 
     * Tasca. Revisar si xoca amb tots els marges del canva 
     **********************************/ 
        xoc = revisaXocTop(segmentTrajectoria) || revisaXocDreta(segmentTrajectoria) || revisaXocEsquerra(segmentTrajectoria) ||
            revisaXocInferior(segmentTrajectoria);

        if(!xoc){
            xocPala = this.revisaXocPales(segmentTrajectoria, palaJugador, palaOrdinador);
        }
            
              /********************************* 
             * Tasca. Revisar si xoca amb alguna pala i 
             * en quina vora de la pala xoca 
                **********************************/ 
            if(xocPala){
                switch (xocPala.vora) {
                    case "esquerra":
                    case "dreta":
                this.velocitatx = -this.velocitatx;
                break;

                    case "superior":
                    case "inferior":
                this.velocitaty = -this.velocitaty;
                break;
                }
                }  
                 /********************************* 
                 * Tasca. Si xoca amb alguna pala 
                 * canviar el sentit en funció de si ha xocar
                * a dreta, esquerra, a dalt o a baix de la pala 
                * Poder heu de tenir en compte en quina pala s'ha produït el xoc
                **********************************/ 
                  xoc = true;

                
    
            if(!xoc){
            //Si no hi ha xoc és mou on pertoca
            this.puntPosicio.x = segmentTrajectoria.puntB.x;
            this.puntPosicio.y = segmentTrajectoria.puntB.y;
         }
    
    }
    /********************************* 
     * Tasca. Mètode que utilitza un objecte SEGMENT
     * i identifica si hi ha un xoc amb alguna de les
     * vores del camp
     * Aquí un exemple de com identificar un xoc al marge superior
     * Com a paràmetre accepta un SEGMENT que heu de crear anteriorment
     * Cal fer un mètode per cada lateral que manca: esquerra, dret i inferior
     * El el cas dels laterals caldrà assignar puntuació i reiniciar un nou joc
    **********************************/        
        
        revisaXocTop(segmentTrajectoria){
            if(segmentTrajectoria.puntB.y <0){
                let exces = (segmentTrajectoria.puntB.y)/this.velocitaty;
                this.puntPosicio.x = segmentTrajectoria.puntB.x - exces*this.velocitatx;
                this.puntPosicio.y = 0;
                this.velocitaty = -this.velocitaty;
                return true;
            }
        }

        revisaXocDreta(segmentTrajectoria, ampleCanva, altCanva){
        if(segmentTrajectoria.puntB.x > ampleCanva){
            let exces = (segmentTrajectoria.puntB.x - ampleCanva)/this.velocitatx;
            this.puntPosicio.x = ampleCanva;
            this.puntPosicio.y = segmentTrajectoria.puntB.y - exces*this.velocitaty;
            this.velocitatx = -this.velocitatx;
            this.puntPosicio.x = ampleCanva / 2;
            this.puntPosicio.y = altCanva / 2;
            return true;
            }
        }

        revisaXocInferior(segmentTrajectoria, altCanva){
            if(segmentTrajectoria.puntB.y > altCanva){
                let exces = (segmentTrajectoria.puntB.y)/this.velocitaty;
                this.puntPosicio.x = segmentTrajectoria.puntB.x - exces*this.velocitatx;
                this.puntPosicio.y = altCanva;
                this.velocitaty = -this.velocitaty;
                return true;
            }
        }

        revisaXocEsquerra(segmentTrajectoria, altCanva, ampleCanva){
        if(segmentTrajectoria.puntB.x < 0){
            let exces = -segmentTrajectoria.puntB.x/this.velocitatx;
            this.puntPosicio.x = 0;
            this.puntPosicio.y = segmentTrajectoria.puntB.y - exces*this.velocitaty;
            this.velocitatx = -this.velocitatx;
            this.puntPosicio.x = ampleCanva / 2; 
            this.puntPosicio.y = altCanva / 2;
            return true;
         }
        }
       
        
      
     /********************************* 
     * Tasca. Mètode que utilitza un objecte SEGMENT
     * i el seu mètode INTERSECCIOSEGMENTRECTANGLE per determinar
     * a quina vora del rectangle s'ha produït la col·lisió
     * i quin ha sigut el punt d'intersecció
     * Complemem la informació retornada amb la identificació
     * de quina pala (jugador o màquina) ha provocat el xoc
     * retorna PuntVora, que conté:
     * -El punt d'intersecció
     * -El costat de la pala on s'ha donat la col·lisió
     * -Un identificador de quina pala ha col.lisionat
    **********************************/ 

    revisaXocPales(segmentTrajectoria,palaJugador, palaOrdinador){
        let puntVora  = segmentTrajectoria.interseccioSegmentRectangle(palaJugador)

        if (puntVora){
            puntVora.pala = 'jugador'
            return puntVora;
        }

        puntVora  = segmentTrajectoria.interseccioSegmentRectangle(palaOrdinador)

        if (puntVora){
            puntVora.pala = 'ordinador'
            return puntVora;
        }

    } 

}


