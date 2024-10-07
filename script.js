// script.js
document.addEventListener("DOMContentLoaded", () => {
    const cells = document.querySelectorAll(".cell");
    let currentPlayer = "X";
    let boardState = Array(9).fill(null);

    // Gérer les clics sur les cases
    cells.forEach((cell, index) => {
        cell.addEventListener("click", () => {
            if (!boardState[index]) {
                boardState[index] = currentPlayer;
                cell.textContent = currentPlayer;
                cell.classList.add("taken");
                if (checkWinner()) {
                    setTimeout(() => alert(`Le joueur ${currentPlayer} a gagné!`), 100);
                    resetBoard();
                } else if (boardState.every(cell => cell !== null)) {
                    setTimeout(() => alert("Match nul!"), 100);
                    resetBoard();
                } else {
                    currentPlayer = currentPlayer === "X" ? "O" : "X";
                }
            }
        });
    });

    // Vérifier le gagnant
    function checkWinner() {
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Lignes
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Colonnes
            [0, 4, 8], [2, 4, 6]             // Diagonales
        ];

        return winningCombinations.some(combination => {
            const [a, b, c] = combination;
            return boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c];
        });
    }

    // Réinitialiser le plateau
    function resetBoard() {
        boardState.fill(null);
        cells.forEach(cell => {
            cell.textContent = "";
            cell.classList.remove("taken");
        });
        currentPlayer = "X";
    }
});
