// src/modules/plants/components/PlantCard.jsx
import React from 'react';

export function PlantCard({ plant, onWater }) {
  const { name, species, location, lastWatered, waterFrequencyDays, healthStatus } = plant;

  // Simple status badge color
  const statusColors = {
    Healthy: '#2e7d32',
    'Needs Water': '#ed6c02',
    Attention: '#d32f2f'
  };

  return (
    <div style={{
      border: '1px solid #e0e0e0',
      borderRadius: '12px',
      padding: '16px',
      boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
      backgroundColor: '#ffffff',
      display: 'flex',
      flexDirection: 'column',
      justify: 'space-between',
      gap: '12px'
    }}>
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ margin: 0, fontSize: '1.2rem', color: '#1b5e20' }}>{name}</h3>
          <span style={{
            fontSize: '0.75rem',
            fontWeight: 'bold',
            padding: '4px 8px',
            borderRadius: '12px',
            color: '#fff',
            backgroundColor: statusColors[healthStatus] || '#757575'
          }}>
            {healthStatus || 'Healthy'}
          </span>
        </div>
        <p style={{ margin: '4px 0', fontStyle: 'italic', color: '#666', fontSize: '0.9rem' }}>
          {species || 'Unknown Species'}
        </p>
      </div>

      <div style={{ fontSize: '0.85rem', color: '#444', lineHeight: '1.5' }}>
        <div><strong>Zone/Env:</strong> {location || 'Unassigned'}</div>
        <div><strong>Watering Schedule:</strong> Every {waterFrequencyDays || 7} days</div>
        <div><strong>Last Watered:</strong> {lastWatered ? new Date(lastWatered).toLocaleDateString() : 'N/A'}</div>
      </div>

      <button
        onClick={() => onWater(plant.id)}
        style={{
          backgroundColor: '#0288d1',
          color: '#ffffff',
          border: 'none',
          borderRadius: '6px',
          padding: '8px 12px',
          cursor: 'pointer',
          fontWeight: 'bold',
          transition: 'background-color 0.2s'
        }}
      >
        💧 Log Watering
      </button>
    </div>
  );
}