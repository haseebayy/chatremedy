'use client';

import * as React from 'react';
import { Alert } from '@mui/material';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';



import { authClient } from '@/lib/auth/client';





interface FormErrors {
  currentPassword: string;
  newPassword: string;
  newPasswordConfirm: string;
}

export function UpdatePasswordForm(): React.JSX.Element {
  const [formData, setFormData] = React.useState({
    currentPassword: '',
    newPassword: '',
    newPasswordConfirm: '',
  });

  const [errors, setErrors] = React.useState<FormErrors>({
    currentPassword: '',
    newPassword: '',
    newPasswordConfirm: '',
  });

  const [isPending, setIsPending] = React.useState(false);
  const [successMessage, setSuccessMessage] = React.useState<string | null>(null);
  const [error, setError] = React.useState<string | null>();
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setIsPending(true);
    event.preventDefault();
    // Validate form data
    const validationErrors = validateForm(formData);
    
    if (Object.values(validationErrors).some(error => !!error)) {
      setErrors(validationErrors);
    } else {
      // Submit form data
      // You can perform API call or any other action here
      console.log('Form submitted:', formData);
      const { error } = await authClient.updatePassword(formData);

      if (error) {
        setError(error);
        setIsPending(false);
        return;
      }

      // Clear form data
      setFormData({
        currentPassword: '',
        newPassword: '',
        newPasswordConfirm: '',
      });
      // Clear errors
      setErrors({
        currentPassword: '',
        newPassword: '',
        newPasswordConfirm: '',
      });
      setError('');
      setSuccessMessage('Updated Password successfully.');
    }
    setIsPending(false);
  };

  const validateForm = (data: { [key: string]: string }) => {
    const errors: FormErrors = {
      currentPassword: '',
      newPassword: '',
      newPasswordConfirm: '',
    };
    // Password validation
    if (!data.currentPassword) {
      errors.currentPassword = 'Password is required';
    }
    // New password validation
    if (!data.newPassword) {
      errors.newPassword = 'New password is required';
    } else if (data.newPassword.length < 8) {
      errors.newPassword = 'New password must be at least 8 characters long';
    }
    // Confirm password validation
    if (!data.newPasswordConfirm) {
      errors.newPasswordConfirm = 'Confirm password is required';
    } else if (data.newPassword !== data.newPasswordConfirm) {
      errors.newPasswordConfirm = 'Passwords do not match';
    }
    return errors;
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* <Card> */}
        <CardHeader subheader="Update password" title="Password" />
        <Divider />
        <CardContent>
          <Stack spacing={3} sx={{ maxWidth: 'sm' }}>
            <FormControl fullWidth error={!!errors.currentPassword}>
              <InputLabel>Password</InputLabel>
              <OutlinedInput
                label="Password"
                name="currentPassword"
                type="password"
                value={formData.currentPassword}
                onChange={handleChange}
              />
              {errors.currentPassword && <span>{errors.currentPassword}</span>}
            </FormControl>
            <FormControl fullWidth error={!!errors.newPassword}>
              <InputLabel>New password</InputLabel>
              <OutlinedInput
                label="New password"
                name="newPassword"
                type="password"
                value={formData.newPassword}
                onChange={handleChange}
              />
              {errors.newPassword && <span>{errors.newPassword}</span>}
            </FormControl>
            <FormControl fullWidth error={!!errors.newPasswordConfirm}>
              <InputLabel>Confirm new password</InputLabel>
              <OutlinedInput
                label="Confirm new password"
                name="newPasswordConfirm"
                type="password"
                value={formData.newPasswordConfirm}
                onChange={handleChange}
              />
              {errors.newPasswordConfirm && <span>{errors.newPasswordConfirm}</span>}
            </FormControl>
            {error ? <Alert color="error">{error}</Alert> : null}
            {successMessage ? <Alert color="success">{successMessage}</Alert> : null}
          </Stack>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: 'flex-end' }}>
          <Button disabled={isPending} type="submit" variant="contained">
            Update
          </Button>
        </CardActions>
      {/* </Card> */}
    </form>
  );
}