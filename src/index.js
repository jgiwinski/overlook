
import './css/base.scss';
import './images/bathroom.jpg';
import './images/icons8-bed-64.png';
import './images/icons8-stop-sign-52.png';
import './images/icons8-tick-box-64.png';
import './images/sad.jpg';
import Customer from './Customers';
import Hotel from './Hotel';

// QUERY SELECTORS //
const usernameInput = document.querySelector('#username');
const passwordInput = document.querySelector('#password');
const submitLoginBtn = document.querySelector('.submit-login-btn');
const userResBtn = document.querySelector('.user-res-btn');
const bookResBtn = document.querySelector('.book-res-btn');
const loginPageBtn = document.querySelector('.login-btn');

const userPage = document.querySelector('.user-page');
const bookPage = document.querySelector('.book-page');
const loginPage = document.querySelector('.login-page');
const loginForm = document.querySelector('.login-form');

const welcomeGuest = document.querySelector('.welcome-msg');
const totalSpent = document.querySelector('.total-spent');
const allReservations = document.querySelector('.all-res');

const bookingPlaceholder = document.querySelector('.booking-placeholder');
const stopSignError = document.querySelector('.input-stopper');
const fierceApology = document.querySelector('.fierce-apology');
const bookingConf = document.querySelector('.booking-conf');
const bookRoomForm = document.querySelector('.book-room-form');
const roomTypeRadios = document.querySelectorAll('input[name=room-type]:checked');
const allAvailableRooms = document.querySelector('.all-avail-rooms');
const searchBtn = document.querySelector('.search-btn');
const bookBtn = document.querySelector('.book-btn');
let allCustomerData;
let allRoomData;
let allBookingData;

// GLOBAL VARIABLES //
let hotel;
let currentGuest;

// EVENT LISTENERS //
submitLoginBtn.addEventListener('click', login);
loginPageBtn.addEventListener('click', showLoginPage);
userResBtn.addEventListener('click', showUserReservations);
bookResBtn.addEventListener('click', showBookReservations);
searchBtn.addEventListener('click', showAvailableReservations)


// WHERE THE SHIT HAPPENS //
function login(e) {
  e.preventDefault();
  let id;
  if((passwordInput.value === 'overlook2021') && (usernameInput.value)){
    id = parseInt(usernameInput.value.slice(8));
    fetchCustomer(id).then(user => createCustomer(user))
    showUserReservations();
  } else {
    alert('Whoopsies! Looks like you didnt fill the whole form out or your credentials are wrong. Why dont you give it another shot!')
  }
  loginForm.reset();
}

function makeHotel(values, id) {
  allCustomerData = values[0];
  allRoomData = values[1];
  allBookingData = values[2];
  hotel = new Hotel(allCustomerData, allRoomData, allBookingData)
}

function fetchCustomer (id) {
  return fetch(`http://localhost:3001/api/v1/customers/${id}`)
    .then(response => response.json())
    .then(data => data)
    .catch(error => console.log(error))
    console.log(user)
}

function createCustomer (user) {
  currentGuest = new Customer(user);
  welcomeGuest.innerHTML = `Welcome, ${currentGuest.name}.`;
  currentGuest.findRoomsBooked(allBookingData, allRoomData);
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
  // location.reload();
  show(userPage);
  hide(bookPage);
  hide(loginPage);
}

function showBookReservations() {
  show(bookPage);
  hide(userPage);
  hide(loginPage);
}

function formatDate(date) {
  return date.replaceAll('-','/');
}

function showAvailableReservations() {
  const roomTypeRadios = document.querySelectorAll('input[name=room-type]:checked');
  const dateInput = document.querySelector('#calendar');
  const bidetInput = document.querySelector('input[name=bidet]:checked');
  const date = formatDate(dateInput.value);

  if((roomTypeRadios === []) || (bidetInput === null) || (dateInput.value === '')){
    allAvailableRooms.innerHTML = '';
    hide(bookingPlaceholder);
    hide(fierceApology);
    show(stopSignError);
  } else {
    allAvailableRooms.innerHTML = '';
    hide(stopSignError);
    hide(fierceApology);
    hide(bookingPlaceholder);
    hotel.findAvailableRooms(date);
    hotel.filterByRoomType(roomTypeRadios[0].value);
    hotel.hasBidet(bidetInput.value);
    populateResCards(date);
    bookRoomForm.reset();
  }
}

function populateResCards(date) {
  if(hotel.availableRooms.length === 0) {
    show(fierceApology);
  } else {
    hide(fierceApology);
    hotel.availableRooms.forEach((res, i) => {
      allAvailableRooms.innerHTML += `<section class="column">
      <img src="/images/bathroom.jpg" alt="Photo of room"/>
      <h2>Room Number: ${hotel.availableRooms[i].number}</h2>
      <h3>${hotel.availableRooms[i].roomType}</h3>
      <h4>Has bidet: ${hotel.availableRooms[i].bidet}<h4>
      <h4>Cost: $${hotel.availableRooms[i].costPerNight}</h4>
      <input type="submit" class="book-btn" id="${hotel.availableRooms[i].number}-${date}" value="BOOK ROOM"></section>`;
    });
  }
}

allAvailableRooms.addEventListener('click', function(event) {
  if (!event.target.id) {
    return
  } else if (event.target.id === 'home') {
    showUserReservations();
    allAvailableRooms.innerHTML = ``;
    show(bookingPlaceholder);
  } else {
    bookRoom(event.target.id)
    }
  });

function bookRoom(id) {
  const roomDetails = id.split('-');
  const newBooking = {
    "userID": currentGuest.id,
    "date": roomDetails[1],
    "roomNumber": parseInt(roomDetails[0])
  }
  postData(newBooking);
  bookingConfirmation();
}

function bookingConfirmation() {
  allAvailableRooms.innerHTML = `
  <section class="booking-conf column">
    <img id="icon" src="/images/icons8-tick-box-64.png" alt="Confirmation Check Icon Placeholder"/>
    <h1>Your booking has been confirmed!</h1>
    <button id="home">View Your reservations</button>
  </section>`;
}

// API CALLS AND ERROR HANDLING //
function hide(element) {
  element.classList.add('hidden');
}

function show(element) {
  element.classList.remove('hidden');
}

function fetchData(path, key) {
  return fetch(`http://localhost:3001/api/v1${path}`)
    .then(response => response.json())
    .then(data => data[key])
    .catch(error => alert('Oh no! Looks like there was a problem. Try reloading the page.'))
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
  .catch(error => alert('Oh no! Looks like there was a problem. Try reloading the page.'))
}
