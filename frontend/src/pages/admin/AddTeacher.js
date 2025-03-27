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

const AddTeacher = () => {
  // State for form data and validation errors
  const [formData, setFormData] = useState({
    fullName: '',
    nicOrPassport: '',
    dateOfBirth: '',
    age: '',
    gender: '',
    address: '',
    phoneNumber: '',
    email: '',
    tempPassword: '',
    qualification: '',
    experience: '',
    department: '',
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  // Calculate age from date of birth
  const calculateAge = (dob) => {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  // Handle input changes and live validation
  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedFormData = { ...formData, [name]: value };

    // Automatically calculate age when date of birth changes
    if (name === 'dateOfBirth' && value) {
      const age = calculateAge(value);
      updatedFormData.age = age.toString();
      validateField('age', age.toString());
    }

    setFormData(updatedFormData);
    validateField(name, value);
  };

  // Validation logic
  const validateField = (name, value) => {
    let tempErrors = { ...errors };

    switch (name) {
      case 'fullName':
        if (!value) tempErrors.fullName = 'Full Name is required';
        else if (value.length < 2) tempErrors.fullName = 'Full Name must be at least 2 characters';
        else if (value.length > 100) tempErrors.fullName = 'Full Name must be less than 100 characters';
        else delete tempErrors.fullName;
        break;
      case 'nicOrPassport':
        if (!value) tempErrors.nicOrPassport = 'NIC or Passport Number is required';
        else if (value.length < 5) tempErrors.nicOrPassport = 'NIC/Passport must be at least 5 characters';
        else if (value.length > 20) tempErrors.nicOrPassport = 'NIC/Passport must be less than 20 characters';
        else delete tempErrors.nicOrPassport;
        break;
      case 'dateOfBirth':
        if (!value) tempErrors.dateOfBirth = 'Date of Birth is required';
        else {
          const today = new Date();
          const birthDate = new Date(value);
          if (birthDate > today) tempErrors.dateOfBirth = 'Date of Birth cannot be in the future';
          else delete tempErrors.dateOfBirth;
        }
        break;
      case 'age':
        if (!value) tempErrors.age = 'Age is required';
        else if (!/^\d+$/.test(value) || value < 18 || value > 100) tempErrors.age = 'Age must be between 18 and 100';
        else delete tempErrors.age;
        break;
      case 'gender':
        if (!value) tempErrors.gender = 'Gender is required';
        else delete tempErrors.gender;
        break;
      case 'address':
        if (!value) tempErrors.address = 'Address is required';
        else if (value.length < 5) tempErrors.address = 'Address must be at least 5 characters';
        else if (value.length > 200) tempErrors.address = 'Address must be less than 200 characters';
        else delete tempErrors.address;
        break;
      case 'phoneNumber':
        if (!value) tempErrors.phoneNumber = 'Phone Number is required';
        else if (!/^\d{10}$/.test(value)) tempErrors.phoneNumber = 'Phone Number must be 10 digits';
        else delete tempErrors.phoneNumber;
        break;
      case 'email':
        if (!value) tempErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(value)) tempErrors.email = 'Email is invalid';
        else delete tempErrors.email;
        break;
      case 'tempPassword':
        if (!value) tempErrors.tempPassword = 'Temporary Password is required';
        else if (value.length < 6) tempErrors.tempPassword = 'Password must be at least 6 characters';
        else if (value.length > 50) tempErrors.tempPassword = 'Password must be less than 50 characters';
        else delete tempErrors.tempPassword;
        break;
      case 'qualification':
        if (!value) tempErrors.qualification = 'Qualification is required';
        else if (value.length < 2) tempErrors.qualification = 'Qualification must be at least 2 characters';
        else if (value.length > 100) tempErrors.qualification = 'Qualification must be less than 100 characters';
        else delete tempErrors.qualification;
        break;
      case 'experience':
        if (!value) tempErrors.experience = 'Experience is required';
        else if (!/^\d+$/.test(value) || value < 0 || value > 50) tempErrors.experience = 'Experience must be between 0 and 50 years';
        else delete tempErrors.experience;
        break;
      case 'department':
        if (!value) tempErrors.department = 'Department is required';
        else delete tempErrors.department;
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
      console.log('Teacher submitted:', formData);
      setSuccess(true);
      setFormData({
        fullName: '',
        nicOrPassport: '',
        dateOfBirth: '',
        age: '',
        gender: '',
        address: '',
        phoneNumber: '',
        email: '',
        tempPassword: '',
        qualification: '',
        experience: '',
        department: '',
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
        Add New Teacher
      </Typography>

      <StyledPaper elevation={3}>
        {success && (
          <Alert severity="success" sx={{ mb: 2, borderRadius: '8px' }}>
            Teacher added successfully!
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 900, mx: 'auto' }}>
          <Grid container spacing={3}>
            {/* Left Side: Personal Details */}
            <Grid item xs={12} md={6}>
              <Typography variant="h6" sx={{ mb: 2, color: '#1976d2', fontWeight: 'bold' }}>
                Personal Details
              </Typography>

              <TextField
                label="Full Name"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                fullWidth
                margin="normal"
                variant="outlined"
                error={!!errors.fullName}
                helperText={errors.fullName || `${formData.fullName.length}/100`}
                inputProps={{ maxLength: 100 }}
                sx={{ backgroundColor: '#fff', borderRadius: '8px', '&:hover fieldset': { borderColor: '#1976d2' } }}
              />

              <TextField
                label="NIC or Passport Number"
                name="nicOrPassport"
                value={formData.nicOrPassport}
                onChange={handleChange}
                fullWidth
                margin="normal"
                variant="outlined"
                error={!!errors.nicOrPassport}
                helperText={errors.nicOrPassport || `${formData.nicOrPassport.length}/20`}
                inputProps={{ maxLength: 20 }}
                sx={{ backgroundColor: '#fff', borderRadius: '8px', '&:hover fieldset': { borderColor: '#1976d2' } }}
              />

              <TextField
                label="Date of Birth"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                fullWidth
                margin="normal"
                variant="outlined"
                type="date"
                InputLabelProps={{ shrink: true }}
                error={!!errors.dateOfBirth}
                helperText={errors.dateOfBirth}
                sx={{ backgroundColor: '#fff', borderRadius: '8px', '&:hover fieldset': { borderColor: '#1976d2' } }}
              />

              <TextField
                label="Age"
                name="age"
                value={formData.age}
                onChange={handleChange}
                fullWidth
                margin="normal"
                variant="outlined"
                type="number"
                error={!!errors.age}
                helperText={errors.age}
                InputProps={{ readOnly: true }}
                sx={{ backgroundColor: '#f5f5f5', borderRadius: '8px' }}
              />

              <FormControl fullWidth margin="normal" error={!!errors.gender}>
                <InputLabel>Gender</InputLabel>
                <Select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  label="Gender"
                  sx={{ backgroundColor: '#fff', borderRadius: '8px' }}
                >
                  <MenuItem value="">Select Gender</MenuItem>
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                  <MenuItem value="other">Other</MenuItem>
                </Select>
                {errors.gender && (
                  <Typography color="error" variant="caption">
                    {errors.gender}
                  </Typography>
                )}
              </FormControl>

              <TextField
                label="Address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                fullWidth
                margin="normal"
                multiline
                rows={2}
                variant="outlined"
                error={!!errors.address}
                helperText={errors.address || `${formData.address.length}/200`}
                inputProps={{ maxLength: 200 }}
                sx={{ backgroundColor: '#fff', borderRadius: '8px', '&:hover fieldset': { borderColor: '#1976d2' } }}
              />
            </Grid>

            {/* Right Side: Contact & Professional Details */}
            <Grid item xs={12} md={6}>
              <Typography variant="h6" sx={{ mb: 2, color: '#1976d2', fontWeight: 'bold' }}>
                Contact & Professional Details
              </Typography>

              <TextField
                label="Phone Number"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                fullWidth
                margin="normal"
                variant="outlined"
                error={!!errors.phoneNumber}
                helperText={errors.phoneNumber}
                inputProps={{ maxLength: 10 }}
                sx={{ backgroundColor: '#fff', borderRadius: '8px', '&:hover fieldset': { borderColor: '#1976d2' } }}
              />

              <TextField
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                fullWidth
                margin="normal"
                variant="outlined"
                error={!!errors.email}
                helperText={errors.email}
                sx={{ backgroundColor: '#fff', borderRadius: '8px', '&:hover fieldset': { borderColor: '#1976d2' } }}
              />

              <TextField
                label="Temporary Password"
                name="tempPassword"
                value={formData.tempPassword}
                onChange={handleChange}
                fullWidth
                margin="normal"
                variant="outlined"
                type="password"
                error={!!errors.tempPassword}
                helperText={errors.tempPassword || `${formData.tempPassword.length}/50`}
                inputProps={{ maxLength: 50 }}
                sx={{ backgroundColor: '#fff', borderRadius: '8px', '&:hover fieldset': { borderColor: '#1976d2' } }}
              />

              <TextField
                label="Qualification"
                name="qualification"
                value={formData.qualification}
                onChange={handleChange}
                fullWidth
                margin="normal"
                variant="outlined"
                error={!!errors.qualification}
                helperText={errors.qualification || `${formData.qualification.length}/100`}
                inputProps={{ maxLength: 100 }}
                sx={{ backgroundColor: '#fff', borderRadius: '8px', '&:hover fieldset': { borderColor: '#1976d2' } }}
              />

              <TextField
                label="Experience (Years)"
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                fullWidth
                margin="normal"
                variant="outlined"
                type="number"
                error={!!errors.experience}
                helperText={errors.experience}
                sx={{ backgroundColor: '#fff', borderRadius: '8px', '&:hover fieldset': { borderColor: '#1976d2' } }}
              />

              <FormControl fullWidth margin="normal" error={!!errors.department}>
                <InputLabel>Department</InputLabel>
                <Select
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  label="Department"
                  sx={{ backgroundColor: '#fff', borderRadius: '8px' }}
                >
                  <MenuItem value="">Select Department</MenuItem>
                  <MenuItem value="mathematics">Mathematics</MenuItem>
                  <MenuItem value="science">Science</MenuItem>
                  <MenuItem value="english">English</MenuItem>
                  <MenuItem value="it">Information Technology</MenuItem>
                  <MenuItem value="socialstudies">Social Studies</MenuItem>
                </Select>
                {errors.department && (
                  <Typography color="error" variant="caption">
                    {errors.department}
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
              disabled={Object.keys(errors).length > 0 || Object.values(formData).some((val) => !val)}
            >
              Add Teacher
            </StyledButton>
          </Box>
        </Box>
      </StyledPaper>
    </div>
  );
};

export default AddTeacher;