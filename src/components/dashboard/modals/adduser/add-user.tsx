'use client';

import * as React from 'react';
import { countries } from '@/const';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Alert,
  Autocomplete,
  Box,
  Checkbox,
  FormControlLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
} from '@mui/material';
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
import { Controller, useForm } from 'react-hook-form';
import { z as zod } from 'zod';

import { authClient } from '@/lib/auth/client';
import { useUser } from '@/hooks/use-user';

const schema = zod.object({
  firstname: zod.string().nonempty({ message: 'First name is required' }),
  lastname: zod.string().nonempty({ message: 'Last name is required' }),
  email: zod.string().nonempty({ message: 'Email is required' }).email({ message: 'Invalid email format' }),
  jobtitle: zod.string().max(100).nullable(),
  country: zod.string().max(100).nullable(),
  languagesSpeak: zod.array(zod.string()).nullable(),
  aboutMe: zod.string().max(100).nullable(),
  isAdmin: zod.boolean(),
  institution: zod.string().max(100).nullable(),
  specialization: zod.string().max(100).nullable(),
  startDate: zod.string().nullable(),
  endDate: zod.string().nullable(),
  helpWith: zod.array(zod.string()).nullable(),
});

type Values = zod.infer<typeof schema>;


const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'background.paper',
  boxShadow: 24,
  borderRadius: '10px',
};

export function AddUserForm({ handleClose, open, user, isAdmin = false }: any): React.JSX.Element {
  const [isPending, setIsPending] = React.useState<boolean>(false);
  const [successMessage, setSuccessMessage] = React.useState<string | null>(null);
  const { getAllUser } = useUser();
  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<Values>({
    defaultValues: {
      firstname: user?.firstname || '',
      lastname: user?.lastname || '',
      email: user?.email || '',
      jobtitle: user?.jobtitle || '',
      country: user?.country || '',
      languagesSpeak: user?.languagesSpeak || [],
      aboutMe: user?.aboutMe || '',
      institution: user?.institution || '',
      specialization: user?.specialization || '',
      startDate: user?.startDate || null,
      endDate: user?.endDate || null,
      helpWith: user?.helpWith || [],
      isAdmin: user?.isAdmin || isAdmin,
    },
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: Values) => {
    setIsPending(true);

    const { error } = await authClient.addUser(data);
    if (error) {
      setError('root', { type: 'server', message: error });
      setIsPending(false);
      return;
    }

    setIsPending(false);
    setSuccessMessage('User added successfully. Temporary password has been sent to the user.');
    getAllUser();
    setTimeout(() => {
      handleClose('');
    }, 2000);
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <>
            <CardHeader
              subheader="The information can be edited"
              title={isAdmin ? 'Add Admin Profile' : 'Add Counsellor'}
            />
            <Divider />
            <CardContent>
              <Stack spacing={2}>
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
                  {!isAdmin && (
                    <>
                      <Grid item md={6} xs={12}>
                        <Controller
                          control={control}
                          name="jobtitle"
                          render={({ field }) => (
                            <FormControl fullWidth error={!!errors.jobtitle}>
                              <InputLabel>Job title</InputLabel>
                              <OutlinedInput {...field} label="Job title" />
                              {errors.jobtitle && <FormHelperText>{errors.jobtitle.message}</FormHelperText>}
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
                      {/* <Grid item md={6} xs={12}>
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
                                input={<OutlinedInput />}
                              >
                                {languages.map((label, index) => {
                                  return <MenuItem key={index} value={label}>{label}</MenuItem>;
                                })}
                              </Select>
                            </FormControl>
                          )}
                        />
                      </Grid>
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
                              {errors.specialization && (
                                <FormHelperText>{errors.specialization.message}</FormHelperText>
                              )}
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
                      </Grid> */}
                    </>
                  )}
                </Grid>

                {errors.root ? <Alert color="error">{errors.root.message}</Alert> : null}
                {successMessage ? <Alert color="success">{successMessage}</Alert> : null}
              </Stack>
            </CardContent>
            <Divider />
            <CardActions sx={{ justifyContent: 'flex-end' }}>
              <Button disabled={isPending} type="submit" variant="contained">
                Add
              </Button>
            </CardActions>
          </>
        </form>
      </Box>
    </Modal>
  );
}
