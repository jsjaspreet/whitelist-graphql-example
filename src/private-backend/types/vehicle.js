const Book = `
interface Vehicle {
  maxSpeed: Int
}

type Airplane implements Vehicle {
  maxSpeed: Int
  wingspan: Int
}

type Car implements Vehicle {
  maxSpeed: Int
  licensePlate: String
}
`;

module.exports = Book;