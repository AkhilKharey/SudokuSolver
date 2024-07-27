// // document.addEventListener("DOMContentLoaded", () => {
// //   const solveBtn = document.getElementById("solve-btn");
// //   const clearBtn = document.getElementById("clear-btn");
// //   const loadBtn = document.getElementById("load-btn");
// //   const saveBtn = document.getElementById("save-btn");
// //   const hintBtn = document.createElement("button");
// //   hintBtn.innerText = "Hint";
// //   document.querySelector(".controls").appendChild(hintBtn);
// //   const grid = document.getElementById("sudoku-grid");

// //   // Create the grid
// //   for (let i = 0; i < 9; i++) {
// //     const row = grid.insertRow();
// //     for (let j = 0; j < 9; j++) {
// //       const cell = row.insertCell();
// //       const input = document.createElement("input");
// //       input.type = "number";
// //       input.min = "1";
// //       input.max = "9";
// //       input.addEventListener("input", validateInput);
// //       cell.appendChild(input);
// //     }
// //   }

// //   solveBtn.addEventListener("click", solveSudoku);
// //   clearBtn.addEventListener("click", clearGrid);
// //   loadBtn.addEventListener("click", generateRandomPuzzle);
// //   saveBtn.addEventListener("click", savePuzzle);
// //   hintBtn.addEventListener("click", provideHint);

// //   function validateInput(e) {
// //     const value = e.target.value;
// //     if (value < 1 || value > 9) {
// //       e.target.value = "";
// //     }
// //   }

// //   function clearGrid() {
// //     for (let i = 0; i < 9; i++) {
// //       for (let j = 0; j < 9; j++) {
// //         grid.rows[i].cells[j].firstChild.value = "";
// //       }
// //     }
// //   }

// //   function solveSudoku() {
// //     const board = [];
// //     for (let i = 0; i < 9; i++) {
// //       const row = [];
// //       for (let j = 0; j < 9; j++) {
// //         const value = grid.rows[i].cells[j].firstChild.value;
// //         row.push(value ? parseInt(value) : 0);
// //       }
// //       board.push(row);
// //     }

// //     if (solve(board)) {
// //       for (let i = 0; i < 9; i++) {
// //         for (let j = 0; j < 9; j++) {
// //           grid.rows[i].cells[j].firstChild.value = board[i][j] || "";
// //         }
// //       }
// //     } else {
// //       alert("No solution found!");
// //     }
// //   }

// //   function solve(board) {
// //     const empty = findEmpty(board);
// //     if (!empty) return true;

// //     const [row, col] = empty;
// //     for (let num = 1; num <= 9; num++) {
// //       if (isValid(board, num, row, col)) {
// //         board[row][col] = num;
// //         if (solve(board)) return true;
// //         board[row][col] = 0;
// //       }
// //     }

// //     return false;
// //   }

// //   function findEmpty(board) {
// //     for (let i = 0; i < 9; i++) {
// //       for (let j = 0; j < 9; j++) {
// //         if (board[i][j] === 0) return [i, j];
// //       }
// //     }
// //     return null;
// //   }

// //   function isValid(board, num, row, col) {
// //     for (let i = 0; i < 9; i++) {
// //       if (
// //         board[row][i] === num ||
// //         board[i][col] === num ||
// //         board[3 * Math.floor(row / 3) + Math.floor(i / 3)][
// //           3 * Math.floor(col / 3) + (i % 3)
// //         ] === num
// //       ) {
// //         return false;
// //       }
// //     }
// //     return true;
// //   }

// //   function savePuzzle() {
// //     const puzzle = [];
// //     for (let i = 0; i < 9; i++) {
// //       const row = [];
// //       for (let j = 0; j < 9; j++) {
// //         row.push(grid.rows[i].cells[j].firstChild.value || "");
// //       }
// //       puzzle.push(row);
// //     }
// //     const puzzleString = JSON.stringify(puzzle);
// //     const blob = new Blob([puzzleString], { type: "application/json" });
// //     const url = URL.createObjectURL(blob);
// //     const a = document.createElement("a");
// //     a.href = url;
// //     a.download = "sudoku-puzzle.json";
// //     document.body.appendChild(a);
// //     a.click();
// //     document.body.removeChild(a);
// //   }

// //   function generateRandomPuzzle() {
// //     clearGrid();
// //     const puzzle = generatePuzzle();

// //     for (let i = 0; i < 9; i++) {
// //       for (let j = 0; j < 9; j++) {
// //         grid.rows[i].cells[j].firstChild.value = puzzle[i][j] || "";
// //       }
// //     }
// //   }

