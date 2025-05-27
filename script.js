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

    const setToken = (column, row, player) => {
        if (board[row][column].getValue() !== 0) {
            return;
        }
        else {
            board[row][column].addToken(player);
        }
    }

    // Aktualisierten Board in der Konsole ausgeben
    // mit Werten 0, 1 (Player 1), 2 (Player 2)
    const printBoard = () => {
        const boardWithCellValues = board.map(row => row.map(cell => cell.getValue()))
        console.log(boardWithCellValues);
    }

    return {
        getBoard,
        setToken,
        printBoard
    }
}

// Factory-Function zur Erstellung von Zellen
function cell() {
    let value = 0;

    // für einen Spieler entscheiden und dementsprechend value aktualisieren
    const addToken = (player) => {
        value = player;
    }

    const getValue = () => value;

    return {
        addToken,
        getValue
    }
}


// Spieler - Factory-Function



// Spielablauf - Factory-Function



// Aufruf der Factory-Function für den Spielablauf