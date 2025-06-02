class Display {
    constructor() {
        this.setupEvents();
        this.ready = false;
    }

    setupEvents() {
        $(document).ready(() => {
            this.ready = true;
            $("#menu").hide();
            $("#mjoc").show();
        });
    }

    updateScoreDisplay(puntsJugador1, puntsJugador2) {
        $("#score-jugador1").text(puntsJugador1);
        $("#score-jugador2").text(puntsJugador2);
    }

    checkGameOver(puntsJugador1, puntsJugador2, puntsObjectiu, nomJugador) {
        if (puntsJugador1 >= puntsObjectiu || puntsJugador2 >= puntsObjectiu) {
            let guanyador = puntsJugador1 >= puntsObjectiu ? nomJugador : "Màquina";
            let punts = Math.max(puntsJugador1, puntsJugador2);
            saveScore(guanyador, punts);
            showHighScores();
            alert("Fi de la partida! Guanyador: " + guanyador);
            $("#mjoc").hide();
            $("#menu").show();
            window.jocActiu = false;
        }
    }
}