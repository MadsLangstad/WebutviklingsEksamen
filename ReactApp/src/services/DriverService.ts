import axios, { AxiosResponse } from 'axios';

type Driver = {
  id: number; 
  name: string | null;
  team: string | null;
  country: string | null;
  driverImage: string | null;
}

const DriverService = (() => {
  const driverController = "http://localhost:5143/api/drivers";

  const getAllDrivers = async (): Promise<Driver[]> => {
    const result: AxiosResponse<Driver[]> = await axios.get(driverController);
    return result.data;
  };

  const addDriver = async (driver: Driver): Promise<Driver> => {
    const result: AxiosResponse<Driver> = await axios.post(driverController, driver);
    return result;
  }

  const deleteDriver = async (id: number): Promise<void> => {
    const result = await axios.delete(`${driverController}/${id}`);
    return result;
  };

  const updateDriver = async (driver: Driver): Promise<Driver> => {
    const result: AxiosResponse<Driver> = await axios.put(`${driverController}/${driver.id}`, driver);
    return result;
  };

  // Edit Driver

  return {
    getAllDrivers,
    addDriver,
    deleteDriver,
    updateDriver
  };
})();

export default DriverService;
