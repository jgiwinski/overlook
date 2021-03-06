import { expect } from 'chai';
import Customer from '../src/Customers';

describe('Customer', () => {
  let cust1;
  let cust2;
  let cust3;
  let cust4;
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

    allBookings = [booking1, booking2, booking3, booking4]
  });

  it('should be a function', () => {
    expect(Customer).to.be.a('function');
  });

  it('should be an instance of Customer', () => {
    expect(cust3).to.be.an.instanceOf(Customer);
  });

  it('should take a customer data object', function() {
      expect(cust1.id).to.equal(1);
      expect(cust1.name).to.equal("Leatha Ullrich");
  });

  it('should take a different customer data object', function() {
      expect(cust4.id).to.equal(4);
      expect(cust4.name).to.equal("Kennedi Emard");
  });

  it('should list the number of reservations', function() {
      expect(cust1.roomsBooked.length).to.equal(2);
      expect(cust1.roomsBooked[0].roomNumber).to.equal(12);
  });

});
