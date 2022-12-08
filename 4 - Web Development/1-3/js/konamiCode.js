const konamiCodeOne = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];
let konamiCountOne = 0;

const konamiCodeTwo = ['a', 'b', 'c', 'd'];
let konamiCountTwo = 0;

document.addEventListener('keyup', (event) => {
  event.preventDefault();
  if (event.key === konamiCodeOne[konamiCountOne]) {
    console.log(`Got ${konamiCountOne+1} correct!`);
    konamiCountOne++;

    if(konamiCodeOne.length === konamiCountOne) {
      const audio = new Audio('media/bonus.wav');
      audio.loop = false;
      audio.play();
      konamiCountOne = 0;
    }
  } else {
    konamiCountOne = 0;
  }

  if (event.key === konamiCodeTwo[konamiCountTwo]) {
    console.log(`Got ${konamiCountTwo+1} correct!`);
    konamiCountTwo++;

    if(konamiCodeTwo.length === konamiCountTwo) {
      if (document.body.style.color === "cyan") {
        document.body.style.color = "#345B63";
      } else {
        document.body.style.color = "cyan";
      }
      konamiCountTwo = 0;
    }
  } else {
    konamiCountTwo = 0;
  }
})