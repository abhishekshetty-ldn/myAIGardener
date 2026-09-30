// src/App.jsx
import React, { useState, useEffect } from 'react';
import { EnvironmentService } from './modules/environments/services/environmentService';
import { SpeciesService } from './modules/species/services/speciesService';
import { PlantService } from './modules/plants/services/plantService';
import { PlantCard } from './modules/plants/components/PlantCard';

export default function App() {
  const DEFAULT_USER_ID = "test_user_12345";

  const [environments, setEnvironments] = useState([]);
  const [speciesCatalog, setSpeciesCatalog] = useState([]);
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  const handleWaterPlant = async (plantId) => {
    try {
      // 1. Log event to Firestore subcollection via service
      await PlantService.logWatering(plantId, {
        amountMl: 250,
        method: "Manual",
        notes: "Quick water from dashboard card"
      });

      // 2. Refresh dashboard data to show updated status/logs
      alert("Watering logged successfully!");
      loadDashboardData();
    } catch (error) {
      console.error("Error logging watering:", error);
    }
  };

  if (loading) {
    return <div style={{ padding: '20px' }}>Loading your garden...</div>;
  }

  return (
    <div style={{ padding: '24px', fontFamily: 'system-ui, sans-serif', backgroundColor: '#f9fbf9', minHeight: '100vh' }}>
      <header style={{ marginBottom: '24px' }}>
        <h1 style={{ margin: 0, color: '#1b5e20' }}>🌿 My AI Gardener</h1>
        <p style={{ color: '#555' }}>
          Monitoring <strong>{plants.length} plants</strong> across <strong>{environments.length} environment zones</strong>.
        </p>
      </header>

      <main>
        <h2 style={{ color: '#2e7d32', borderBottom: '2px solid #a5d6a7', paddingBottom: '8px' }}>Your Plants</h2>
        
        {plants.length === 0 ? (
          <p>No plants registered yet.</p>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '20px',
            marginTop: '16px'
          }}>
            {plants.map((plant) => (
              <PlantCard 
                key={plant.id} 
                plant={plant} 
                onWater={handleWaterPlant} 
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}