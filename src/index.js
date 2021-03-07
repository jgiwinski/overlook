
import './css/base.scss';
import './images/bathroom.jpg';
import Customer from './Customers';
import Hotel from './Hotel';

// QUERY SELECTORS //
const welcomeGuest = document.querySelector('.welcome-msg');
const totalSpent = document.querySelector('.total-spent');
// let pastReservations = document.querySelector('.past-res');
// let futureReservations = document.querySelector('.future-res');
const allReservations = document.querySelector('.all-res');
const formErrorMessage = document.querySelector('.form-error-message');
const bigErrorMessage = document.querySelector('#bigErrorMessage');
const bookRoomForm = document.querySelector('.book-room-form')
const inputID = document.querySelector('#userIDInput');
const inputDate = document.querySelector('#dateInput');
const inputRoomNumber = document.querySelector('#roomNumberInput');


// GLOBAL VARIABLES //
let hotel;
let currentGuest;

// WHERE THE SHIT HAPPENS //
function makeHotel(values) {
  hotel = new Hotel(values[0], values[1], values[2])
  createCustomer(values) // <- make that dynamic eventually
}

function createCustomer (values) {
  currentGuest = new Customer(values[0][0]);
  welcomeGuest.innerHTML = `Welcome, ${currentGuest.name}.`;
  currentGuest.findRoomsBooked(values[2], values[1]);
  totalSpent.innerHTML = `You love us this much:  ${currentGuest.calculateTotalSpent()}!`;
  currentGuest.roomsBooked.forEach((res, i) => {
    allReservations.innerHTML += `<section class="room-details">
    <img src="/images/bathroom.jpg" alt="Photo of room"/>
    <h2>Room Number: ${currentGuest.roomsBooked[i].number}</h2>
    <h3>${currentGuest.roomsBooked[i].roomType}</h3>
    <h4>CHECK-IN: ${currentGuest.roomsBooked[i].date}</h4>
    <h4>Cost: $${currentGuest.roomsBooked[i].costPerNight}</h4></section>`;
    })
}

bookRoomForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const newBooking = {
    "userID": currentGuest.id,
    "date": inputDate.value,
    "roomNumber": parseInt(inputRoomNumber.value)
  }
  postData(newBooking)
  event.target.reset();
  location.reload()
})

function viewReservationPage (date) {
  hotel.findAvailableRooms(date)

}

// API CALLS AND ERROR HANDLING //
function hide(element) {
  element.classList.add('hidden');
}

function show(element) {
  element.classList.remove('hidden');
}

// function checkForError(response) {
//   if (!response.ok) {
//     throw new Error('Please make sure you\'ve entered some data.');
//   } else {
//     return response.json();
//   }
// }

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
  .then(values => makeHotel(values))

function postData(data) {
  return fetch(`http://localhost:3001/api/v1/bookings`, {
    method: 'POST',
    headers: {
     'Content-Type': 'application/json'
    },
    body: JSON.stringify(data),
  })
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => displayErrorMessage(error))
}
