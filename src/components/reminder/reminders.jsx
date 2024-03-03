import React from "react";
import { useContext, useEffect } from 'react';
import { Box, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';

import { DataContext } from '../../context/DataProvider';

//components
import Form from '../notes/Form';
import EmptyNotes from '../notes/EmptyNotes';
import Reminder from './reminder';

const DrawerHeader = styled('div')(({ theme }) => ({
    ...theme.mixins.toolbar,
}));

const Reminders = () => {

    const { reminderNotes } = useContext(DataContext);
    const { setCount } = useContext(DataContext);

    useEffect(() => {
        updateCount();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    const updateCount = () => {
        setCount(count => ++count);
    }

    return (
        <Box sx={{ display: 'flex', width: '100%' }}>
            <Box sx={{ p: 3, width: '100%' }}>
                <DrawerHeader />
                <Form />
                {reminderNotes.length > 0 ?
                    <Grid container>
                        {
                            reminderNotes.map(reminderNote => (
                                <Grid key={reminderNote.reminderId} item>
                                    <Reminder reminderNote={reminderNote} />
                                </Grid>
                            ))
                        }
                    </Grid>
                    : <EmptyNotes />
                }
            </Box>
        </Box>
    )
}

export default Reminders;