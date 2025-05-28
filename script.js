'use strict';

// Gameboard mit Spielbrett, Erzeugen der 3x3 Zellen, setzen der Zeichen des jeweiligen Player
// und aktualisierte Ausgabe des Boards mit den Werten in der Konsole
function gameboard() {
    const rows = 3;
    const columns = 3;
    const board = [

    ];

    // Erstelle in einem Durchlauf Reohen und innerhalb dieser mit einem weiteren Durchlauf Spalten,
    // sodass ein 3x3 Raster entsteht -> also das board-Objekt soll 3 reihen X 3 Spalten haben
    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < columns; j++) {
            board[i].push(cell());
        }
    }

    // Nachdem Spielbrett erstellt wurde, gib es zurück
    const getBoard = () => board;


    // je nach dem, welcher Spieler dran ist (den suchst du aus)
    // => den Player in eine Zelle setzen (column und dazugehörige row aussuchen)

    // iteriere über alle zellen und prüfe, ob dein ausgewählte zelle frei ist
    // wenn ja, setze player rein

    const setToken = (column, row, playerToken) => {
        if (board[row][column].getValue() === 0) {
            board[row][column].addToken(playerToken);
        }
    }

    // Aktualisierten Board in der Konsole ausgeben
    // mit Werten 0, 1 (Player 1), 2 (Player 2)
    const printBoard = () => {
        const boardWithCellValues = board.map(row => row.map(cell => cell.getValue()))
        console.log(boardWithCellValues);
    }


    const winningLines = [
        [[0,0],[0,1],[0,2]],
        [[1,0],[1,1],[1,2]],
        [[2,0],[2,1],[2,2]],
        [[0,0],[1,0],[2,0]],
        [[0,1],[1,1],[2,1]],
        [[0,2],[1,2],[2,2]],
        [[0,0],[1,1],[2,2]],
        [[0,2],[1,1],[2,0]]
    ];

    const checkWinner = () => {
        // über board iterieren und die zellen auslesen (welche tokens sind in den Zellen) => dieses Board (=b) zurück geben
        // finde heraus, ob es eine winningLine gibt, die mit dem gleichen token belegt ist
            // dafür iteriere über die reihen
                // nimm die iterierte winning line und speichere ihre zellen in variablen
                // überprüfe, ob die zellen in der reihe den gleichen token haben => ob die winning line mit dem gleichen token belegt ist
                // wenn ja => gib den token zurück => somit hast du den player, der gewonnen hat
        const b = board.map(row => row.map(cell => cell.getValue()));
        for (const winningLine of winningLines) {
            const [a, b2, c] = winningLine;
            const v1 = b[a[0]][a[1]],
            v2 = b[b2[0]][b2[1]],
            v3 = b[c[0]][c[1]]
            if (v1 !== 0 && v1 === v2 && v2 === v3) {
                return v1;
            }
        }

        if (b.flat().every(v => v !== 0)) return 'draw';
        return null;
    }

    return {
        getBoard,
        setToken,
        printBoard,
        checkWinner
    }
}

// Factory-Function zur Erstellung von Zellen
function cell() {
    let value = 0;

    // für einen Spieler entscheiden und dementsprechend value aktualisieren
    const addToken = (playerToken) => {
        value = playerToken;
    }

    const getValue = () => value;

    return {
        addToken,
        getValue
    }
}



// Spielablauf mit Spieler als Parameter => Direkt das Spiel starten IIFE
function gameController(
    playerOneName = 'Player One',
    playerTwoName = 'Player Two'
) {
// 1) Eine Runde spielen
    // Board wird gedruckt
    // Player One fängt an & setzt zeichen, da wo was frei ist
    // Board mit aktuellem Stand wird in die Konsole gelogt
    // Auswerten des Standes
        // Dementsprechend geht es weiter
            // mit der nächsten Runde
            // oder
            // das Spiel ist zu Ende => Unentschieden oder einer gewinnt => Denjenigen Fall in die Konsole loggen
    // Spieler wechseln und den Schritt 1 so lange wiederholen, bis ein Endergebnis entsteht

    const board = gameboard();

    // Spieler-Objekt aufsetzen, auswählen und wechseln
    let players = {
        playerOne: {
            name: playerOneName,
            token: 1
        },
        playerTwo: {
            name: playerTwoName,
            token: 2
        }
    }

    let activePlayer = players.playerOne;
    const switchPlayers = () => {
        activePlayer = activePlayer === players.playerOne ? players.playerTwo : players.playerOne;
    }
    const getActivePlayer = () => activePlayer;

    // FF - playRound
    const playRound = (column, row) => {
        board.setToken(column, row, getActivePlayer().token)
        board.printBoard();

        const result = board.checkWinner();
        if (result === 'draw') {
            console.log('Unentschieden!');
            return;
        }
        else if (result) {
            console.log(`${getActivePlayer().name} gewinnt!`);
            return
        }

        switchPlayers();
    }

    return {
         playRound
    }
};


// Aufruf der Factory-Function für den Spielablauf
const game = gameController();
game.playRound(1, 2);