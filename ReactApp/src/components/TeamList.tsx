import React, { useState, useEffect } from 'react';
import TeamService from '../services/TeamService';
import TeamItem from './TeamItem';

const TeamList: React.FC = () => {
  const [teams, setTeams] = useState<TeamItem[]>([]);

  useEffect(() => {
    getTeamsFromService();
  }, []);

  const getTeamsFromService = async () => {
    try {
      const teamsFromService = await TeamService.getAllTeams();
      setTeams(teamsFromService);
    } catch (error) {
      console.error(`Error: ${error}`);
    }
  };

  return (
    <>
      {teams.map(team => (
        <TeamItem
          key={team.id}
          team={team}
        />
      ))}
    </>
  );
};
export default TeamList;
