// src/services/TeamService.ts

import axios, { AxiosResponse } from 'axios';

export interface Team {
  id: number;
  fullTeamName: string | null;
  base: string | null;
  worldChampionships: number | null;
  image: string | null;
}

const TeamService = (() => {
  const apiPath = '/teams';
  let controller: string = '';

  const initialize = (baseApiUrl: string) => {
    controller = baseApiUrl + apiPath;
  };

  const getAllTeams = async (): Promise<Team[]> => {
    const result: AxiosResponse<Team[]> = await axios.get(controller);
    return result.data;
  };

  const addTeam = async (team: Team, image: File | null): Promise<Team> => {
    const formData = new FormData();
    formData.append('team', JSON.stringify(team));
    if (image) {
      formData.append('image', image);
    }

    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };

    const result: AxiosResponse<Team> = await axios.post(controller, formData, config);
    return result.data;
  };

  const deleteTeam = async (id: number): Promise<boolean> => {
    await axios.delete(`${controller}/${id}`);
    return true;
  };

  const updateTeam = async (team: Team, image: File | null): Promise<boolean> => {
    const formData = new FormData();
    formData.append('team', JSON.stringify(team));
    if (image) {
      formData.append('image', image);
    }

    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };

    await axios.put(`${controller}/${team.id}`, formData, config);
    return true;
  };

  return {
    initialize,
    getAllTeams,
    addTeam,
    deleteTeam,
    updateTeam,
  };
})();

export default TeamService;
