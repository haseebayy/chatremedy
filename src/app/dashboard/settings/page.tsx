'use client';

import * as React from 'react';
import type { Metadata } from 'next';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Button } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';

import { config } from '@/config';
import { useUser } from '@/hooks/use-user';
import { AdminsTable } from '@/components/dashboard/customer/admins-table';
import { AddUserForm } from '@/components/dashboard/modals/adduser/add-user';
import { Notifications } from '@/components/dashboard/settings/notifications';
import { UpdatePasswordForm } from '@/components/dashboard/settings/update-password-form';
import { Customer } from '@/components/dashboard/customer/customers-table';


// export const metadata = { title: `Update Password | Dashboard | ${config.site.name}` } satisfies Metadata;

export default function Page(): React.JSX.Element {
  const page = 0;
  const rowsPerPage = 5;
  const { AllUsers } = useUser();
  const [modalOpen, setModalOpen] = React.useState(false);
  const filteredEmp = AllUsers?.filter(({ isAdmin }: any) => isAdmin);
  const paginatedCustomers = applyPagination(filteredEmp, page, rowsPerPage);
  return (
    <Stack spacing={3}>
      <Accordion
        style={{
          // backgroundColor: 'lightblue',
          boxShadow: 'none',
          border: '1px solid rgba(0, 0, 0, 0.12)',
          borderRadius: '10px',
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="update-password-content"
          id="update-password-header"
          style={{
            // backgroundColor: 'lightgreen',
            borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
            borderRadius: '4px',
            padding: '10px',
          }}
        >
          <Typography variant="h6">Update Password</Typography>
        </AccordionSummary>
        <AccordionDetails
          style={{
            // backgroundColor: 'lightyellow',
            borderRadius: '4px',
            padding: '10px',
          }}
        >
          <UpdatePasswordForm />
        </AccordionDetails>
      </Accordion>

      <Accordion
        style={{
          // backgroundColor: 'lightblue',
          boxShadow: 'none',
          border: '1px solid rgba(0, 0, 0, 0.12)',
          borderRadius: '10px',
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="update-password-content"
          id="update-password-header"
          style={{
            // backgroundColor: 'lightgreen',
            borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
            borderRadius: '4px',
            padding: '10px',
          }}
        >
          <Typography variant="h6">Add Admins</Typography>
        </AccordionSummary>
        <AccordionDetails
          style={{
            // backgroundColor: 'lightyellow',
            borderRadius: '4px',
            padding: '10px',
          }}
        >
          <Stack spacing={3}>
            <Stack direction="row" spacing={3}>
              <Stack spacing={1} sx={{ flex: '1 1 auto' }}></Stack>
              <div>
                <Button
                  onClick={() => setModalOpen(true)}
                  startIcon={<PlusIcon fontSize="var(--icon-fontSize-md)" />}
                  variant="contained"
                >
                  Add Admin
                </Button>
              </div>
            </Stack>
            <AddUserForm open={modalOpen} isAdmin handleClose={() => setModalOpen(false)} />
            <AdminsTable
              count={paginatedCustomers?.length}
              page={page}
              rows={paginatedCustomers}
              rowsPerPage={rowsPerPage}
            />
          </Stack>
        </AccordionDetails>
      </Accordion>
    </Stack>
  );
}



function applyPagination(rows: any[], page: number, rowsPerPage: number): Customer[] {
  return rows?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
}