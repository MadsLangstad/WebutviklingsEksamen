import axios, { AxiosResponse } from 'axios';

type Race = {
  id: number;
  grandPrix: string | null;
  winner: string | null;
  laps: string | null;
};

const RaceService = (() => {
  const raceController = "http://localhost:5143/api/Race";

  const getAllRaces = async (): Promise<Race[]> => {
    const result: AxiosResponse<Race[]> = await axios.get(raceController);
    return result.data;
  };

  const addRace = async (race: Race):Promise<Race> => {
    const result: AxiosResponse<Race> = await axios.post(raceController, race);
    return result;
  }

  const deleteRace = async (id: number): Promise<void> => {
    const result = await axios.delete(`${raceController}/${id}`);
    return result;
  };

  const updateRace = async (race: Race): Promise<Race> => {
    const result: AxiosResponse<Race> = await axios.put(`${raceController}/${race.id}`, race);
    return result;
  };


  return {
    getAllRaces,
    addRace,
    deleteRace,
    updateRace
  };
})();

export default RaceService;
