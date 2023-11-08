import axios, { AxiosResponse } from 'axios';

// Define a type or interface for the driver object based on the structure you expect from the API
type Driver = {
  id: string; // Assuming there's an 'id' field
  name: string; // Assuming there's a 'name' field
  // ... add other fields as expected from your API
};

const DriverService = (() => {
  const driverController = "http://localhost:5143/api/Driver";

  // The getAllDrivers method now explicitly states that it returns a Promise of Driver[]
  const getAllDrivers = async (): Promise<Driver[]> => {
    // We can also specify the type of the Axios response to be AxiosResponse<Driver[]>
    const result: AxiosResponse<Driver[]> = await axios.get(driverController);
    console.log(result);
    return result.data;
  };

  return {
    getAllDrivers,
  };
})();

export default DriverService;
