
import './css/base.scss';
import './images/bathroom.jpg';
import Customer from './Customers';

// QUERY SELECTORS //
const welcomeGuest = document.querySelector('.welcome-msg');
const totalSpent = document.querySelector('.total-spent');
// let pastReservations = document.querySelector('.past-res');
// let futureReservations = document.querySelector('.future-res');
const allReservations = document.querySelector('.all-res');
const formErrorMessage = document.querySelector('.form-error-message');
const bigErrorMessage = document.querySelector('#bigErrorMessage');


// GLOBAL VARIABLES //
let currentGuest;

function start(values) {
  let allPeople = makeCustomers(values[0])
  currentGuest = allPeople[0];
  let allRooms = currentGuest.findRoomsBooked(values[2], values[1]);
  welcomeGuest.innerHTML = `Welcome ${currentGuest.name}`;
  totalSpent.innerHTML = `You love us this much:  ${currentGuest.calculateTotalSpent()}!`;
  currentGuest.roomsBooked.forEach((res, i) => {
    allReservations.innerHTML += `
    <img src="/images/bathroom.jpg" alt="Photo of room"/>
    <h3>Room Number: ${currentGuest.roomsBooked[i].number} - ${currentGuest.roomsBooked[i].roomType}</h3>
    <h4>CHECK-IN</h4>
    <h4>Cost: $${currentGuest.roomsBooked[i].costPerNight}</h4>
    `;
  })
}


function makeCustomers(data) {
  return data.map(customer => new Customer(customer))
}

// API CALLS AND ERROR HANDLING //
function hide(element) {
  element.classList.add('hidden');
}

function show(element) {
  element.classList.remove('hidden');
}

function checkForError(response) {
  if (!response.ok) {
    throw new Error('Please make sure you\'ve entered some data.');
  } else {
    return response.json();
  }
}

function displayErrorMessage(err) {
  const message = '';

  if (err.message === 'Failed to fetch') {
    message = 'Something went wrong. Please check your internet connection.';
    bigErrorMessage.innerText = message;
    show(bigErrorMessage);
    hide(formErrorMessage);
  } else {
    message = err.message;
    formErrorMessage.innerText = message;
    show(formErrorMessage);
    hide(bigErrorMessage);
  }
}




const customerData = fetchData('/customers', 'customers')
const roomData = fetchData('/rooms', 'rooms')
const bookingData = fetchData('/bookings', 'bookings')

function fetchData(path, key) {
  return fetch(`http://localhost:3001/api/v1${path}`)
    .then(response => response.json())
    .then(data => data[key])
    .catch(error => displayErrorMessage(error))
}

Promise.all([customerData, roomData, bookingData])
  .then(values => start(values))
