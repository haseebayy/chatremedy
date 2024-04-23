'use client';

import * as React from 'react';
import type { Metadata } from 'next';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Download as DownloadIcon } from '@phosphor-icons/react/dist/ssr/Download';
import { Plus as PlusIcon } from '@phosphor-icons/react/dist/ssr/Plus';
import { Upload as UploadIcon } from '@phosphor-icons/react/dist/ssr/Upload';
import dayjs from 'dayjs';

import { config } from '@/config';
import { useUser } from '@/hooks/use-user';
import { CustomersFilters } from '@/components/dashboard/customer/customers-filters';
import { CustomersTable } from '@/components/dashboard/customer/customers-table';
import type { Customer } from '@/components/dashboard/customer/customers-table';
import { AddUserForm } from '@/components/dashboard/modals/adduser/add-user';

export default function Page(): React.JSX.Element {
  const page = 0;
  const rowsPerPage = 5;
  const { AllUsers } = useUser();
  const [modalOpen, setModalOpen] = React.useState(false);
  const filteredEmp = AllUsers?.filter(({ isAdmin }: any) => !isAdmin);
  const paginatedCustomers = applyPagination(filteredEmp, page, rowsPerPage);

  return (
    <Stack spacing={3}>
      <Stack direction="row" spacing={3}>
        <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
          <Typography variant="h4">Counsellors</Typography>
        </Stack>
        <div>
          <Button
            onClick={() => setModalOpen(true)}
            startIcon={<PlusIcon fontSize="var(--icon-fontSize-md)" />}
            variant="contained"
          >
            Add
          </Button>
        </div>
      </Stack>
      <AddUserForm open={modalOpen} handleClose={() => setModalOpen(false)} />
      <CustomersTable
        count={paginatedCustomers?.length}
        page={page}
        rows={paginatedCustomers}
        rowsPerPage={rowsPerPage}
      />
    </Stack>
  );
}

function applyPagination(rows: any[], page: number, rowsPerPage: number): Customer[] {
  return rows?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
}
