

let userSelectedDate;



// add library and css 
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
//

// declare constant, variable,  functions, listener , qwrySelector 

const startBtn = document.querySelector('[data-start]');
console.log("with out botton", startBtn);
 
const refs = {
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
  calendar: document.querySelector('#datetime-picker'),
};

startBtn.addEventListener('click', start);



// let userSelectedDate = Date.now();
startBtn.disabled = true;
let currentTime = Date.now();
let timerId = null;

// end declare


// declare  Options -  argument flatpicker, check handleTimer 

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

    onClose(selectedDates) {
           
        if (selectedDates[0] < currentTime) {
        
      iziToast.error({
        message: 'Please choose a date in the future',
        messageColor: '#FFFFF0',
        backgroundColor: '#FF4500',
        position: 'topRight',
        progressBar: false,
        close: false,
      });
      startBtn.disabled = true;
    } else {
      startBtn.disabled = false;
      userSelectedDate = selectedDates[0].getTime();
    }
  },
};

// end options


// change ms to  data format
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
// end change


// add symvol 0 to date format
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
// end

// uppTimer
function handleTimer({ days, hours, minutes, seconds }) {
  refs.days.textContent = addLeadingZero(days);
  refs.hours.textContent = addLeadingZero(hours);
  refs.minutes.textContent = addLeadingZero(minutes);
  refs.seconds.textContent = addLeadingZero(seconds);
}
//end

// functoin stert botton 
function start() {
  timerId = setInterval(() => {
    const countdown = userSelectedDate - Date.now();
         startBtn.disabled = true; 
         if (countdown < 0) {
             clearInterval(timerId);
           //   startBtn.disabled = true;
            refs.calendar.disabled = false;
          return;
          }
        //  startBtn.disabled = true;
          refs.calendar.disabled = true;
          handleTimer(convertMs(countdown));
  }, 1000);
}
// end functions stert



flatpickr('input[type="text"]', options);
// refs.calendar.disabled = true;

