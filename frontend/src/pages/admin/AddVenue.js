import React, { useState } from 'react';
import {
  Typography,
  TextField,
  Button,
  Box,
  Paper,
  Divider,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Chip,
} from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: '12px',
  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
  background: 'linear-gradient(135deg, #ffffff 0%, #f9f9f9 100%)',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: '20px',
  padding: theme.spacing(1, 4),
  textTransform: 'none',
  fontWeight: 'bold',
  backgroundColor: '#1976d2',
  '&:hover': {
    backgroundColor: '#1565c0',
  },
}));

const AddVenue = () => {
  // State for form data and validation errors
  const [formData, setFormData] = useState({
    venueName: '',
    buildingName: '',
    seatingCapacity: '',
    venueType: '',
    facilities: [],
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  // Available facilities options
  const facilityOptions = [
    'Projector',
    'Whiteboard/Blackboard',
    'Computer Systems',
    'Wi-Fi',
    'Smartboard',
    'Air Conditioning',
  ];

  // Handle input changes and live validation
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validateField(name, value);
  };

  // Handle multi-select for facilities
  const handleFacilitiesChange = (e) => {
    const { value } = e.target;
    setFormData({ ...formData, facilities: value });
    validateField('facilities', value);
  };

  // Validation logic
  const validateField = (name, value) => {
    let tempErrors = { ...errors };

    switch (name) {
      case 'venueName':
        if (!value) tempErrors.venueName = 'Venue Name is required';
        else if (value.length < 2) tempErrors.venueName = 'Venue Name must be at least 2 characters';
        else if (value.length > 50) tempErrors.venueName = 'Venue Name must be less than 50 characters';
        else delete tempErrors.venueName;
        break;
      case 'buildingName':
        if (!value) tempErrors.buildingName = 'Building Name is required';
        else if (value.length < 2) tempErrors.buildingName = 'Building Name must be at least 2 characters';
        else if (value.length > 50) tempErrors.buildingName = 'Building Name must be less than 50 characters';
        else delete tempErrors.buildingName;
        break;
      case 'seatingCapacity':
        if (!value) tempErrors.seatingCapacity = 'Seating Capacity is required';
        else if (!/^\d+$/.test(value) || value < 1 || value > 1000) tempErrors.seatingCapacity = 'Seating Capacity must be between 1 and 1000';
        else delete tempErrors.seatingCapacity;
        break;
      case 'venueType':
        if (!value) tempErrors.venueType = 'Venue Type is required';
        else delete tempErrors.venueType;
        break;
      case 'facilities':
        if (value.length === 0) tempErrors.facilities = 'At least one facility must be selected';
        else delete tempErrors.facilities;
        break;
      default:
        break;
    }

    setErrors(tempErrors);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const allFieldsValid = Object.keys(formData).every((key) => {
      validateField(key, formData[key]);
      return formData[key] && !errors[key];
    });

    if (allFieldsValid) {
      console.log('Venue submitted:', formData);
      setSuccess(true);
      setFormData({
        venueName: '',
        buildingName: '',
        seatingCapacity: '',
        venueType: '',
        facilities: [],
      });
      setErrors({});
      setTimeout(() => setSuccess(false), 3000); // Hide success message after 3s
    }
  };

  return (
    <div>
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          color: '#1976d2',
          fontWeight: 'bold',
          mb: 4,
          textAlign: 'center',
          letterSpacing: '1px',
        }}
      >
        Add New Venue
      </Typography>

      <StyledPaper elevation={3}>
        {success && (
          <Alert severity="success" sx={{ mb: 2, borderRadius: '8px' }}>
            Venue added successfully!
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 900, mx: 'auto' }}>
          <Grid container spacing={3}>
            {/* Left Side: Venue Basics */}
            <Grid item xs={12} md={6}>
              <Typography variant="h6" sx={{ mb: 2, color: '#1976d2', fontWeight: 'bold' }}>
                Venue Basics
              </Typography>

              <TextField
                label="Venue Name"
                name="venueName"
                value={formData.venueName}
                onChange={handleChange}
                fullWidth
                margin="normal"
                variant="outlined"
                error={!!errors.venueName}
                helperText={errors.venueName || `${formData.venueName.length}/50`}
                inputProps={{ maxLength: 50 }}
                sx={{ backgroundColor: '#fff', borderRadius: '8px', '&:hover fieldset': { borderColor: '#1976d2' } }}
              />

              <TextField
                label="Building Name/Block"
                name="buildingName"
                value={formData.buildingName}
                onChange={handleChange}
                fullWidth
                margin="normal"
                variant="outlined"
                error={!!errors.buildingName}
                helperText={errors.buildingName || `${formData.buildingName.length}/50`}
                inputProps={{ maxLength: 50 }}
                sx={{ backgroundColor: '#fff', borderRadius: '8px', '&:hover fieldset': { borderColor: '#1976d2' } }}
              />

              <TextField
                label="Seating Capacity"
                name="seatingCapacity"
                value={formData.seatingCapacity}
                onChange={handleChange}
                fullWidth
                margin="normal"
                variant="outlined"
                type="number"
                error={!!errors.seatingCapacity}
                helperText={errors.seatingCapacity}
                sx={{ backgroundColor: '#fff', borderRadius: '8px', '&:hover fieldset': { borderColor: '#1976d2' } }}
              />
            </Grid>

            {/* Right Side: Venue Specifications */}
            <Grid item xs={12} md={6}>
              <Typography variant="h6" sx={{ mb: 2, color: '#1976d2', fontWeight: 'bold' }}>
                Venue Specifications
              </Typography>

              <FormControl fullWidth margin="normal" error={!!errors.venueType}>
                <InputLabel>Type of Venue</InputLabel>
                <Select
                  name="venueType"
                  value={formData.venueType}
                  onChange={handleChange}
                  label="Type of Venue"
                  sx={{ backgroundColor: '#fff', borderRadius: '8px' }}
                >
                  <MenuItem value="">Select Venue Type</MenuItem>
                  <MenuItem value="lectureHall">Lecture Hall</MenuItem>
                  <MenuItem value="conferenceRoom">Conference Room</MenuItem>
                  <MenuItem value="laboratory">Laboratory</MenuItem>
                  <MenuItem value="auditorium">Auditorium</MenuItem>
                  <MenuItem value="studyArea">Study Area</MenuItem>
                  <MenuItem value="library">Library</MenuItem>
                </Select>
                {errors.venueType && (
                  <Typography color="error" variant="caption">
                    {errors.venueType}
                  </Typography>
                )}
              </FormControl>

              <FormControl fullWidth margin="normal" error={!!errors.facilities}>
                <InputLabel>Facilities Available</InputLabel>
                <Select
                  name="facilities"
                  multiple
                  value={formData.facilities}
                  onChange={handleFacilitiesChange}
                  label="Facilities Available"
                  renderValue={(selected) => (
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} size="small" />
                      ))}
                    </Box>
                  )}
                  sx={{ backgroundColor: '#fff', borderRadius: '8px' }}
                >
                  {facilityOptions.map((facility) => (
                    <MenuItem key={facility} value={facility}>
                      {facility}
                    </MenuItem>
                  ))}
                </Select>
                {errors.facilities && (
                  <Typography color="error" variant="caption">
                    {errors.facilities}
                  </Typography>
                )}
              </FormControl>
            </Grid>
          </Grid>

          <Divider sx={{ my: 3, borderColor: '#e0e0e0' }} />

          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <StyledButton
              type="submit"
              variant="contained"
              disabled={Object.keys(errors).length > 0 || Object.values(formData).some((val) => !val || (Array.isArray(val) && val.length === 0))}
            >
              Add Venue
            </StyledButton>
          </Box>
        </Box>
      </StyledPaper>
    </div>
  );
};

export default AddVenue;