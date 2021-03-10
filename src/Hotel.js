import Customer from './Customers'

class Hotel {
  constructor(customers, rooms, bookings) {
    this.customerData = customers;
    this.roomData = rooms;
    this.bookingData = bookings;
    this.availableRooms = [];
  }

  findAvailableRooms (date) {
    const booked = this.bookingData.filter(booking => booking.date === date).map(booking => booking.roomNumber);
    const availableRooms = this.roomData.filter(room => !booked.includes(room.number));
    this.availableRooms = availableRooms;
  }

  filterByRoomType (type) {
    let filteredList = this.availableRooms.filter(room => room.roomType === type)
    return this.availableRooms = filteredList;
  }

  hasBidet (opinion) {
    if(opinion === 'true'){
      return this.availableRooms = this.availableRooms.filter(room => room.bidet)
    } else {
      return this.availableRooms = this.availableRooms.filter(room => !room.bidet)
    }
  }
}

export default Hotel;
