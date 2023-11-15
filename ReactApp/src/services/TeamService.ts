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
  const teamController = "http://localhost:5143/api/team";

  const getAllTeams = async (): Promise<Team[]> => {
    const result: AxiosResponse<Team[]> = await axios.get(teamController);
    return result.data;
  };
      
  const addTeam = async (teamName: string, teamChief: string): Promise<Team> => {
      
      const result: AxiosResponse<Team> = await axios.post(teamController, {
        fullTeamName: teamName,
        teamChief: teamChief,
      });
      return result;
  };


  const deleteTeam = async (id: number): Promise<void> => {
    await axios.delete(`${teamController}/${id}`);
  };


  const updateTeam = async (id: number, updatedTeam: Team): Promise<Team> => {
    const result: AxiosResponse<Team> = await axios.put(`${teamController}/${id}`, updatedTeam);
    console.log(updatedTeam);
    console.log(result.data);
    return result.data;
  };

  return {
    getAllTeams,
    addTeam,
    deleteTeam,
    updateTeam
  };
})();

export default TeamService;
