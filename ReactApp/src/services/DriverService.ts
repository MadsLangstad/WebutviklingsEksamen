import axios, { AxiosResponse } from 'axios';

type Driver = {
  id: number;
  name: string | null;
  team: string | null;
  country: string | null;
  podiums: number | null;
  grandPrixEntered: number;
  worldChampionships: number | null;
  higestRaceFinish: string | null;
  highestGridPosition: number;
  dateOfBirth: string;
  placeOfBirth: string | null;
  driverImage: string | null;
}

const DriverService = (() => {
  const driverController = "http://localhost:5143/api/drivers";

  const getAllDrivers = async (): Promise<Driver[]> => {
    const result: AxiosResponse<Driver[]> = await axios.get(driverController);
    return result.data;
  };

  const addDriver = async (driverName: string, driverCountry: string): Promise<Driver> => {
    
    axios.post(driverController, {
      name: driverName,
      country: driverCountry,
    })
    .then(function (response) { 
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  return {
    getAllDrivers,
    addDriver
  };
})();

export default DriverService;
