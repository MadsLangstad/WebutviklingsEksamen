import axios from 'axios';

// Define a type for the car object based on the structure you expect from the API
type Car = {
  id: string; // Assuming there's an 'id' field
  model: string; // Assuming there's a 'model' field
  // Add other fields with their types as expected from your API
};

const CarService = (() => {
  const carController = "http://localhost:5143/api/car";

  const getAllCars = async (): Promise<Car[]> => { // Specify that this function returns a promise of an array of Car objects
    const result = await axios.get<Car[]>(carController); // Use generics to specify the response data type
    console.log(result);
    return result.data;
  };

  return {
    getAllCars,
  };
})();

export default CarService;
