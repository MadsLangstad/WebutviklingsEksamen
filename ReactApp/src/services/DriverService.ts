import axios, { AxiosResponse } from 'axios';

type Driver = {
  id: number; 
  name: string | null;
  team: string | null;
  country: string | null;
  driverImage: string | null;
}

const DriverService = (() => {

  const apiPath = '/drivers';
  let controller;

  const initialize = (baseApiUrl) => {
    controller = baseApiUrl + apiPath;
  };

  const getAllDrivers = async (): Promise<Driver[]> => {
    const result: AxiosResponse<Driver[]> = await axios.get(controller);
    return result.data;
  };

  const addDriver = async (driver: Driver): Promise<Driver> => {
    const result: AxiosResponse<Driver> = await axios.post(controller, driver);
    return result;
  }

  const deleteDriver = async (id: number): Promise<void> => {
    const result = await axios.delete(`${controller}/${id}`);
    return result;
  };

  const updateDriver = async (driver: Driver): Promise<Driver> => {
    const result: AxiosResponse<Driver> = await axios.put(`${controller}/${driver.id}`, driver);
    return result;
  };

  return {
    initialize,
    getAllDrivers,
    addDriver,
    deleteDriver,
    updateDriver
  };
})();

export default DriverService;
