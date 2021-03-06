// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/base.scss';
import Customer from './Customers';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
function start(values) {
  let allPeople = makeCustomers(values[0])
}

const customerData = fetchData('/customers', 'customers')
const roomData = fetchData('/rooms', 'rooms')
const bookingData = fetchData('/bookings', 'bookings')

function fetchData(path, key) {
  return fetch(`http://localhost:3001/api/v1${path}`)
    .then(response => response.json())
    .then(data => data[key])
    .catch(error => console.log(error))
}

function makeCustomers(data) {
  return data.map(customer => new Customer(customer))
}

Promise.all([customerData, roomData, bookingData])
  .then(values => start(values))
