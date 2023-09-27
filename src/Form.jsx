import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import axios from 'axios'; // Import axios for making API requests
import { toast } from 'react-toastify'; // Import toast for showing notifications
import 'react-toastify/dist/ReactToastify.css';



const defaultTheme = createTheme();

export default function SignUp() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    gender: '',
    isHosteller: false,
    rollNo: '',
    password: '',
    confirmPassword: '',
  });

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

 
    if (formData.name === '') {
      toast.error('Please enter a valid User Name');
      return;
    }
    if (!formData.email.includes('sece.ac.in')) {
      toast.error('Provide a valid SECE Email Id');
      return;
    }
    if (formData.gender === '') {
      toast.error('Please select a gender');
      return;
    }
    if (formData.rollNo === '') {
      toast.error('Please select a valid Roll Number');
      return;
    }
    if (formData.password === '') {
      toast.error('Password cannot be empty');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

 
    const data = {
      User_name: formData.email,
      password: formData.password,
      gender: formData.gender === 'male' ? 1 : 0,
      isHosteller: formData.isHosteller ? 1 : 0,
      rollNo: formData.rollNo,
      name: formData.name,
    };

    try {
     
      const res = await axios.post('http://localhost:4000/auth/register', data);

      if (res.status === 200) {
        toast.error('User name already exists');
      } else if (res.status === 202) {
        toast.error('Roll Number already exists');
      } else {
        toast.success('User created successfully');
        
        setFormData({
          name: '',
          email: '',
          gender: '',
          isHosteller: false,
          rollNo: '',
          password: '',
          confirmPassword: '',
        });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('An error occurred while submitting the form');
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                autoFocus
                value={formData.name}
                onChange={handleInputChange}
              />
              
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleInputChange}
              />
              
              <FormControl fullWidth margin="normal" required>
                <InputLabel>Gender</InputLabel>
                <Select
                  label="Gender"
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                >
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                </Select>
              </FormControl>
              
              <FormControl fullWidth margin="normal">
                <InputLabel>Hosteller</InputLabel>
                <Select
                  label="Hosteller"
                  name="isHosteller"
                  value={formData.isHosteller}
                  onChange={handleInputChange}
                >
                  <MenuItem value={true}>Yes</MenuItem>
                  <MenuItem value={false}>No</MenuItem>
                </Select>
              </FormControl>
             
              <TextField
                margin="normal"
                required
                fullWidth
                id="rollNo"
                label="Roll Number"
                name="rollNo"
                value={formData.rollNo}
                onChange={handleInputChange}
              />
              
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={formData.password}
                onChange={handleInputChange}
              />
             
              <TextField
                margin="normal"
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="confirmPassword"
                autoComplete="current-password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
              />
             
              <FormControlLabel
                control={
                  <Checkbox
                    name="showPassword"
                    checked={formData.showPassword}
                    onChange={handleInputChange}
                    color="primary"
                  />
                }
                label="Show Password"
              />
              
              <FormControlLabel
                control={
                  <Checkbox
                    name="remember"
                    checked={formData.remember}
                    onChange={handleInputChange}
                    color="primary"
                  />
                }
                label="Remember me"
              />
              <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                Sign Up
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
