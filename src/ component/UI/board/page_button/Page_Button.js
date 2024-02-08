import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

import './Page_Button.scss';

export default function PaginationRounded() {
    return (
        <Stack className="stack" spacing={2}>
            <Pagination count={10} variant="outlined" shape="rounded" />
        </Stack>
    );
}