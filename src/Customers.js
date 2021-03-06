class Customer {
  constructor(customer) {
    this.id = customer.id;
    this.name = customer.name;
    this.roomsBooked = [];
  }

  findRoomsBooked (bookings, rooms) {
    let filtered = bookings.filter(room => room.userID === this.id);
    let totalBooked = filtered.map(br => rooms.find(room => room.number === br.roomNumber))
    this.roomsBooked = totalBooked;
  }

  calculateTotalSpent () {
    let total = this.roomsBooked.reduce((acc, room) => {
      acc += room.costPerNight;
      return acc;
    }, 0);
    return total;
  }
}

export default Customer;