// //   function generatePuzzle() {
// //     const puzzle = Array.from({ length: 9 }, () => Array(9).fill(0));
// //     fillDiagonal(puzzle);
// //     solve(puzzle);
// //     removeNumbers(puzzle);
// //     return puzzle;
// //   }

// //   function fillDiagonal(puzzle) {
// //     for (let i = 0; i < 9; i += 3) {
// //       fillBox(puzzle, i, i);
// //     }
// //   }

// //   function fillBox(puzzle, row, col) {
// //     let num;
// //     for (let i = 0; i < 3; i++) {
// //       for (let j = 0; j < 3; j++) {
// //         do {
// //           num = Math.floor(Math.random() * 9) + 1;
// //         } while (!isUnusedInBox(puzzle, row, col, num));
// //         puzzle[row + i][col + j] = num;
// //       }
// //     }
// //   }

// //   function isUnusedInBox(puzzle, row, col, num) {
// //     for (let i = 0; i < 3; i++) {
// //       for (let j = 0; j < 3; j++) {
// //         if (puzzle[row + i][col + j] === num) {
// //           return false;
// //         }
// //       }
// //     }
// //     return true;
// //   }

// //   function removeNumbers(puzzle) {
// //     let count = 40;
// //     while (count > 0) {
// //       const cellId = Math.floor(Math.random() * 81);
// //       const i = Math.floor(cellId / 9);
// //       const j = cellId % 9;
// //       if (puzzle[i][j] !== 0) {
// //         puzzle[i][j] = 0;
// //         count--;
// //       }
// //     }
// //   }

// //   function provideHint() {
// //     const board = [];
// //     for (let i = 0; i < 9; i++) {
// //       const row = [];
// //       for (let j = 0; j < 9; j++) {
// //         const value = grid.rows[i].cells[j].firstChild.value;
// //         row.push(value ? parseInt(value) : 0);
// //       }
// //       board.push(row);
// //     }

// //     const originalBoard = JSON.parse(JSON.stringify(board));
// //     if (solve(board)) {
// //       for (let i = 0; i < 9; i++) {
// //         for (let j = 0; j < 9; j++) {
// //           if (originalBoard[i][j] === 0) {
// //             grid.rows[i].cells[j].firstChild.value = board[i][j];
// //             return;
// //           }
// //         }
// //       }
// //     } else {
// //       alert("No solution found!");
// //     }
// //   }
// // });
// document.addEventListener("DOMContentLoaded", () => {
//   const solveBtn = document.getElementById("solve-btn");
//   const clearBtn = document.getElementById("clear-btn");
//   const loadBtn = document.getElementById("load-btn");
//   const saveBtn = document.getElementById("save-btn");
//   const hintBtn = document.createElement("button");
//   const timer = document.createElement("div");
//   const difficultySelect = document.createElement("select");
//   hintBtn.innerText = "Hint";
//   timer.id = "timer";
//   timer.innerText = "Time: 0:00";
//   difficultySelect.innerHTML =
//     '<option value="easy">Easy</option><option value="medium">Medium</option><option value="hard">Hard</option>';
//   document.querySelector(".controls").appendChild(hintBtn);
//   document.querySelector(".controls").appendChild(timer);
//   document.querySelector(".controls").appendChild(difficultySelect);
//   const grid = document.getElementById("sudoku-grid");
//   let interval;
//   let startTime;

//   // Create the grid
//   for (let i = 0; i < 9; i++) {
//     const row = grid.insertRow();
//     for (let j = 0; j < 9; j++) {
//       const cell = row.insertCell();
//       const input = document.createElement("input");
//       input.type = "number";
//       input.min = "1";
//       input.max = "9";
//       input.addEventListener("input", validateInput);
//       cell.appendChild(input);
//     }
//   }

//   solveBtn.addEventListener("click", solveSudoku);
//   clearBtn.addEventListener("click", clearGrid);
//   loadBtn.addEventListener("click", () => {
//     generateRandomPuzzle(difficultySelect.value);
//   });
//   saveBtn.addEventListener("click", savePuzzle);
//   hintBtn.addEventListener("click", provideHint);

//   function validateInput(e) {
//     const value = e.target.value;
//     if (value < 1 || value > 9) {
//       e.target.value = "";
//     }
//   }

