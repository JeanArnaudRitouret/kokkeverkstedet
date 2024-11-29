import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Container, Box } from '@mui/material';

function PlatformNew() {
  const [paths, setPaths] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPaths = async () => {
      try {
        const response = await fetch('/api/paths'); // Adjust the API endpoint as needed
        if (!response.ok) {
          throw new Error('Failed to fetch paths');
        }
        const data = await response.json();
        setPaths(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPaths();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Routes>
          <Route path="/" element={
            <div className="platform-container">
              {paths.map(path => (
                <div key={path.id} className="path-card">
                  <h2>{path.title}</h2>
                  <div className="trainings-container">
                    {path.trainings.map(training => (
                      <div key={training.id} className="training-card">
                        <h3>{training.title}</h3>
                        <div className="steps-container">
                          {training.steps.map(step => (
                            <div key={step.id} className="step-item">
                              <p>{step.title}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          } />
        </Routes>
      </Box>
    </Container>
  );
}

export default PlatformNew; 