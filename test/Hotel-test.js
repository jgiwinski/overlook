import { expect } from 'chai';
import Hotel from '../src/Hotel';
import Customer from '../src/Customers'; 

describe('Hotel', () => {
  let cust1;
  let cust2;
  let cust3;
  let cust4;
  let allCustomers;
  let booking1;
  let booking2;
  let booking3;
  let booking4;
  let allBookings;
  let room12;
  let room20;
  let room3;
  let room14;
  let allRooms;
  let hotel;

  beforeEach(function() {
    room12 = {
      "number":12,
      "roomType":"single room",
      "bidet":false,
      "bedSize":"twin",
      "numBeds":2,
      "costPerNight":172.09
    }

    room20 = {
      "number":20,
      "roomType":"residential suite",
      "bidet":false,
      "bedSize":"queen",
      "numBeds":1,
      "costPerNight":343.95
    }

    room3 = {
      "number":3,
      "roomType":"single room",
      "bidet":false,
      "bedSize":"king",
      "numBeds":1,
      "costPerNight":491.14
    }

    room14 = {
      "number":14,
      "roomType":"residential suite",
      "bidet":false,
      "bedSize":"twin",
      "numBeds":1,
      "costPerNight":457.88
    }

    allRooms = [room12, room20, room3, room14]

    booking1 = {
      "id":"5fwrgu4i7k55hl6t8",
      "userID":1,
      "date":"2020/02/05",
      "roomNumber":12,
      "roomServiceCharges":[]
    }

    booking2 = {
      "id":"5fwrgu4i7k55hl6x8",
      "userID":1,
      "date":"2020/01/11",
      "roomNumber":20,
      "roomServiceCharges":[]
    }

    booking3 = {
      "id":"5fwrgu4i7k55hl70e",
      "userID":2,
      "date":"2020/01/20",
      "roomNumber":3,
      "roomServiceCharges":[]
    }

    booking4 = {
      "id":"5fwrgu4i7k55hl718",
      "userID":2,
      "date":"2020/01/17",
      "roomNumber":14,
      "roomServiceCharges":[]
    }

    allBookings = [booking1, booking2, booking3, booking4]

    cust1 = new Customer ({
      "id":1,
      "name":"Leatha Ullrich"
    }, allRooms, allBookings);

    cust2 = new Customer ({
      "id":2,
      "name":"Rocio Schuster"
    }, allRooms, allBookings);

    cust3 = new Customer ({
      "id":3,
      "name":"Kelvin Schiller"
    }, allRooms, allBookings);

    cust4 = new Customer ({
      "id":4,
      "name":"Kennedi Emard"
    }, allRooms, allBookings);

    allCustomers = [cust1, cust2, cust3, cust4]

    hotel = new Hotel(allCustomers, allRooms, allBookings)

  });

  it('should be a function', () => {
    expect(Hotel).to.be.a('function');
  });

  it('should be an instance of Customer', () => {
    expect(hotel).to.be.an.instanceOf(Hotel);
  });

  it('should take in array data', function() {
      expect(hotel.customerData).to.equal(allCustomers);
      expect(hotel.roomData).to.equal(allRooms);
      expect(hotel.bookingData).to.equal(allBookings)
  });

  //
  // it('should take a different customer data object', function() {
  //     expect(cust4.id).to.equal(4);
  //     expect(cust4.name).to.equal("Kennedi Emard");
  // });


//   I should be able to select a date for which I’d like to book a room for myself

// Upon selecting a date, I should be shown a list of room details for only rooms that are available on that date

// I should be able to filter the list of available rooms by their roomType property

// I should be able to select a room for booking

// In the event that no rooms are available for the date/roomType selected, display a message fiercely apologizing to the user and asking them to adjust their room search

});
