// all modules
import { Notify } from 'notiflix';

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    if (shouldResolve) {
      setTimeout(() => {
        resolve({ position, delay });
      }, delay);
    } else {
      setTimeout(() => {
        reject({ position, delay });
      }, delay);
    }
  });
}

async function runPromises(firstDelay, step, amount) {
  for (let i = 0; i < amount; i++) {
    try {
      if (i === 0) {
        console.log(i)
        const { position, delay } = await createPromise(i, firstDelay);
        notificatioCorrect(i, delay);
      } else {
        const { position, delay } = await createPromise(i, step);
         notificatioCorrect(i, delay);
      }
    } catch ({ position, delay }) {
      console.log(`❌ Rejected promise ${position} in ${delay}ms`);
      Notify.warning(`❌ Rejected promise ${position} in ${delay}ms`);
    }
  }
}

const notificatioCorrect=(position, delay) => {
   console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
   Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
}

const firstDelay = document.getElementById('firstDeley');
const step = document.getElementById('step');
const amount = document.getElementById('amount');
const submit = document.querySelector('button');

submit.addEventListener('click', e => {
  e.preventDefault();
  // el ultimo indice siempre es igual a 0 ya que es el iterador
  runPromises(firstDelay.value, step.value, amount.value);
  
});
