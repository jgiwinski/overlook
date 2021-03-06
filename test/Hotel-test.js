import { expect } from 'chai';
import Hotel from '../src/Hotel';

describe('Customer', () => {
  let cust1;
  let cust2;
  let cust3;
  let cust4;

  beforeEach(function() {
    cust1 = new Customer ({
      "id":1,
      "name":"Leatha Ullrich"
    });

    cust2 = new Customer ({
      "id":2,
      "name":"Rocio Schuster"
    });

    cust3 = new Customer ({
      "id":3,
      "name":"Kelvin Schiller"
    });

    cust4 = new Customer ({
      "id":4,
      "name":"Kennedi Emard"
    });
  });

  it('should be a function', () => {
    expect(Hotel).to.be.a('function');
  });

  it('should be an instance of Customer', () => {
    expect().to.be.an.instanceOf(Hotel);
  });

  // it('should take a customer data object', function() {
  //     expect(cust1.id).to.equal(1);
  //     expect(cust1.name).to.equal("Leatha Ullrich");
  // });
  //
  // it('should take a different customer data object', function() {
  //     expect(cust4.id).to.equal(4);
  //     expect(cust4.name).to.equal("Kennedi Emard");
  // });

});
