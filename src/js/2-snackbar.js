// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector('.form');
// const delay = document.querySelector('input[name="delay"]');
// const radioButton = document.querySelectorAll('input[name="state"]');

form.addEventListener("submit", formSubmit);
// console.log(button);

function formSubmit(event){
    event.preventDefault();
    const delay = event.target.elements.delay.value;
    const result = event.target.elements.state.value;
    if(!delay || !result){
        iziToast.show({
            title: 'Warning',
            position: "topRight",
            message: 'Please fill in all fields and select Fulfilled  or Rejected'
        });
        return;
    }
    callPromise(delay, result)
        .then((value) => {
            console.log(`✅ Fulfilled promise in ${value}ms`);
            iziToast.success({
                title: 'Succsess',
                position: "topCenter",
                message: `✅ Fulfilled promise in ${value}ms`,
            })
        },(value) => {
            console.log(`❌ Rejected promise in ${value}ms`);
            iziToast.error({
                title: 'Fail',
                position: "topCenter",
                message: `❌ Rejected promise in ${value}ms`,
            })
        })
}


function callPromise(time, result) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if(result === 'fulfilled'){
                resolve(time);
            }else{
                reject(time);
            }
        }, time);
    });
}