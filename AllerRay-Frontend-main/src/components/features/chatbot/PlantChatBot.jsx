import React, { useState } from 'react';
import { Box, Fab, Paper, Typography, IconButton, Button, styled, CircularProgress, Snackbar } from '@mui/material';
import { SmartToy as RobotIcon, Close as CloseIcon, CloudUpload as UploadIcon } from '@mui/icons-material';
import axios from 'axios';

const ChatWindow = styled(Paper)(({ theme }) => ({
  position: 'fixed',
  bottom: theme.spacing(2),
  right: theme.spacing(2),
  width: 300,
  height: 400,
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden'
}));

const ChatHeader = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  padding: theme.spacing(2),
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
}));

const ChatContent = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(2),
  overflowY: 'auto'
}));

const ChatFooter = styled(Box)(({ theme }) => ({
  borderTop: `1px solid ${theme.palette.divider}`,
  padding: theme.spacing(2)
}));

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const PlantChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [image, setImage] = useState(null);
  const [plantInfo, setPlantInfo] = useState(null);
  const [pollenLevel, setPollenLevel] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];

    // Check file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (!allowedTypes.includes(file.type)) {
      setError('Please upload only JPG, JPEG, or PNG images.');
      return;
    }

    // Check file size (50MB = 50 * 1024 * 1024 bytes)
    if (file.size > 50 * 1024 * 1024) {
      setError('File size should not exceed 50MB.');
      return;
    }

    setImage(file);
    setPlantInfo(null);
    setIsLoading(true);
    setError('');

    const formData = new FormData();
    formData.append('image', file);

    try {
      const response = await axios.post('/api/identify-plant', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      if (response.data.results && response.data.results.length > 0) {
        const topResult = response.data.results[0];
        const commonNames = topResult.species.commonNames || ['No common name available'];
        const scientificName = topResult.species.scientificNameWithoutAuthor;
        const score = (topResult.score * 100).toFixed(2);
        const pollenLevel = response.data.pollen_level || 'Information not available';

        setPlantInfo({
          commonNames,
          scientificName,
          score,
          pollenLevel
        });
      } else {
        setError("Sorry, I couldn't identify this plant.");
      }
    } catch (error) {
      console.error('Error identifying plant:', error);
      if (error.response) {
        setError(`Server error: ${error.response.data.message || 'An unexpected error occurred.'}`);
      } else if (error.request) {
        setError('No response from server. Please check your internet connection and try again.');
      } else {
        setError('An error occurred while processing your request. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box>
    {!isOpen && (
      <Box position="fixed" bottom={16} right={16}>
        <Fab color="primary" onClick={() => setIsOpen(true)}>
          <RobotIcon />
        </Fab>
        <Paper 
          elevation={3}
          sx={{
            position: 'absolute',
            bottom: '100%',
            right: 0,
            mb: 2,
            p: 1,
            width: 200,
            textAlign: 'center',
            '&::after': {
              content: '""',
              position: 'absolute',
              bottom: -10,
              right: 20,
              border: '10px solid transparent',
              borderTopColor: 'background.paper'
            }
          }}
        >
          <Typography variant="body2">
            Discover plants and their pollen levels!
          </Typography>
        </Paper>
      </Box>
    )}
    {isOpen && (
      <ChatWindow elevation={3}>
        <ChatHeader>
          <Typography variant="h6">Plant & Pollen Identifier</Typography>
          <IconButton color="inherit" onClick={() => setIsOpen(false)}>
            <CloseIcon />
          </IconButton>
        </ChatHeader>
        <ChatContent>
          <Typography variant="body1" gutterBottom>
            Curious about a plant or its pollen level?<br />
            <br />
            Snap a photo of any plant (JPG, JPEG, or PNG, max 50MB),<br />
            and I'll identify it and provide pollen information!
          </Typography>
          {image && (
            <Box
              component="img"
              src={URL.createObjectURL(image)}
              alt="Uploaded plant"
              sx={{ width: '100%', height: 150, objectFit: 'cover', borderRadius: 1, mb: 2 }}
            />
          )}
          {isLoading ? (
            <Box display="flex" justifyContent="center">
            <CircularProgress />
          </Box>
        ) : plantInfo && (
          <Box mt={1}>
            <Typography variant="h6" color="primary" fontWeight="bold" gutterBottom>Here is the result!</Typography>
            <Typography variant="body1"  mt={1}>
              <strong>Common name(s):</strong> {plantInfo.commonNames.join(', ')}
            </Typography>
            <Typography variant="body1"  mt={1}>
              <strong>Scientific name:</strong> {plantInfo.scientificName}
            </Typography>
            <Typography variant="body1"  mt={1}>
              <strong>Pollen level:</strong> {plantInfo.pollenLevel}
            </Typography>
          </Box>
          )}
        </ChatContent>
        <ChatFooter>
          <Button
            component="label"
            variant="contained"
            startIcon={<UploadIcon />}
            fullWidth
            disabled={isLoading}
          >
            Upload Image
            <VisuallyHiddenInput type="file" accept="image/jpeg,image/jpg,image/png" onChange={handleImageUpload} />
          </Button>
        </ChatFooter>
      </ChatWindow>
    )}
    <Snackbar
      open={!!error}
      autoHideDuration={6000}
      onClose={() => setError('')}
      message={error}
    />
  </Box>
  );
};

export default PlantChatbot;