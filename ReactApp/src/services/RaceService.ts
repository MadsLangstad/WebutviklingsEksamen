import axios, { AxiosResponse } from 'axios';

// Define a type for the race object based on the structure you expect from the API
type Race = {
  id: string; // Assuming there's an 'id' field
  name: string; // Assuming there's a 'name' field for the race name
  // ... add other fields as expected from your API
};

const RaceService = (() => {
  const raceController = "http://localhost:5143/api/Race";

  // The getAllRaces method now explicitly states that it returns a Promise of Race[]
  const getAllRaces = async (): Promise<Race[]> => {
    // We can also specify the type of the Axios response to be AxiosResponse<Race[]>
    const result: AxiosResponse<Race[]> = await axios.get(raceController);
    console.log(result);
    return result.data;
  };

  return {
    getAllRaces,
  };
})();

export default RaceService;
