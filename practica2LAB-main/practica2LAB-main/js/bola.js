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
        // Identifica el punt actual
        this.puntA = new Punt(this.puntPosicio.x, this.puntPosicio.y);
        // Defineix el punt següent segons la velocitat
        this.puntB = new Punt(this.puntPosicio.x + this.velocitatx, this.puntPosicio.y + this.velocitaty);
        let xoc = false;
        let segmentTrajectoria = new Segment(this.puntA, this.puntB);

        // Comprova col·lisions amb les vores del canvas
        xoc = this.revisaXocTop(segmentTrajectoria) ||
              this.revisaXocDreta(segmentTrajectoria, ampleCanva, altCanva) ||
              this.revisaXocEsquerra(segmentTrajectoria, ampleCanva, altCanva) ||
              this.revisaXocInferior(segmentTrajectoria, altCanva);

        // Si no hi ha xoc amb parets, revisa col·lisió amb pales
        let xocPala = false;
        if(!xoc){
            xocPala = this.revisaXocPales(segmentTrajectoria, palaJugador, palaOrdinador);
        }

        // Si xoca amb alguna pala, canvia el sentit segons la vora
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
            xoc = true;
        }

        // Si no hi ha cap xoc, mou la bola on pertoca
        if(!xoc){
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
            if(segmentTrajectoria.puntB.y <=0){
                let exces = (segmentTrajectoria.puntB.y)/this.velocitaty;
                this.puntPosicio.x = segmentTrajectoria.puntB.x - exces*this.velocitatx;
                this.puntPosicio.y = 0;
                this.velocitaty = -this.velocitaty;
                return true;
            }
            return false;
        }

        revisaXocDreta(segmentTrajectoria, ampleCanva, altCanva){
            if(segmentTrajectoria.puntB.x + this.amplada > ampleCanva){
                let exces = (segmentTrajectoria.puntB.x + this.amplada - ampleCanva)/this.velocitatx;
                this.puntPosicio.x = ampleCanva - this.amplada;
                this.puntPosicio.y = segmentTrajectoria.puntB.y - exces*this.velocitaty;
                this.velocitatx = -this.velocitatx;
                return true;
            }
            return false;
        }

        revisaXocInferior(segmentTrajectoria, altCanva){
            if(segmentTrajectoria.puntB.y + this.alcada > altCanva){
                let exces = (segmentTrajectoria.puntB.y + this.alcada - altCanva) / this.velocitaty;
                this.puntPosicio.x = segmentTrajectoria.puntB.x - exces*this.velocitatx;
                this.puntPosicio.y = altCanva - this.alcada;
                this.velocitaty = -this.velocitaty;
                return true;
            }
            return false;
        }

        revisaXocEsquerra(segmentTrajectoria, altCanva, ampleCanva){
            if(segmentTrajectoria.puntB.x < 0){
                let exces = -segmentTrajectoria.puntB.x/this.velocitatx;
                this.puntPosicio.x = 0;
                this.puntPosicio.y = segmentTrajectoria.puntB.y - exces*this.velocitaty;
                this.velocitatx = -this.velocitatx;
                return true;
            }
            return false;
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

