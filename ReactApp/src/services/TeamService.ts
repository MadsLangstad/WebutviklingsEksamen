import axios, { AxiosResponse } from 'axios';

type Team = {
  id: number;
  fullTeamName: string | null;
  base: string | null;
  worldChampionships: string | null;
  image: string | null;
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
      
  const addTeam = async (team: Team, image: HTMLInputElement): Promise<Team> => {
    const formData = new FormData();
    
    formData.append('team', JSON.stringify(team));
    formData.append('image', image);

    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }
    
    const result: AxiosResponse<Team> = await axios.post(controller, formData, config);
    return result;
  };

  const deleteTeam = async (id: number): Promise<void> => {
    const result = await axios.delete(`${controller}/${id}`);
    return result;
  };

  const updateTeam = async (team: Team, image: HTMLInputElement): Promise<Team> =>
  {
    const formData = new FormData();

    formData.append('team', JSON.stringify(team));

    if (image !== null) {
      formData.append('image', image);
    }
    
    const config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }

    console.log("Team: ", team);
    console.log("Image: ", image);

    const result: AxiosResponse<Team> = await axios.put(`${controller}/${team.id}`, formData, config);
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
