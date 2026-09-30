import React, { useState, useEffect } from 'react';
import { EnvironmentService } from './modules/environments/services/environmentService';
import { SpeciesService } from './modules/species/services/speciesService';
import { PlantService } from './modules/plants/services/plantService';

export default function App() {
  const DEFAULT_USER_ID = "test_user_12345";

  const [environments, setEnvironments] = useState([]);
  const [speciesCatalog, setSpeciesCatalog] = useState([]);
  const [plants, setPlants] = useState([]);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const [envList, speciesList, plantList] = await Promise.all([
        EnvironmentService.getEnvironmentsByUser(DEFAULT_USER_ID),
        SpeciesService.getSpeciesCatalog(),
        PlantService.getPlantsByUser(DEFAULT_USER_ID)
      ]);

      setEnvironments(envList);
      setSpeciesCatalog(speciesList);
      setPlants(plantList);
    } catch (error) {
      console.error("Failed to load dashboard data:", error);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>🌿 Garden Dashboard</h1>
      <p>Tracking {plants.length} plants across {environments.length} environments.</p>
    </div>
  );
}