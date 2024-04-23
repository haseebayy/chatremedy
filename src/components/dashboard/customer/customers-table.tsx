'use client';

import * as React from 'react';
import Link from 'next/link';
import { Badge, Chip, Tooltip } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { Space, Switch } from 'antd';
import dayjs from 'dayjs';



import { authClient } from '@/lib/auth/client';
import { useSelection } from '@/hooks/use-selection';
import { useUser } from '@/hooks/use-user';



import CustomImage from '../CustomImage';


function noop(): void {
  // do nothing
}

export interface Customer {
  id: string;
  avatar: string;
  name: string;
  email: string;
  address: { city: string; state: string; country: string; street: string };
  phone: string;
  createdAt: Date;
}

interface CustomersTableProps {
  count?: number;
  page?: number;
  rows?: any[];
  rowsPerPage?: number;
}

export function CustomersTable({
  count = 0,
  rows = [],
  page = 0,
  rowsPerPage = 0,
}: CustomersTableProps): React.JSX.Element {
  const { getAllUser, user } = useUser();

  const handleToggle = async (data: any, id: any) => {
    const param = {
      action: data ? 'disable' : 'enable',
    };
    await authClient.updateStatus(param, id);

    getAllUser();
  };

  return (
    <Card>
      <Box sx={{ overflowX: 'auto' }}>
        <Table sx={{ minWidth: '800px' }}>
          <TableHead>
            <TableRow>
              {/* <TableCell padding="checkbox">
                <Checkbox
                  checked={selectedAll}
                  indeterminate={selectedSome}
                  onChange={(event) => {
                    if (event.target.checked) {
                      selectAll();
                    } else {
                      deselectAll();
                    }
                  }}
                />
              </TableCell> */}
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Country</TableCell>
              <TableCell>Availability</TableCell>
              <TableCell>Date Registered</TableCell>
              <TableCell>
                <Stack display={'flex'} alignItems={'center'} justifyContent={'center'}>
                  Status
                </Stack>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {!rows.length && (
              <TableRow>
                {' '}
                <TableCell colSpan={6}>No Records Found</TableCell>{' '}
              </TableRow>
            )}

            {rows.map((row) => {
              return (
                <TableRow hover key={row.id}>
                  {/* <TableCell padding="checkbox">
                    <Checkbox
                      checked={isSelected}
                      onChange={(event) => {
                        if (event.target.checked) {
                          selectOne(row.id);
                        } else {
                          deselectOne(row.id);
                        }
                      }}
                    />
                  </TableCell> */}
                  <TableCell>
                    <Stack sx={{ alignItems: 'center' }} direction="row" spacing={2}>
                      {/* <Tooltip title={row.isActive ? 'Online' : 'Offline'}> */}
                      {/* <Badge
                          variant="dot"
                          color={row.isActive ? 'success' : 'error'}
                          anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'right',
                          }}
                          sx={{
                            '& .MuiBadge-dot': {
                              width: 20,
                              height: 20,
                              borderRadius: '50%',
                              border: '2px solid #FFFFFF',
                              right: 3,
                              bottom: 4,
                            },
                          }}
                        > */}
                      <Link href={`/dashboard/employee/${row?.id}`}>
                        <CustomImage src={row.avatar} />
                      </Link>
                      {/* </Badge>
                      </Tooltip> */}
                      <Typography variant="subtitle2">{row?.firstname}</Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>{row.lastname}</TableCell>
                  <TableCell>{row.email || 'N/A'}</TableCell>
                  <TableCell>{row.country || 'N/A'}</TableCell>
                  <TableCell>
                    <Chip label={row.isActive ? 'Online' : 'Offline'} color={row.isActive ? 'success' : 'error'} />
                  </TableCell>

                  <TableCell>{dayjs(row.createdAt).format('MMM D, YYYY')}</TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={1} justifyContent={'center'} alignItems="center">
                      <Switch
                        onChange={(e) => handleToggle(e, row?.id)}
                        checkedChildren="Disabled"
                        unCheckedChildren="Enabled"
                        checked={row.disabled || false}
                      />
                    </Stack>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Box>
      <Divider />
      <TablePagination
        component="div"
        count={count}
        onPageChange={noop}
        onRowsPerPageChange={noop}
        page={page}
        rowsPerPage={rowsPerPage}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
}