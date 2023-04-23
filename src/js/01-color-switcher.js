const btnStart = document.querySelector('[data-start]');
const btnStop = document.querySelector('[data-stop]');
const body = document.querySelector('body');

let timerId = null;

btnStart.addEventListener("click", () => {
    btnStart.disabled = true;
    btnStop.disabled = false;
    timerId = setInterval(() => {
        changeColorBody(getRandomHexColor())
    }, 1000);
})

btnStop.addEventListener("click", () => {
    btnStart.disabled = false;
    btnStop.disabled = true;
    clearInterval(timerId);
})

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
function changeColorBody(random) {
    let color = random;
    body.style.display = "inline";
    body.style.background = color;
}
