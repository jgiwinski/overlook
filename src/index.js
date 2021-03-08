
import './css/base.scss';
import './images/bathroom.jpg';
import './images/icons8-bed-64.png'
// import datepicker from 'js-datepicker'
import Customer from './Customers';
import Hotel from './Hotel';

// QUERY SELECTORS //
const userResBtn = document.querySelector('.user-res-btn');
const bookResBtn = document.querySelector('.book-res-btn');
const loginBtn = document.querySelector('.login-btn');
const userPage = document.querySelector('.user-page');
const bookPage = document.querySelector('.book-page');
const loginPage = document.querySelector('.login-page');
const welcomeGuest = document.querySelector('.welcome-msg');
const totalSpent = document.querySelector('.total-spent');
// let pastReservations = document.querySelector('.past-res');
// let futureReservations = document.querySelector('.future-res');
const allReservations = document.querySelector('.all-res');
const formErrorMessage = document.querySelector('.form-error-message');
const bigErrorMessage = document.querySelector('#bigErrorMessage');
const bookingPlaceholder = document.querySelector('.booking-placeholder');
const bookRoomForm = document.querySelector('.book-room-form')
const roomTypeRadios = document.querySelectorAll('input[name=room-type]:checked');
// const inputRoomNumber = document.querySelector('#roomNumberInput');
const allAvailableRooms = document.querySelector('.all-avail-rooms');
const searchBtn = document.querySelector('.search-btn');
const bookBtn = document.querySelector('.book-btn');
// const calendar = document.querySelector('#calendar');
// const picker = datepicker(calendar)


// GLOBAL VARIABLES //
let hotel;
let currentGuest;

// EVENT LISTENERS //
loginBtn.addEventListener('click', showLoginPage);
userResBtn.addEventListener('click', showUserReservations);
bookResBtn.addEventListener('click', showBookReservations);
searchBtn.addEventListener('click', showAvailableReservations)

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

// WHERE THE SHIT HAPPENS //
function makeHotel(values) {
  hotel = new Hotel(values[0], values[1], values[2])
  createCustomer(values) // <- make that dynamic eventually
}

function createCustomer (values) {
  currentGuest = new Customer(values[0][0]);
  welcomeGuest.innerHTML = `Welcome, ${currentGuest.name}.`;
  currentGuest.findRoomsBooked(values[2], values[1]);
  totalSpent.innerHTML = `You love us this much: $${currentGuest.calculateTotalSpent()}!`;
  currentGuest.roomsBooked.forEach((res, i) => {
    allReservations.innerHTML += `<section class="column">
    <img src="/images/bathroom.jpg" alt="Photo of room"/>
    <h2>Room Number: ${currentGuest.roomsBooked[i].number}</h2>
    <h3>${currentGuest.roomsBooked[i].roomType}</h3>
    <h4>CHECK-IN: ${currentGuest.roomsBooked[i].date}</h4>
    <h4>Cost: $${currentGuest.roomsBooked[i].costPerNight}</h4></section>`;
  })
}

function showLoginPage() {
  show(loginPage);
  hide(bookPage);
  hide(userPage);
}

function showUserReservations() {
  show(userPage);
  hide(bookPage);
  hide(loginPage);
}

function showBookReservations() {
  show(bookPage);
  hide(userPage);
  hide(loginPage);
  // show()
}

function formatDate(date) {
  return date.replaceAll('-','/');
}

function showAvailableReservations() {
  hide(bookingPlaceholder)
  allAvailableRooms.innerHTML = ``;
  const roomTypeRadios = document.querySelectorAll('input[name=room-type]:checked');
  const dateInput = document.querySelector('#calendar');
  let date = formatDate(dateInput.value)
  hotel.findAvailableRooms(date);
  hotel.filterByRoomType(roomTypeRadios[0].value);
  hotel.availableRooms.forEach((res, i) => {
    allAvailableRooms.innerHTML += `<section class="column">
    <img src="/images/bathroom.jpg" alt="Photo of room"/>
    <h2>Room Number: ${hotel.availableRooms[i].number}</h2>
    <h3>${hotel.availableRooms[i].roomType}</h3>
    <h4>Cost: $${hotel.availableRooms[i].costPerNight}</h4>
    <button class="book-btn">BOOK ROOM</button></section>`;
    })
  bookRoomForm.reset();
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

function fetchData(path, key) {
  return fetch(`http://localhost:3001/api/v1${path}`)
    .then(response => response.json())
    .then(data => data[key])
    .catch(error => displayErrorMessage(error))
  }
const customerData = fetchData('/customers', 'customers')
const roomData = fetchData('/rooms', 'rooms')
const bookingData = fetchData('/bookings', 'bookings')


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
