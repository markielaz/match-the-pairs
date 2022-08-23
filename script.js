const buttons = [...document.getElementsByClassName('game-button')];

const divs = [...document.getElementsByClassName('tile-content')];

let matchedDivs = 0;
let moves = 0;

let comparisonTile = {};

document.getElementById('moves').innerHTML = `Moves: ${moves}`

// let valueArray = ['pot', 'pan', 'kettle']
// value.push(...valueArray);

// buttons.forEach(button => {
//   let arrayIndex = Math.ceil(Math.random() * valueArray.length);
//   button.children[0].innerHTML = valueArray[arrayIndex];
//   valueArray.splice(arrayIndex,1);
//   arrayIndex.splice(arrayIndex,1);
// })

buttons.forEach(button => {
  button.style.order = getRandomInt(0, 1000);
})

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); 
}
// buttons[0].style.order = getRandomInt(0, 1000);
// buttons[1].style.order = Math.random() * 1000;
// buttons[2].style.order = Math.random() * 1000;
// buttons[3].style.order = Math.random() * 1000;
// buttons[4].style.order = Math.random() * 1000;
// buttons[5].style.order = Math.random() * 1000;

function resetGame() {
  divs.forEach(div => {
    div.classList.remove('revealed-tile')
    div.classList.remove('matched-tile')
    div.classList.add('hidden-tile')

  })
  delete comparisonTile.id;
  delete comparisonTile.value;
  delete comparisonTile.parentButton;

  moves = 0;

  buttons.forEach(button => {
    button.removeEventListener("click", revealTile);
  })

  buttons.forEach(button => {
    button.addEventListener("click", revealTile);
  })

  buttons.forEach(button => {
    button.style.order = getRandomInt(0, 1000);
  })
  document.getElementById('moves').innerHTML = `Moves: ${moves}`
}

function resetTiles() {

  divs.forEach(div => {
    if (!div.classList.contains('matched-tile')) {
      buttons.forEach(button => {
        button.addEventListener("click", revealTile);
      })

      div.classList.remove('revealed-tile')
      div.classList.add('hidden-tile')
    }
  })
};


function revealTile() {

  let childDiv = event.target.children[0];

  childDiv.classList.add('revealed-tile');
  childDiv.classList.remove('hidden-tile');

  if (Object.keys(comparisonTile).length === 0) {
    //First click
    comparisonTile.value = childDiv.innerHTML;
    comparisonTile.id = childDiv.id;
    comparisonTile.parentButton = event.target;
    event.target.removeEventListener("click", revealTile)
    console.dir(childDiv.img)
  } else if (comparisonTile.value === childDiv.innerHTML) {
    //Second click - match
    childDiv.classList.add('matched-tile');
    document.getElementById(comparisonTile.id).classList.add('matched-tile');

    event.target.removeEventListener("click", revealTile)
    comparisonTile.parentButton.removeEventListener("click", revealTile)

    delete comparisonTile.id;
    delete comparisonTile.value;
    delete comparisonTile.parentButton;

    moves++;
    document.getElementById('moves').innerHTML = `Moves: ${moves}`

    setTimeout(testVictory,500);
  } else {
    //Second click - no match
    delete comparisonTile.value;
    delete comparisonTile.id;
    delete comparisonTile.parentButton;
    buttons.forEach(button => {
      button.removeEventListener("click", revealTile);
    })

    moves++;
    document.getElementById('moves').innerHTML = `Moves: ${moves}`

    setTimeout(resetTiles, 1000);
  }

}

function testVictory() {
  matchedDivs = 0

  divs.forEach(div => {
    if (div.classList.contains('matched-tile')) {
      matchedDivs++
    }

    if (matchedDivs === divs.length) {
      setTimeout(window.alert(`Congratulations, you\'re a winner! You completed the puzzle in ${moves} moves!`), 1000)
      resetGame();
    }

  })
}


//Event listeners
buttons.forEach(button => {
  button.addEventListener("click", revealTile);
})
document.getElementById('reset-button').addEventListener('click', resetGame)
