import axios, { AxiosResponse } from 'axios';

type Team = {
  id: number;
  fullTeamName: string | null;
  base: string | null;
  worldChampionships: string | null;
}

const TeamService = (() => {

  const apiPath = '/teams';
  let controller;

  const initialize = (baseApiUrl) => {
    controller = baseApiUrl + apiPath;
  };

  const getAllTeams = async (): Promise<Team[]> => {
    const result: AxiosResponse<Team[]> = await axios.get(controller);
    return result.data;
  };
      
  const addTeam = async (team: Team): Promise<Team> => {
      const result: AxiosResponse<Team> = await axios.post(controller, team);
      return result;
  };

  const deleteTeam = async (id: number): Promise<void> => {
    const result = await axios.delete(`${controller}/${id}`);
    return result;
  };

  const updateTeam = async (team: Team): Promise<Team> => {
    const result: AxiosResponse<Team> = await axios.put(`${controller}/${team.id}`, team);
    return result;
  };

  return {
    initialize,
    getAllTeams,
    addTeam,
    deleteTeam,
    updateTeam
  };
})();

export default TeamService;
