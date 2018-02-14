const RootQuery = `
  type Query { 
    vehicles: [Vehicle]
  }
  
  type Mutation {
    addCar(maxSpeed: Int!, licensePlate: String): Vehicle!
  }
`;

module.exports = RootQuery;
