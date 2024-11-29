import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { 
  Button, 
  Container, 
  Typography, 
  Stack,
  CircularProgress 
} from '@mui/material';

const buttonBaseStyles = {
  px: 4,
  py: 1.5,
  borderRadius: 2,
  textTransform: 'none',
  fontSize: '1.1rem',
};

const platformButtons = [
  {
    id: 'new',
    path: '/platform-new',
    label: 'New Platform',
    sx: {
      ...buttonBaseStyles,
      background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
      boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
      '&:hover': {
        background: 'linear-gradient(45deg, #1976D2 30%, #0FBFE3 90%)',
      }
    }
  },
  {
    id: 'old',
    path: '/platform-old',
    label: 'Old Platform',
    sx: {
      ...buttonBaseStyles,
      background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
      '&:hover': {
        background: 'linear-gradient(45deg, #FE5B7B 30%, #FF7E43 90%)',
      }
    }
  }
];

function PlatformChoice({ onError }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [activeButton, setActiveButton] = useState(null);

  const handleNavigation = async (path, buttonId) => {
    try {
      setLoading(true);
      setActiveButton(buttonId);
      await navigate(path);
    } catch (error) {
      onError?.(error);
      console.error('Navigation failed:', error);
    } finally {
      setLoading(false);
      setActiveButton(null);
    }
  };

  return (
    <Container 
      component="main"
      sx={{ 
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center'
      }}
      data-testid="platform-choice-container"
    >
      <Stack spacing={6} alignItems="center">
        <Typography 
          variant="h3" 
          component="h1"
          data-testid="platform-choice-title"
        >
          Choose Your Platform
        </Typography>
        <Stack direction="row" spacing={4}>
          {platformButtons.map(({ id, path, label, sx }) => (
            <Button 
              key={id}
              variant="contained" 
              onClick={() => handleNavigation(path, id)}
              disabled={loading}
              sx={sx}
              data-testid={`platform-choice-${id}-button`}
              aria-label={`Select ${label}`}
            >
              {activeButton === id ? (
                <CircularProgress size={24} color="inherit" />
              ) : label}
            </Button>
          ))}
        </Stack>
      </Stack>
    </Container>
  );
}

PlatformChoice.propTypes = {
  onError: PropTypes.func,
};

export default PlatformChoice;