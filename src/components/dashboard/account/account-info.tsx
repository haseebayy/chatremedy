'use client';

import * as React from 'react';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';


import CustomImage from '../CustomImage';

export function AccountInfo({ user }: any): React.JSX.Element {
  return (
    <Stack spacing={2} sx={{ alignItems: 'center', position: 'relative' }}>
      <CustomImage src={user?.avatar} sx={{ height: '300px', width: '300px' }} />
      <Stack
        sx={{
          textAlign: 'center',
          backgroundColor: '#3b2a4d',
          borderRadius: '10px',
          color: '#fff',
          p: '10px 30px',
          position: 'absolute',
          bottom: '-2px',
        }}
      >
        <Typography sx={{ fontSize: '16px', fontWeight: '700' }} variant="h5">
          {user?.firstname} {user?.lastname}
        </Typography>
        <Typography sx={{ fontSize: '14px', fontWeight: '700' }} variant="h6">
          {user?.email}
        </Typography>
      </Stack>
    </Stack>
  );
}