//   function clearGrid() {
//     for (let i = 0; i < 9; i++) {
//       for (let j = 0; j < 9; j++) {
//         grid.rows[i].cells[j].firstChild.value = "";
//       }
//     }
//     clearInterval(interval);
//     timer.innerText = "Time: 0:00";
//   }

//   function solveSudoku() {
//     const board = [];
//     for (let i = 0; i < 9; i++) {
//       const row = [];
//       for (let j = 0; j < 9; j++) {
//         const value = grid.rows[i].cells[j].firstChild.value;
//         row.push(value ? parseInt(value) : 0);
//       }
//       board.push(row);
//     }

//     if (solve(board)) {
//       for (let i = 0; i < 9; i++) {
//         for (let j = 0; j < 9; j++) {
//           grid.rows[i].cells[j].firstChild.value = board[i][j] || "";
//         }
//       }
//     } else {
//       alert("No solution found!");
//     }
//   }

//   function solve(board) {
//     const empty = findEmpty(board);
//     if (!empty) return true;

//     const [row, col] = empty;
//     for (let num = 1; num <= 9; num++) {
//       if (isValid(board, num, row, col)) {
//         board[row][col] = num;
//         if (solve(board)) return true;
//         board[row][col] = 0;
//       }
//     }

//     return false;
//   }

//   function findEmpty(board) {
//     for (let i = 0; i < 9; i++) {
//       for (let j = 0; j < 9; j++) {
//         if (board[i][j] === 0) return [i, j];
//       }
//     }
//     return null;
//   }

//   function isValid(board, num, row, col) {
//     for (let i = 0; i < 9; i++) {
//       if (
//         board[row][i] === num ||
//         board[i][col] === num ||
//         board[3 * Math.floor(row / 3) + Math.floor(i / 3)][
//           3 * Math.floor(col / 3) + (i % 3)
//         ] === num
//       ) {
//         return false;
//       }
//     }
//     return true;
//   }

//   function savePuzzle() {
//     const puzzle = [];
//     for (let i = 0; i < 9; i++) {
//       const row = [];
//       for (let j = 0; j < 9; j++) {
//         row.push(grid.rows[i].cells[j].firstChild.value || "");
//       }
//       puzzle.push(row);
//     }
//     const puzzleString = JSON.stringify(puzzle);
//     const blob = new Blob([puzzleString], { type: "application/json" });
//     const url = URL.createObjectURL(blob);
//     const a = document.createElement("a");
//     a.href = url;
//     a.download = "sudoku-puzzle.json";
//     document.body.appendChild(a);
//     a.click();
//     document.body.removeChild(a);
//   }

//   function generateRandomPuzzle(difficulty) {
//     clearGrid();
//     const puzzle = generatePuzzle(difficulty);

//     for (let i = 0; i < 9; i++) {
//       for (let j = 0; j < 9; j++) {
//         grid.rows[i].cells[j].firstChild.value = puzzle[i][j] || "";
//       }
//     }
//     startTimer();
//   }

//   function generatePuzzle(difficulty) {
//     const puzzle = Array.from({ length: 9 }, () => Array(9).fill(0));
//     fillDiagonal(puzzle);
//     solve(puzzle);
//     removeNumbers(puzzle, difficulty);
//     return puzzle;
//   }

//   function fillDiagonal(puzzle) {
//     for (let i = 0; i < 9; i += 3) {
//       fillBox(puzzle, i, i);
//     }
//   }

//   function fillBox(puzzle, row, col) {
//     let num;
//     for (let i = 0; i < 3; i++) {
//       for (let j = 0; j < 3; j++) {
//         do {
//           num = Math.floor(Math.random() * 9) + 1;
//         } while (!isUnusedInBox(puzzle, row, col, num));
//         puzzle[row + i][col + j] = num;
//       }
//     }
//   }

//   function isUnusedInBox(puzzle, row, col, num) {
//     for (let i = 0; i < 3; i++) {
//       for (let j = 0; j < 3; j++) {
//         if (puzzle[row + i][col + j] === num) {
//           return false;
//         }
//       }
//     }
//     return true;
//   }

//   function removeNumbers(puzzle, difficulty) {
//     let count;
//     if (difficulty === "easy") {
//       count = 30;
//     } else if (difficulty === "medium") {
//       count = 40;
//     } else {
//       count = 50;
//     }
//     while (count > 0) {
//       const cellId = Math.floor(Math.random() * 81);
//       const i = Math.floor(cellId / 9);
//       const j = cellId % 9;
//       if (puzzle[i][j] !== 0) {
//         puzzle[i][j] = 0;
//         count--;
//       }
//     }
//   }

