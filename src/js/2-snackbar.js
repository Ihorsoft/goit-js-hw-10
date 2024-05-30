import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

form.addEventListener('submit', event => {
    event.preventDefault();
    const delay = Number(event.target.elements.delay.value);
    const handleState = event.target.elements.state.value;
   
    createPromise(delay, handleState)
     .then(delay => {
       iziToast.success({
         message: `Fulfilled promise in ${delay}ms`,
         messageColor: '#FFFFF0',
         backgroundColor: 'green',
         position: 'topRight',
         progressBar: false,
         close: false,
        });
     })
    .catch(delay => {
      iziToast.error({
        message: `Rejected promise in ${delay}ms`,
        messageColor: '#FFFFF0',
        backgroundColor: 'red',
        position: 'topRight',
        progressBar: false,
        close: false,
       });
    });

});

function createPromise(delay, state) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (state === 'fulfilled') {
          resolve(delay);
        } else {
          reject(delay);
        }
      }, delay);
    });
  }