import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

//la usamos para prevenir ataques
document.cookie = 'cookieName=cookieValue; SameSite=Lax';


const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];

    if (selectedDate < new Date()) {
      window.alert('Please choose a date in the future');
      document.querySelector('[data-start]').disabled = true;
      return;
    }

    document.querySelector('[data-start]').disabled = false;
  },
};

flatpickr('#datetime-picker', options);

const startButton = document.querySelector('[data-start]');
startButton.disabled=true
startButton.addEventListener('click', startTimer);

let countdownInterval;

function startTimer() {
  const selectedDate = flatpickr.parseDate(
    document.querySelector('#datetime-picker').value,
    'Y-m-d H:i'
  );
  const countdown = document.querySelector('.timer');

  updateTimer(countdown, selectedDate);

  countdownInterval = setInterval(() => {
    updateTimer(countdown, selectedDate);

    if (new Date() >= selectedDate) {
      clearInterval(countdownInterval);
    }
  }, 1000);
}

function updateTimer(countdown, selectedDate) {
  const timeLeft = selectedDate - new Date();
  const { days, hours, minutes, seconds } = convertMs(timeLeft);

  countdown.querySelector('[data-days]').textContent = formatValue(days);
  countdown.querySelector('[data-hours]').textContent = formatValue(hours);
  countdown.querySelector('[data-minutes]').textContent = formatValue(minutes);
  countdown.querySelector('[data-seconds]').textContent = formatValue(seconds);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function formatValue(value) {
  return value.toString().padStart(2, '0');
}
