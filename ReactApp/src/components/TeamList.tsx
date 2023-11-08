import React, { useState, useEffect } from 'react';
import TeamService from '../services/TeamService';

// Define an interface for the team object
interface Team {
  id: string;
  name: string;
  // You can add other properties that a team might have
}

const TeamList: React.FC = () => {
  const [teams, setTeams] = useState<Team[]>([]);

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

  const getTeamsJSX = () => {
    const teamsJSX = teams.map((team) => (
      <li key={team.id}>{team.name}</li>
    ));
    return teamsJSX; 
  };

  return (
    <section>
      <h3>F1 Teams</h3>
      <p>Number of Formula 1 Teams: {teams.length}</p>
      <ul>{getTeamsJSX()}</ul>
    </section>
  );
};

export default TeamList;
