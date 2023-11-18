import axios, { AxiosResponse } from 'axios';

type Team = {
  id: number;
  fullTeamName: string | null;
  base: string | null;
  worldChampionships: string | null;
}

const TeamService = (() => {
  const teamController = "http://localhost:5143/api/team";

  const getAllTeams = async (): Promise<Team[]> => {
    const result: AxiosResponse<Team[]> = await axios.get(teamController);
    return result.data;
  };
      
  const addTeam = async (team: Team): Promise<Team> => {
      const result: AxiosResponse<Team> = await axios.post(teamController, team);
      return result;
  };

  const deleteTeam = async (id: number): Promise<void> => {
    const result = await axios.delete(`${teamController}/${id}`);
    return result;
  };

  const updateTeam = async (team: Team): Promise<Team> => {
    const result: AxiosResponse<Team> = await axios.put(`${teamController}/${team.id}`, team);
    return result;
  };

  return {
    getAllTeams,
    addTeam,
    deleteTeam,
    updateTeam
  };
})();

export default TeamService;
