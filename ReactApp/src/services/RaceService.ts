import axios, { AxiosResponse } from 'axios';

type Race = {
  id: number;
  grandPrix: string | null;
  winner: string | null;
  laps: string | null;
  image: string | null;
};

const RaceService = (() => {
  
  const apiPath = '/races';
  let controller;

  const initialize = (baseApiUrl) => {
    controller = baseApiUrl + apiPath;
  };

  const getAllRaces = async (): Promise<Race[]> => {
    const result: AxiosResponse<Race[]> = await axios.get(controller);
    return result.data;
  };

  const addRace = async (race: Race, image: HTMLInputElement):Promise<Race> => {
    const formData = new FormData();
    
    formData.append('race', race);
    formData.append('image', image);
    
    console.log(race);
    console.log(image);

    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    }

    const result: AxiosResponse<Race> = await axios.post(controller, formData, config);
    return result;
  }

  // const addRace = async (race: Race):Promise<Race> => {
  //   const result: AxiosResponse<Race> = await axios.post(controller, race);
  //   return result;
  // }

  const deleteRace = async (id: number): Promise<void> => {
    const result = await axios.delete(`${controller}/${id}`);
    return result;
  };

  const updateRace = async (race: Race): Promise<Race> => {
    const result: AxiosResponse<Race> = await axios.put(`${controller}/${race.id}`, race);
    return result;
  };


  return {
    initialize,
    getAllRaces,
    addRace,
    deleteRace,
    updateRace
  };
})();

export default RaceService;
