const { makeExecutableSchema } = require('graphql-tools');
const typeDefs = require('./types');

// Some fake data
const vehicles = [
  {
    maxSpeed: 42,
    wingspan: 20
  },
  {
    maxSpeed: 10,
    licensePlate: "10HONEY"
  }
];

function addCar(maxSpeed, licensePlate = "UNKNOWN") {
  const car = { maxSpeed, licensePlate };
  vehicles.push(car);
  return car;
}


// All possible resolvers
const resolvers = {
  Vehicle: {
    __resolveType(obj, context, info) {
      if (obj.wingspan) {
        return 'Airplane';
      }

      if (obj.licensePlate) {
        return 'Car';
      }

      return null;
    },
  },
  Mutation: {
    addCar: (_, { maxSpeed, licensePlate }) => addCar(maxSpeed, licensePlate)
  },
  Query: {
    vehicles: () => {
      console.log("GETTING VEHICLES FROM SERVER!");
      return vehicles;
    }
  },
};

// Put together a typedefs
const schema = makeExecutableSchema({
  typeDefs,
  resolvers
});


module.exports = schema;
