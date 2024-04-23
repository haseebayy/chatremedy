'use client';

import * as React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { Alert, Autocomplete, MenuItem, Select, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { DatePicker } from '@mui/x-date-pickers';
import dayjs from 'dayjs';
import { Controller, useForm } from 'react-hook-form';
import { z as zod } from 'zod';

import { authClient } from '@/lib/auth/client';

import { countries, languages } from '../../../const/index';

export function AccountDetailsForm({ user, control, errors, successMessage }: any): React.JSX.Element {
  return (
    <>
      <Stack spacing={2}>
        <Typography variant="h6" sx={{ fontWeight: '600', pb: 1 }}>
          Information:
        </Typography>
        <Grid container spacing={2}>
          <Grid item md={6} xs={12}>
            <Controller
              control={control}
              name="firstname"
              render={({ field }) => (
                <FormControl fullWidth error={!!errors.firstname}>
                  <InputLabel>First name</InputLabel>
                  <OutlinedInput {...field} label="First name" />
                  {errors.firstname && <FormHelperText>{errors.firstname.message}</FormHelperText>}
                </FormControl>
              )}
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <Controller
              control={control}
              name="lastname"
              render={({ field }) => (
                <FormControl fullWidth error={!!errors.lastname}>
                  <InputLabel>Last name</InputLabel>
                  <OutlinedInput {...field} label="Last name" />
                  {errors.lastname && <FormHelperText>{errors.lastname.message}</FormHelperText>}
                </FormControl>
              )}
            />
          </Grid>

          <Grid item md={6} xs={12}>
            <Controller
              control={control}
              name="email"
              render={({ field }) => (
                <FormControl fullWidth error={!!errors.email}>
                  <InputLabel>Email address</InputLabel>
                  <OutlinedInput {...field} label="Email address" />
                  {errors.email && <FormHelperText>{errors.email.message}</FormHelperText>}
                </FormControl>
              )}
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <Controller
              control={control}
              name="country"
              render={({ field }) => (
                <FormControl fullWidth error={!!errors.country}>
                  <InputLabel>Country</InputLabel>
                  <Select {...field} input={<OutlinedInput label="Country" />}>
                    {countries.map((label, index) => {
                      return (
                        <MenuItem key={index} value={label}>
                          {label}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              )}
            />
          </Grid>
        </Grid>
        <Typography variant="h6" sx={{ fontWeight: '600', pt: 6, pb: 1 }}>
          About:
        </Typography>
        <Grid container spacing={2}>
          <Grid item md={6} xs={12}>
            <Controller
              control={control}
              name="helpWith"
              render={({ field }) => {
                const { value, onChange } = field;
                return (
                  <Autocomplete
                    multiple
                    // @ts-ignore
                    options={[]}
                    // @ts-ignore
                    defaultValue={value}
                    freeSolo
                    // @ts-ignore
                    onChange={(e) => onChange([...value, e.target.value])}
                    // @ts-ignore
                    renderInput={(params) => {
                      return (
                        <FormControl fullWidth error={!!errors.country}>
                          <TextField {...params} label="I can help with" value={value} />
                        </FormControl>
                      );
                    }}
                  ></Autocomplete>
                );
              }}
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <Controller
              control={control}
              name="languagesSpeak"
              render={({ field }) => (
                <FormControl fullWidth>
                  <InputLabel>Languages</InputLabel>
                  <Select
                    multiple
                    {...field}
                    renderValue={(selected) => (selected as string[]).join(', ')}
                    input={<OutlinedInput label="Languages" />}
                  >
                    {languages.map((label, index) => {
                      return (
                        <MenuItem key={index} value={label}>
                          {label}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              )}
            />
          </Grid>

          <Grid item xs={12}>
            <Controller
              control={control}
              name="aboutMe"
              render={({ field }) => (
                <FormControl fullWidth error={!!errors.aboutMe}>
                  <InputLabel>About me</InputLabel>
                  <OutlinedInput {...field} multiline rows={4} label="About me" />
                  {errors.aboutMe && <FormHelperText>{errors.aboutMe.message}</FormHelperText>}
                </FormControl>
              )}
            />
          </Grid>
        </Grid>
        <Typography variant="h6" sx={{ fontWeight: '600', pt: 6, pb: 1 }}>
          Education:
        </Typography>
        <Grid container spacing={2}>
          <Grid item md={6} xs={12}>
            <Controller
              control={control}
              name="institution"
              render={({ field }) => (
                <FormControl fullWidth error={!!errors.institution}>
                  <InputLabel>Institution</InputLabel>
                  <OutlinedInput {...field} label="Institution" />
                  {errors.institution && <FormHelperText>{errors.institution.message}</FormHelperText>}
                </FormControl>
              )}
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <Controller
              control={control}
              name="specialization"
              render={({ field }) => (
                <FormControl fullWidth error={!!errors.specialization}>
                  <InputLabel>Specialization</InputLabel>
                  <OutlinedInput {...field} label="Specialization" />
                  {errors.specialization && <FormHelperText>{errors.specialization.message}</FormHelperText>}
                </FormControl>
              )}
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <Controller
              control={control}
              name="startDate"
              render={({ field }) => (
                <FormControl fullWidth error={!!errors.startDate}>
                  <DatePicker
                    {...field}
                    // @ts-ignore
                    value={field.value ? dayjs(field.value) : null}
                    // @ts-ignore
                    onChange={(event) => field.onChange(event?.toISOString())}
                    label="Start Date"
                  />
                  {errors.startDate && <FormHelperText>{errors.startDate.message}</FormHelperText>}
                </FormControl>
              )}
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <Controller
              control={control}
              name="endDate"
              render={({ field }) => (
                <FormControl fullWidth error={!!errors.endDate}>
                  <DatePicker
                    {...field}
                    // @ts-ignore
                    value={field.value ? dayjs(field.value) : null}
                    // @ts-ignore
                    onChange={(event) => field.onChange(event?.toISOString())}
                    label="End Date"
                  />
                  {errors.endDate && <FormHelperText>{errors.endDate.message}</FormHelperText>}
                </FormControl>
              )}
            />
          </Grid>
        </Grid>
        {errors.root ? <Alert color="error">{errors.root.message}</Alert> : null}
        {successMessage ? <Alert color="success">{successMessage}</Alert> : null}
      </Stack>
    </>
  );
}
