// all modules
import Notiflix from 'notiflix';

function createPromise(position, delay, amount, i) {
  // iterador para saber cuantas veces
  // falta usar la recursividad la primera vez = 0 desde parametro

  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    if (shouldResolve) {
      // Fulfill
      setTimeout(() => {
        resolve({ position, delay });
      }, delay);
    } else {
      // Reject
      setTimeout(() => {
        reject({ position, delay });
      }, delay);
    }

    // Llamar a la función recursivamente con el siguiente índice
    if (i < amount) {
      createPromise(position, delay, amount, (i += 1))
        .then(({ position, delay }) => {
          console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
          
           Notiflix.notify(
             'success',
             `✅ Fulfilled promise ${position} in ${delay}ms`
           );
        })
        .catch(({ position, delay }) => {
          console.log(`❌ Rejected promise ${position} in ${delay}ms`);

          Notiflix.notify(
            'warning',
            `❌ Rejected promise ${position} in ${delay}ms`
          );
        });
    }
  });
}

const firstDelay = document.getElementById('firstDeley');
const step = document.getElementById('step');
const amount = document.getElementById('amount');
const submit = document.querySelector('button');

submit.addEventListener('click', e => {
  e.preventDefault();
  // el ultimo indice siempre es igual a 0 ya que es el iterador
  createPromise(firstDelay.value, step.value, amount.value, 0);
});
