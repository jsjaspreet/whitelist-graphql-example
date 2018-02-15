const Book = `
interface Vehicle @cacheControl(maxAge: 30) {
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