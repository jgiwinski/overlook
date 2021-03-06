class Customer {
  constructor(customer, rooms, bookings) {
    this.id = customer.id;
    this.name = customer.name;
    this.roomsBooked = [];
  }

  findRoomsBooked (bookings, rooms) {
    let filter = bookings.filter(room => this.id === room.uersId);
    
  }

  calculateTotalSpent () {

  }

}

export default Customer;
