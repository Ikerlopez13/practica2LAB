//Variables i constants globals
//Main de l'aplicatiu
var joc;
var jocActiu = false;
$(function(){
    showHighScores();
    let myCanvas = $("#joc")[0];
    let myCtx = myCanvas.getContext("2d");

    /********************************* 
     * Tasca. Inicialitza la classe JOC les posicions 
     * dels elements del joc
     * al canva: Pales, bola, etc
    **********************************/  
   

    $("#jugar").click(function(){
        $("#menu").hide();
        $("#mjoc").show();

        const audio = document.getElementById("musica");
        audio.currentTime = 0;
        audio.play();
        audio.loop = true;
        joc = new Joc(myCanvas, myCtx);
        joc.inicialitza();
        jocActiu = true;
        animacio();
    });
});

function animacio(){
    if (jocActiu) {
        joc.update();
        requestAnimationFrame(animacio);
    }
}

function saveScore(nom, punts) {
    let scores = JSON.parse(localStorage.getItem('pong_highscores') || '[]');
    scores.push({ nom, punts });
    scores.sort((a, b) => b.punts - a.punts);
    scores = scores.slice(0, 5);
    localStorage.setItem('pong_highscores', JSON.stringify(scores));
}

function showHighScores() {
    let scores = JSON.parse(localStorage.getItem('pong_highscores') || '[]');
    let html = '<h3>Millors resultats</h3><ol>';
    for (let s of scores) {
        html += `<li>${s.nom}: ${s.punts}</li>`;
    }
    html += '</ol>';
    $("#highscores").html(html);
}
