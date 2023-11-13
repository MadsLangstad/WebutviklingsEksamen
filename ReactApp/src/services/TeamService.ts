import axios, { AxiosResponse } from 'axios';

type Team = {
  id: number;
  fullTeamName: string | null;
  base: string | null;
  teamChief: string | null;
  chassis: string | null;
  powerUnit: string | null;
  firstTeamEntry: string | null;
  worldChampionships: string | null;
  higestRaceFinish: string | null;
  polePosition: number;
  fastestLaps: string | null;
}

const TeamService = (() => {
  const teamController = "http://localhost:5143/api/Team";

  const getAllTeams = async (): Promise<Team[]> => {
    const result: AxiosResponse<Team[]> = await axios.get(teamController);
    console.log(result);
    return result.data;
  };

  const addTeam = async (teamName: string, teamChief: string): Promise<Team> => {

    axios.post(teamController, {
      FullTeamName: teamName,
      TeamChief: teamChief,
    })
    .then(function (response) { 
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  };

  return {
    getAllTeams,
    addTeam
  };
})();

export default TeamService;
