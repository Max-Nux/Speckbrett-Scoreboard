let currentServer = "player1"; // Spieler 1 beginnt mit dem Aufschlag
let setCounts = { player1: 0, player2: 0 }; // Zähler für gewonnene Sätze

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("player1").classList.add("active");
    updateServeIndicatorForPlayer1();
});

function updateScore(scoreId, opponentId, change, scorer) {
    let scoreElement = document.getElementById(scoreId);
    let opponentScoreElement = document.getElementById(opponentId === "player1" ? "score1" : "score2");
    let score = parseInt(scoreElement.innerText, 10);
    let opponentScore = parseInt(opponentScoreElement.innerText, 10);

    if (isNaN(score)) score = 0;
    if (isNaN(opponentScore)) opponentScore = 0;
    if (score + change < 0) return; // Verhindert negative Punktzahlen

    score += change; // Aktualisiere die Punktzahl
    scoreElement.innerText = score;

    document.getElementById("player1").classList.remove("active");
    document.getElementById("player2").classList.remove("active");
    document.getElementById(opponentId).classList.add("active");

    if (scorer !== currentServer) {
        currentServer = opponentId;
    }

    if (scoreId === "score1") {
        updateServeIndicatorForPlayer2();
    } else if (scoreId === "score2") {
        updateServeIndicatorForPlayer1();
    }

    if (score >= 21 && (score - opponentScore) >= 2) {
        document.getElementById("winner").innerText = scoreId === "score1" ? "Spieler 1 hat den Satz gewonnen!" : "Spieler 2 hat den Satz gewonnen!";
        disableButtons();

        if (scoreId === "score1") {
            setCounts.player1++;
            updateSetCounter("player1", setCounts.player1);
        } else if (scoreId === "score2") {
            setCounts.player2++;
            updateSetCounter("player2", setCounts.player2);
        }

        if (setCounts.player1 === 2 || setCounts.player2 === 2) {
            document.getElementById("winner").innerText = scoreId === "score1" ? "Spieler 1 hat das Spiel gewonnen!" : "Spieler 2 hat das Spiel gewonnen!";
            setTimeout(() => {
                fullResetGame();
            }, 4000);
        } else {
            setTimeout(() => {
                resetGame();
            }, 2000);
        }
    }
}

function updateServeIndicatorForPlayer2() {
    let serveIndicator = document.getElementById("serve1");
    serveIndicator.innerText = "-";

    let opponentScore = parseInt(document.getElementById("score1").innerText, 10);
    serveIndicator = document.getElementById("serve2");

    if (opponentScore % 2 === 0) {
        serveIndicator.innerText = "➡️ Rechtes Feld";
    } else {
        serveIndicator.innerText = "⬅️ Linkes Feld";
    }

    serveIndicator.style.display = "block";
}

function updateServeIndicatorForPlayer1() {
    let serveIndicator = document.getElementById("serve2");
    serveIndicator.innerText = "-";

    let opponentScore = parseInt(document.getElementById("score2").innerText, 10);
    serveIndicator = document.getElementById("serve1");

    if (opponentScore % 2 === 0) {
        serveIndicator.innerText = "➡️ Rechtes Feld";
    } else {
        serveIndicator.innerText = "⬅️ Linkes Feld";
    }

    serveIndicator.style.display = "block";
}

function disableButtons() {
    let buttons = document.querySelectorAll("button");
    buttons.forEach(button => button.disabled = true);
}

function updateSetCounter(playerId, setCount) {
    let setCircles = document.querySelectorAll(`#${playerId} .set-counter .set-circle`);
    setCircles.forEach((circle, index) => {
        if (index < setCount) {
            circle.classList.add("filled");
        } else {
            circle.classList.remove("filled");
        }
    });
}

function resetGame() {
    document.getElementById("score1").innerText = "0";
    document.getElementById("score2").innerText = "0";
    document.getElementById("winner").innerText = "";
    let buttons = document.querySelectorAll("button");
    buttons.forEach(button => button.disabled = false);
    currentServer = "player1";
    document.getElementById("player1").classList.add("active");
    document.getElementById("player2").classList.remove("active");
    updateServeIndicatorForPlayer2();
    updateServeIndicatorForPlayer1();
}
function fullResetGame() {
    document.getElementById("score1").innerText = "0";
    document.getElementById("score2").innerText = "0";
    document.getElementById("winner").innerText = "";
    let buttons = document.querySelectorAll("button");
    buttons.forEach(button => button.disabled = false);

    
    // Setze die Satzzähler zurück
    setCounts.player1 = 0;
    setCounts.player2 = 0;

    // Aktualisiere die Anzeige der Satzzähler
    updateSetCounter("player1", setCounts.player1);
    updateSetCounter("player2", setCounts.player2);

    currentServer = "player1";
    document.getElementById("player1").classList.add("active");
    document.getElementById("player2").classList.remove("active");
    updateServeIndicatorForPlayer2();
    updateServeIndicatorForPlayer1(); 
}

// Initialisierung beim Laden der Seite
document.getElementById("player1").classList.add("active");
updateServeIndicatorForPlayer2();
updateServeIndicatorForPlayer1();