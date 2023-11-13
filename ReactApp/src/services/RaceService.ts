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
    console.log(result);
    return result.data;
  };


  const addRace = async (raceCircuit: string, numberOfLaps: number):Promise<Race> => {
    axios.post(raceController, {
      grandPrix: raceCircuit,
      laps: numberOfLaps,
    })
    .then(function (response) { 
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  return {
    getAllRaces,
    addRace
  };
})();

export default RaceService;
