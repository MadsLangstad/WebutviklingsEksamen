// src/services/DriverService.ts

import axios, { AxiosResponse } from 'axios';

export interface Driver {
  id: number; 
  name: string | null;
  team: string | null;
  country: string | null;
  image: string | null;
}

const DriverService = (() => {
  const apiPath = '/drivers';
  let controller: string = '';

  const initialize = (baseApiUrl: string) => {
    controller = baseApiUrl + apiPath;
  };

  const getAllDrivers = async (): Promise<Driver[]> => {
    const result: AxiosResponse<Driver[]> = await axios.get(controller);
    return result.data;
  };

  const addDriver = async (driver: Driver, image: File | null): Promise<Driver> => {
    const formData = new FormData();
    formData.append('driver', JSON.stringify(driver));
    if (image) {
      formData.append('image', image);
    }

    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };

    const result: AxiosResponse<Driver> = await axios.post(controller, formData, config);
    return result.data;
  };

  const deleteDriver = async (id: number): Promise<boolean> => {
    await axios.delete(`${controller}/${id}`);
    return true;
  };

  const updateDriver = async (driver: Driver, image: File | null): Promise<boolean> => {
    const formData = new FormData();
    formData.append('driver', JSON.stringify(driver));
    if (image) {
      formData.append('image', image);
    }

    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };

    await axios.put(`${controller}/${driver.id}`, formData, config);
    return true;
  };

  return {
    initialize,
    getAllDrivers,
    addDriver,
    deleteDriver,
    updateDriver,
  };
})();

export default DriverService;
