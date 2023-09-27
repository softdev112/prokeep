import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the styles (if not already imported)

import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  textField: {
    margin: theme.spacing,
    width: '300px',
  },
  button: {
    margin: theme.spacing,
  },
}));

function LoginForm() {
  const classes = useStyles();
  const [token, setToken] = useState('');

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const validateEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 8;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'email') {
      const isValid = validateEmail(value);
      setErrors({ ...errors, email: isValid ? '' : 'Invalid email address' });
    } else if (name === 'password') {
      const isValid = validatePassword(value);
      setErrors({ ...errors, password: isValid ? '' : 'Invalid password' });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check for any validation errors before submitting
    if (!validateEmail(formData.email) || !validatePassword(formData.password)) {
      return;
    }

    // Send login data to your API here
    const { email, password } = formData;

    try {
      const response = await axios.post('https://reqres.in/api/register', {
        email: email,
        password: password,
      });

      toast.error(response.error, {
        position: 'top-right',
      });
      // Assuming the API returns a token
      setToken(response.data.token);
    } catch (error) {
      console.error('Login failed:', error);
      // Handle login error here
      toast.error(error.message, {
        position: 'top-right',
      });
    }
};

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <TextField
        className={classes.textField}
        label="Email"
        variant="outlined"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        required
        error={!!errors.email}
        helperText={errors.email}
      />
      <TextField
        className={classes.textField}
        label="Password"
        variant="outlined"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        required
        error={!!errors.password}
        helperText={errors.password}
      />
      <Button
        className={classes.button}
        variant="contained"
        color="primary"
        type="submit"
      >
        Login
      </Button>
    </form>
  );
}

export default LoginForm;
