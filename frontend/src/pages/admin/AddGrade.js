import React, { useState } from 'react';
import {
  Typography,
  TextField,
  Button,
  Box,
  Paper,
  Divider,
  Alert,
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

const AddGrade = () => {
  // State for form data and validation errors
  const [formData, setFormData] = useState({
    gradeName: '',
    description: '',
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
      case 'gradeName':
        if (!value) tempErrors.gradeName = 'Grade Name is required';
        else if (value.length < 2) tempErrors.gradeName = 'Grade Name must be at least 2 characters';
        else if (value.length > 50) tempErrors.gradeName = 'Grade Name must be less than 50 characters';
        else delete tempErrors.gradeName;
        break;
      case 'description':
        if (!value) tempErrors.description = 'Description is required';
        else if (value.length < 10) tempErrors.description = 'Description must be at least 10 characters';
        else if (value.length > 500) tempErrors.description = 'Description must be less than 500 characters';
        else delete tempErrors.description;
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
      console.log('Form submitted:', formData);
      setSuccess(true);
      setFormData({ gradeName: '', description: '' });
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
        Add New Grade
      </Typography>

      <StyledPaper elevation={3}>
        {success && (
          <Alert severity="success" sx={{ mb: 2, borderRadius: '8px' }}>
            Grade added successfully!
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 600, mx: 'auto' }}>
          <TextField
            label="Grade Name"
            name="gradeName"
            value={formData.gradeName}
            onChange={handleChange}
            fullWidth
            margin="normal"
            variant="outlined"
            error={!!errors.gradeName}
            helperText={errors.gradeName || `${formData.gradeName.length}/50`}
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
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            fullWidth
            margin="normal"
            multiline
            rows={4}
            variant="outlined"
            error={!!errors.description}
            helperText={errors.description || `${formData.description.length}/500`}
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

          <Divider sx={{ my: 3, borderColor: '#e0e0e0' }} />

          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <StyledButton
              type="submit"
              variant="contained"
              disabled={Object.keys(errors).length > 0 || !formData.gradeName || !formData.description}
            >
              Add Grade
            </StyledButton>
          </Box>
        </Box>
      </StyledPaper>
    </div>
  );
};

export default AddGrade;