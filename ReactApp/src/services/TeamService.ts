import axios, { AxiosResponse } from 'axios';

// Define a type for the team object based on the structure you expect from the API
type Team = {
  id: string; // Assuming there's an 'id' field
  name: string; // Assuming there's a 'name' field for the team name
  // ... add other fields as expected from your API
};

const TeamService = (() => {
  const teamController = "http://localhost:5143/api/Team";

  // The getAllTeams method now explicitly states that it returns a Promise of Team[]
  const getAllTeams = async (): Promise<Team[]> => {
    // We can also specify the type of the Axios response to be AxiosResponse<Team[]>
    const result: AxiosResponse<Team[]> = await axios.get(teamController);
    console.log(result);
    return result.data;
  };

  return {
    getAllTeams,
  };
})();

export default TeamService;
