import { useContext } from 'react';

import { Box, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';

import { DataContext } from '../../context/DataProvider';

//components
import Archive from './Archive';
import Form from '../notes/Form';
import { useEffect } from 'react';
import notesService from '../../service/notes-service';
import { useState } from 'react';

const DrawerHeader = styled('div')(({ theme }) => ({
    ...theme.mixins.toolbar,
}));

const Archives = () => {

    const [count, setCount] = useState(0);

    const key = () => {
        return setCount(() => count + 1)
    }

    const { archiveNotes, setArchiveNotes } = useContext(DataContext);

    useEffect(() => {
        console.log("Archive Start");
        notesService.getAllArchiveNotesByUserId(localStorage.getItem('token'))
            .then((response) => {
                setArchiveNotes(
                    response.data.data
                );
            }).catch((e) => {
                console.log(e);
            })
    }, []);

    return (
        <Box sx={{ display: 'flex', width: '100%' }}>
            <Box sx={{ p: 3, width: '100%' }}>
                <DrawerHeader />
                <Form />
                <Grid container>
                    {
                        archiveNotes.map(archive => (
                            <Grid  key={archive.notesId} item>
                                <Archive archive={archive} />
                            </Grid>
                        ))
                    }
                </Grid>
            </Box>
        </Box>
    )
}

export default Archives;