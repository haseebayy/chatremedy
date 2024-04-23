'use client';

import * as React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Box, Button, Card, CardContent } from '@mui/material';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Unstable_Grid2';
import { message, Modal } from 'antd';
import { useForm } from 'react-hook-form';
import { z as zod } from 'zod';



import { config } from '@/config';
import { authClient } from '@/lib/auth/client';
import { useUser } from '@/hooks/use-user';
import { AccountDetailsForm } from '@/components/dashboard/account/account-details-form';
import { AccountInfo } from '@/components/dashboard/account/account-info';





const schema = zod.object({
  firstname: zod.string().nonempty({ message: 'First name is required' }),
  lastname: zod.string().nonempty({ message: 'Last name is required' }),
  email: zod.string().nonempty({ message: 'Email is required' }).email({ message: 'Invalid email format' }),
  jobtitle: zod.string().max(100).nullable(),
  country: zod.string().max(100).nullable(),
  institution: zod.string().max(100).nullable(),
  specialization: zod.string().max(100).nullable(),
  startDate: zod.string().nullable(),
  endDate: zod.string().nullable(),
  helpWith: zod.array(zod.string()).nullable(),
  languagesSpeak: zod.array(zod.string()).nullable(),
  aboutMe: zod.string().max(100).nullable(),
});

type Values = zod.infer<typeof schema>;

export default function EditUser({ user }: any): React.JSX.Element {
  const [isPending, setIsPending] = React.useState<boolean>(false);
  const [successMessage, setSuccessMessage] = React.useState<string | null>(null);
  const [messageApi, contextHolder] = message.useMessage();
  const router = useRouter()
  const [modal, contextHolderModal] = Modal.useModal();
  const { getAllUser } = useUser()
  const {
    control,
    handleSubmit,
    formState: { errors },
    formState,
    getValues,
    setError,
  } = useForm<Values>({
    defaultValues: {
      firstname: user?.firstname || '',
      lastname: user?.lastname || '',
      email: user?.email || '',
      jobtitle: user?.jobtitle || '',
      country: user?.country || '',
      institution: user?.institution || '',
      specialization: user?.specialization || '',
      startDate: user?.startDate || null,
      endDate: user?.endDate || null,
      helpWith: user?.helpWith || [],
      languagesSpeak: user?.languagesSpeak || [],
      aboutMe: user?.aboutMe || '',
    },
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: Values) => {
    setIsPending(true);

    const { error } = await authClient.updateProfile(data, user.id);

    if (error) {
      setError('root', { type: 'server', message: error });
      setIsPending(false);
      return;
    }
 if (error) {
      setError('root', { type: 'server', message: error });
      setIsPending(false);
      return;
    }

    setIsPending(false);
    setSuccessMessage('Info updated successfully');
    setTimeout(() => {
      setSuccessMessage('');
    }, 2000);
  };


  const handleDelete = async (data: Values) => {
    setIsPending(true);


    const { error } = await authClient.deleteUser({}, user.id);

    if (error) {
      setError('root', { type: 'server', message: error });
      setIsPending(false);
      return;
    }

    setIsPending(false);
    messageApi.open({
      type: 'success',
      content: 'User deleted successfully.',
    });
    await getAllUser();
    router.push('/dashboard/employee')
  };

  const handleUser = () => {
     modal.confirm({
       title: `Are you sure about deleting ${user.firstname} ${user.lastname}?`,
       okText: 'Yes',
       cancelText: 'No',
       okType: 'danger',
       onOk: handleDelete,
     });
  }

 

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {contextHolder}
      {contextHolderModal}

      <Stack spacing={3}>
        <Card>
          <CardContent>
            <Stack display={'flex'} flexDirection={'row'} justifyContent={'space-between'}>
              <Stack display={'flex'} gap={'10px'} pb={'40px'} flexDirection={'row'} alignItems={'center'}>
                <Link href={'/dashboard/employee'}>
                  <Box
                    sx={{
                      backgroundColor: '#e6e7e8',
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      display: 'flex',
                      cursor: 'pointer',
                      justifyContent: 'center',
                      color: '#000',
                      alignItems: 'center',
                    }}
                  >
                    <ArrowBackIcon sx={{ backgroundColor: '#e6e7e880' }} />
                  </Box>
                </Link>
                <Typography sx={{ fontSize: '18px' }} variant="h4">
                  Edit Counsellor
                </Typography>
              </Stack>
              <Stack display={'flex'} alignItems={'center'} spacing={2} flexDirection={'row'}>
                {/* @ts-ignore */}
                <Button disabled={isPending} color="error" onClick={handleUser} variant="contained">
                  Delete
                </Button>
                <Button disabled={isPending} type="submit" variant="contained">
                  Save details
                </Button>
              </Stack>
            </Stack>
            <Grid container spacing={3}>
              <Grid lg={4} md={6} xs={12}>
                {user && <AccountInfo user={user} />}
              </Grid>
              <Grid lg={8} md={6} xs={12}>
                {user && <AccountDetailsForm user={user} {...{ control, errors, successMessage }} />}
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Stack>
    </form>
  );
}