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

const AddBatch = () => {
  // Simulated grades list (this would come from backend in a real app)
  const [availableGrades, setAvailableGrades] = useState([
    { name: 'Grade 1', description: 'First year grade' },
    { name: 'Grade 2', description: 'Second year grade' },
  ]);

  // State for form data and validation errors
  const [formData, setFormData] = useState({
    batchName: '',
    batchDescription: '',
    grade: '',
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  // Handle input changes and live validation
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validateField(name, value);
  };

  // Validation logic
  const validateField = (name, value) => {
    let tempErrors = { ...errors };

    switch (name) {
      case 'batchName':
        if (!value) tempErrors.batchName = 'Batch Name is required';
        else if (value.length < 2) tempErrors.batchName = 'Batch Name must be at least 2 characters';
        else if (value.length > 50) tempErrors.batchName = 'Batch Name must be less than 50 characters';
        else delete tempErrors.batchName;
        break;
      case 'batchDescription':
        if (!value) tempErrors.batchDescription = 'Description is required';
        else if (value.length < 10) tempErrors.batchDescription = 'Description must be at least 10 characters';
        else if (value.length > 500) tempErrors.batchDescription = 'Description must be less than 500 characters';
        else delete tempErrors.batchDescription;
        break;
      case 'grade':
        if (!value) tempErrors.grade = 'Grade is required';
        else delete tempErrors.grade;
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
      console.log('Batch submitted:', formData);
      setSuccess(true);
      setFormData({ batchName: '', batchDescription: '', grade: '' });
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
        Add New Batch
      </Typography>

      <StyledPaper elevation={3}>
        {success && (
          <Alert severity="success" sx={{ mb: 2, borderRadius: '8px' }}>
            Batch added successfully!
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 600, mx: 'auto' }}>
          <TextField
            label="Batch Name"
            name="batchName"
            value={formData.batchName}
            onChange={handleChange}
            fullWidth
            margin="normal"
            variant="outlined"
            error={!!errors.batchName}
            helperText={errors.batchName || `${formData.batchName.length}/50`}
            inputProps={{ maxLength: 50 }}
            sx={{
              backgroundColor: '#fff',
              borderRadius: '8px',
              '& .MuiOutlinedInput-root': {
                '&:hover fieldset': {
                  borderColor: '#1976d2',
                },
              },
            }}
          />

          <TextField
            label="Batch Description"
            name="batchDescription"
            value={formData.batchDescription}
            onChange={handleChange}
            fullWidth
            margin="normal"
            multiline
            rows={4}
            variant="outlined"
            error={!!errors.batchDescription}
            helperText={errors.batchDescription || `${formData.batchDescription.length}/500`}
            inputProps={{ maxLength: 500 }}
            sx={{
              backgroundColor: '#fff',
              borderRadius: '8px',
              '& .MuiOutlinedInput-root': {
                '&:hover fieldset': {
                  borderColor: '#1976d2',
                },
              },
            }}
          />

          <FormControl fullWidth margin="normal" error={!!errors.grade}>
            <InputLabel>Grade</InputLabel>
            <Select
              name="grade"
              value={formData.grade}
              onChange={handleChange}
              label="Grade"
              sx={{ backgroundColor: '#fff', borderRadius: '8px' }}
            >
              <MenuItem value="">Select Grade</MenuItem>
              {availableGrades.map((grade) => (
                <MenuItem key={grade.name} value={grade.name}>
                  {grade.name}
                </MenuItem>
              ))}
            </Select>
            {errors.grade && (
              <Typography color="error" variant="caption">
                {errors.grade}
              </Typography>
            )}
          </FormControl>

          <Divider sx={{ my: 3, borderColor: '#e0e0e0' }} />

          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <StyledButton
              type="submit"
              variant="contained"
              disabled={Object.keys(errors).length > 0 || !formData.batchName || !formData.batchDescription || !formData.grade}
            >
              Add Batch
            </StyledButton>
          </Box>
        </Box>
      </StyledPaper>
    </div>
  );
};

export default AddBatch;