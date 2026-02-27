// Описаний в документації
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";

import iziToast from "izitoast";

import "izitoast/dist/css/iziToast.min.css";

let userSelectedDate = null;
const timer = document.querySelector('#datetime-picker');
const button = document.querySelector("[data-start]");
const dataDays = document.querySelector("[data-days]");
const dataHours = document.querySelector("[data-hours]");
const dataMinutes = document.querySelector("[data-minutes]");
const dataSeconds = document.querySelector("[data-seconds]");

let change = null;


function switchButton(date, change){
    if(date && change ){
    button.disabled = false;
    timer.disabled = false;
    button.style.backgroundColor  = "rgb(21, 61, 236)";
    button.style.color = "rgb(255, 255, 255)"; 
    button.style.cursor = "pointer";
    return;
    }
    if(date && !change ){
    button.disabled = true;
    timer.disabled = false;
    button.style.backgroundColor  = "#cfcfcf";
    button.style.color = "#989898";
    button.style.cursor = "default";
    return;
    }
    button.disabled = true;
    timer.disabled = true;
    button.style.backgroundColor  = "#cfcfcf";
    button.style.color = "#989898";
    button.style.cursor = "default";
    timer.style.cursor = "default";
    return;
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if(selectedDates[0] <= new Date()){
        iziToast.warning({
            close: true,
            message: "Please choose a date in the future",
            position: "topRight",
        });
          change = false;
        switchButton(selectedDates[0], change);
        return;
    }
    change = true;
    userSelectedDate = selectedDates[0];
    switchButton(selectedDates[0], change);
    // console.log(selectedDates[0]);
  },
};

flatpickr(timer, options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

button.addEventListener("click", handleClick);

 function addZero(value){
  return String(value).padStart(2, '0');
}
function handleClick(){
 if(!userSelectedDate){
  switchButton(userSelectedDate);
  return;
 }
 const clock = setInterval(() => {
  const diff = userSelectedDate - new Date();
  if(diff <= 0){
    clearInterval(clock);
    dataSeconds.textContent = "00";
    dataMinutes.textContent = "00";
    dataHours.textContent = "00";
    dataDays.textContent = "00";

    switchButton(userSelectedDate);
    return;

  }
  const {days , hours, minutes, seconds} = convertMs(diff);
    dataSeconds.textContent = addZero(seconds);
    dataMinutes.textContent = addZero(minutes);
    dataHours.textContent = addZero(hours);
    dataDays.textContent = addZero(days);
    }, 1000);
    switchButton(null);
}

