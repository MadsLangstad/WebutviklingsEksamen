import axios, { AxiosResponse } from 'axios';

type Driver = {
  id: number; 
  name: string | null;
  team: string | null;
  country: string | null;
  image: string | null;
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

  const addDriver = async (driver: Driver, image: HTMLInputElement): Promise<Driver> => {
    const formData = new FormData();

    formData.append('driver', JSON.stringify(driver));
    formData.append('image', image);

    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    }

    const result: AxiosResponse<Driver> = await axios.post(controller, formData, config);
    return result;
  }

  const deleteDriver = async (id: number): Promise<void> => {
    const result = await axios.delete(`${controller}/${id}`);
    return result;
  };

  const updateDriver = async (driver: Driver, image: HTMLInputElement): Promise<Driver> => {
    const formData = new FormData();

    formData.append('driver', JSON.stringify(driver));

    if (image !== null) {
      formData.append('image', image);
    }

    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    }

    const result: AxiosResponse<Driver> = await axios.put(`${controller}/${driver.id}`, formData, config);
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
