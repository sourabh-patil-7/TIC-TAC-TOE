// required elements
const GameInfo = document.querySelector(".game-info");
const boxes = document.querySelectorAll(".box");
const newGameBtn = document.querySelector(".btn");

let CurrentPlayer; //shows which turn to play
let Grid; //Grid is require to check behind the logic while boxes will show it on the board
const winningPositions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
]; //this are the possible winning postions

// call the function initgame() intially
initGame();
// this function will initialize the game
function initGame() {
  CurrentPlayer = "X";
  Grid = ["", "", "", "", "", "", "", "", ""];

  boxes.forEach((box, index) => {
    box.innerHTML = ""; //make all the boxes as empty
    // boxes[index].style.pointerEvents = "all";
    box.style.pointerEvents = "all"; //this will on the pointer events on the particular box
    //this makes all the boxes like it was present in intial
    // (in short we are  doing this for removing the green color background of the winner line)
    box.classList = `box box${index + 1}`;
  });

  newGameBtn.classList.remove("active"); //now new game button will be invisible
  GameInfo.innerHTML = `Current Player - ${CurrentPlayer}`; //for showing the turn of the current player but initially it is X
}

function checkGameOver() {
  let winnerPlayer = "";

  winningPositions.forEach((position) => {
    if (
      (Grid[position[0]] === "X" &&
        Grid[position[1]] === "X" &&
        Grid[position[2]] === "X") ||
      (Grid[position[0]] === "O" &&
        Grid[position[1]] === "O" &&
        Grid[position[2]] === "O")
    ) {
      if (Grid[position[0]] === "X") winnerPlayer = "X";
      else winnerPlayer = "O";

      //removing the pointer events from all the boxes because we got the winner here
      boxes.forEach((box) => {
        box.style.pointerEvents = "none";
      });

      //now make the successful line as green background
      boxes[position[0]].classList.add("win");
      boxes[position[1]].classList.add("win");
      boxes[position[2]].classList.add("win");
    }
  });

  // this is for checking the winner
  if (winnerPlayer !== "") {
    GameInfo.innerHTML = `Winner Player - ${winnerPlayer}`;
    newGameBtn.classList.add("active");
    return;
  }

  //suppose if game is tied means all the boxes are filled means boxCountFilled is 9
  let boxCountFilled = 0;
  Grid.forEach((box) => {
    if (box !== "") boxCountFilled++;
  });

  if (boxCountFilled == 9) {
    GameInfo.innerHTML = "Game Tied !";
    newGameBtn.classList.add("active");
  }
}

function handliClick(index) {
  if (Grid[index] === "") {
    boxes[index].innerHTML = CurrentPlayer;
    Grid[index] = CurrentPlayer;
    Grid.forEach((ans) => {
      console.log(ans);
    });
    boxes[index].style.pointerEvents = "none";

    //now swap the turns of the player
    if (CurrentPlayer === "X") {
      CurrentPlayer = "O";
    } else {
      CurrentPlayer = "X";
    }
    GameInfo.innerHTML = `Current Player - ${CurrentPlayer}`;

    //now check is the gameOver
    checkGameOver();
  }
}

boxes.forEach((box, index) => {
  box.addEventListener("click", () => {
    handliClick(index);
  });
});

//when user click on the newbutton then game will initialize again
newGameBtn.addEventListener("click", () => {
  initGame();
});