//   function provideHint() {
//     const board = [];
//     for (let i = 0; i < 9; i++) {
//       const row = [];
//       for (let j = 0; j < 9; j++) {
//         const value = grid.rows[i].cells[j].firstChild.value;
//         row.push(value ? parseInt(value) : 0);
//       }
//       board.push(row);
//     }

//     const originalBoard = JSON.parse(JSON.stringify(board));
//     if (solve(board)) {
//       for (let i = 0; i < 9; i++) {
//         for (let j = 0; j < 9; j++) {
//           if (originalBoard[i][j] === 0) {
//             grid.rows[i].cells[j].firstChild.value = board[i][j];
//             return;
//           }
//         }
//       }
//     } else {
//       alert("No solution found!");
//     }
//   }

//   function startTimer() {
//     clearInterval(interval);
//     startTime = Date.now();
//     interval = setInterval(() => {
//       const elapsedTime = Date.now() - startTime;
//       const minutes = Math.floor(elapsedTime / 60000);
//       const seconds = Math.floor((elapsedTime % 60000) / 1000);
//       timer.innerText = `Time: ${minutes}:${seconds
//         .toString()
//         .padStart(2, "0")}`;
//     }, 1000);
//   }
// });
document.addEventListener("DOMContentLoaded", () => {
  const solveBtn = document.getElementById("solve-btn");
  const clearBtn = document.getElementById("clear-btn");
  const loadBtn = document.getElementById("load-btn");
  const saveBtn = document.getElementById("save-btn");
  const hintBtn = document.createElement("button");
  const undoBtn = document.createElement("button");
  const redoBtn = document.createElement("button");
  const timer = document.createElement("div");
  const difficultySelect = document.createElement("select");
  hintBtn.innerText = "Hint";
  undoBtn.innerText = "Undo";
  redoBtn.innerText = "Redo";
  timer.id = "timer";
  timer.innerText = "Time: 0:00";
  difficultySelect.innerHTML =
    '<option value="easy">Easy</option><option value="medium">Medium</option><option value="hard">Hard</option>';
  document.querySelector(".controls").appendChild(hintBtn);
  document.querySelector(".controls").appendChild(undoBtn);
  document.querySelector(".controls").appendChild(redoBtn);
  document.querySelector(".controls").appendChild(timer);
  document.querySelector(".controls").appendChild(difficultySelect);
  const grid = document.getElementById("sudoku-grid");
  let interval;
  let startTime;
  let history = [];
  let redoStack = [];

  // Create the grid
  for (let i = 0; i < 9; i++) {
    const row = grid.insertRow();
    for (let j = 0; j < 9; j++) {
      const cell = row.insertCell();
      const input = document.createElement("input");
      input.type = "number";
      input.min = "1";
      input.max = "9";
      input.addEventListener("input", handleInputChange);
      cell.appendChild(input);
    }
  }

  solveBtn.addEventListener("click", solveSudoku);
  clearBtn.addEventListener("click", clearGrid);
  loadBtn.addEventListener("click", () => {
    generateRandomPuzzle(difficultySelect.value);
  });
  saveBtn.addEventListener("click", savePuzzle);
  hintBtn.addEventListener("click", provideHint);
  undoBtn.addEventListener("click", undo);
  redoBtn.addEventListener("click", redo);

  function handleInputChange(e) {
    const value = e.target.value;
    if (value < 1 || value > 9) {
      alert("number should be between 1 to 9");
      e.target.value = "";
    }
    saveToHistory();
  }

  function validateInput(e) {
    const value = e.target.value;
    if (value < 1 || value > 9) {
      e.target.value = "";
    }
  }

  function clearGrid() {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        grid.rows[i].cells[j].firstChild.value = "";
      }
    }
    clearInterval(interval);
    timer.innerText = "Time: 0:00";
    history = [];
    redoStack = [];
  }

  function solveSudoku() {
    const board = [];
    for (let i = 0; i < 9; i++) {
      const row = [];
      for (let j = 0; j < 9; j++) {
        const value = grid.rows[i].cells[j].firstChild.value;
        row.push(value ? parseInt(value) : 0);
      }
      board.push(row);
    }

    if (solve(board)) {
      for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
          grid.rows[i].cells[j].firstChild.value = board[i][j] || "";
        }
      }
    } else {
      alert("No solution found!");
    }
  }

  function solve(board) {
    const empty = findEmpty(board);
    if (!empty) return true;

    const [row, col] = empty;
    for (let num = 1; num <= 9; num++) {
      if (isValid(board, num, row, col)) {
        board[row][col] = num;
        if (solve(board)) return true;
        board[row][col] = 0;
      }
    }

    return false;
  }

  function findEmpty(board) {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (board[i][j] === 0) return [i, j];
      }
    }
    return null;
  }

  function isValid(board, num, row, col) {
    for (let i = 0; i < 9; i++) {
      if (
        board[row][i] === num ||
        board[i][col] === num ||
        board[3 * Math.floor(row / 3) + Math.floor(i / 3)][
          3 * Math.floor(col / 3) + (i % 3)
        ] === num
      ) {
        return false;
      }
    }
    return true;
  }

  function savePuzzle() {
    const puzzle = [];
    for (let i = 0; i < 9; i++) {
      const row = [];
      for (let j = 0; j < 9; j++) {
        row.push(grid.rows[i].cells[j].firstChild.value || "");
      }
      puzzle.push(row);
    }
    const puzzleString = JSON.stringify(puzzle);
    const blob = new Blob([puzzleString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "sudoku-puzzle.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  function generateRandomPuzzle(difficulty) {
    clearGrid();
    const puzzle = generatePuzzle(difficulty);

    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        grid.rows[i].cells[j].firstChild.value = puzzle[i][j] || "";
      }
    }
    startTimer();
  }

  function generatePuzzle(difficulty) {
    const puzzle = Array.from({ length: 9 }, () => Array(9).fill(0));
    fillDiagonal(puzzle);
    solve(puzzle);
    removeNumbers(puzzle, difficulty);
    return puzzle;
  }

  function fillDiagonal(puzzle) {
    for (let i = 0; i < 9; i += 3) {
      fillBox(puzzle, i, i);
    }
  }

  function fillBox(puzzle, row, col) {
    let num;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        do {
          num = Math.floor(Math.random() * 9) + 1;
        } while (!isUnusedInBox(puzzle, row, col, num));
        puzzle[row + i][col + j] = num;
      }
    }
  }

  function isUnusedInBox(puzzle, row, col, num) {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (puzzle[row + i][col + j] === num) {
          return false;
        }
      }
    }
    return true;
  }

  function removeNumbers(puzzle, difficulty) {
    let count;
    if (difficulty === "easy") {
      count = 30;
    } else if (difficulty === "medium") {
      count = 40;
    } else {
      count = 50;
    }
    while (count > 0) {
      const cellId = Math.floor(Math.random() * 81);
      const i = Math.floor(cellId / 9);
      const j = cellId % 9;
      if (puzzle[i][j] !== 0) {
        puzzle[i][j] = 0;
        count--;
      }
    }
  }

  function provideHint() {
    const board = [];
    for (let i = 0; i < 9; i++) {
      const row = [];
      for (let j = 0; j < 9; j++) {
        const value = grid.rows[i].cells[j].firstChild.value;
        row.push(value ? parseInt(value) : 0);
      }
      board.push(row);
    }

    const originalBoard = JSON.parse(JSON.stringify(board));
    if (solve(board)) {
      for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
          if (originalBoard[i][j] === 0) {
            grid.rows[i].cells[j].firstChild.value = board[i][j];
            return;
          }
        }
      }
    } else {
      alert("No solution found!");
    }
  }

  function startTimer() {
    clearInterval(interval);
    startTime = Date.now();
    interval = setInterval(() => {
      const elapsedTime = Date.now() - startTime;
      const minutes = Math.floor(elapsedTime / 60000);
      const seconds = Math.floor((elapsedTime % 60000) / 1000);
      timer.innerText = `Time: ${minutes}:${seconds
        .toString()
        .padStart(2, "0")}`;
    }, 1000);
  }

  function saveToHistory() {
    const currentGrid = [];
    for (let i = 0; i < 9; i++) {
      const row = [];
      for (let j = 0; j < 9; j++) {
        row.push(grid.rows[i].cells[j].firstChild.value);
      }
      currentGrid.push(row);
    }
    history.push(currentGrid);
    redoStack = [];
  }

  function undo() {
    if (history.length > 1) {
      redoStack.push(history.pop());
      const lastState = history[history.length - 1];
      for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
          grid.rows[i].cells[j].firstChild.value = lastState[i][j];
        }
      }
    }
  }

  function redo() {
    if (redoStack.length > 0) {
      const nextState = redoStack.pop();
      for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
          grid.rows[i].cells[j].firstChild.value = nextState[i][j];
        }
      }
      history.push(nextState);
    }
  }
});
