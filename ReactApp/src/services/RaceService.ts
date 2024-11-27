// src/services/RaceService.ts

import axios, { AxiosResponse } from 'axios';

export interface Race {
  id: number;
  grandPrix: string | null;
  winner: string | null;
  laps: number | null;
  image: string | null;
}

const RaceService = (() => {
  const apiPath = '/races';
  let controller: string = '';

  const initialize = (baseApiUrl: string) => {
    controller = baseApiUrl + apiPath;
  };

  const getAllRaces = async (): Promise<Race[]> => {
    const result: AxiosResponse<Race[]> = await axios.get(controller);
    return result.data;
  };

  const addRace = async (race: Race, image: File | null): Promise<Race> => {
    const formData = new FormData();
    formData.append('race', JSON.stringify(race));
    if (image) {
      formData.append('image', image);
    }

    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };

    const result: AxiosResponse<Race> = await axios.post(controller, formData, config);
    return result.data;
  };

  const deleteRace = async (id: number): Promise<boolean> => {
    await axios.delete(`${controller}/${id}`);
    return true;
  };

  const updateRace = async (race: Race, image: File | null): Promise<boolean> => {
    const formData = new FormData();
    formData.append('race', JSON.stringify(race));
    if (image) {
      formData.append('image', image);
    }

    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };

    await axios.put(`${controller}/${race.id}`, formData, config);
    return true;
  };

  return {
    initialize,
    getAllRaces,
    addRace,
    deleteRace,
    updateRace,
  };
})();

export default RaceService;
