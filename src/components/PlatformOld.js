import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Container, Box } from '@mui/material';
import CourseList from './CourseList';
import Content from './ModuleContent';

function PlatformOld() {
  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Routes>
          <Route path="/" element={<CourseList />} />
          <Route path="/content/:moduleId" element={<Content />} />
        </Routes>
      </Box>
    </Container>
  );
}

export default PlatformOld; 