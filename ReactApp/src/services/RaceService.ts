import axios, { AxiosResponse } from 'axios';

type Race = {
  id: number;
  grandPrix: string | null;
  date: string;
  winner: string | null;
  car: string | null;
  laps: string | null;
  time: number;
};

const RaceService = (() => {
  const raceController = "http://localhost:5143/api/Race";

  const getAllRaces = async (): Promise<Race[]> => {
    const result: AxiosResponse<Race[]> = await axios.get(raceController);
    return result.data;
  };

  const addRace = async (raceCircuit: string, numberOfLaps: number):Promise<Race> => {

    const result: AxiosResponse<Race> = await axios.post(raceController, {
      grandPrix: raceCircuit,
      laps: numberOfLaps,
    });
    return result;
    }


    const deleteRace = async (id: number): Promise<void> => {
      await axios.delete(`${raceController}/${id}`);
    };


    const editRace = async (id: number, updatedRace: Race): Promise<Race> => {
      const result: AxiosResponse<Race> = await axios.put(`${raceController}/${id}`, updatedRace);
      
      return result.data;
    };

  return {
    getAllRaces,
    addRace,
    deleteRace,
    editRace
  };
})();

export default RaceService;
