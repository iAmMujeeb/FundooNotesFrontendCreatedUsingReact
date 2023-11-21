import { useContext, useEffect } from 'react';

import { Box, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';

import { DataContext } from '../../context/DataProvider';

//components
import DeleteNote from './DeleteNote';
import Form from '../notes/Form';
import notesService from '../../service/notes-service';

const DrawerHeader = styled('div')(({ theme }) => ({
    ...theme.mixins.toolbar,
}));

const DeleteNotes = () => {

    const { deleteNotes } = useContext(DataContext);
    const { setDeleteNotes } = useContext(DataContext);

    useEffect(() => {
        console.log("Delete Start");
        notesService.getAllTrashNotesByUserId(localStorage.getItem('token'))
            .then((response) => {
                setDeleteNotes(
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
                        deleteNotes.map(deleteNote => (
                            <Grid key={deleteNote.notesId} item>
                                <DeleteNote deleteNote={deleteNote} />
                            </Grid>
                        ))
                    }
                </Grid>
            </Box>
        </Box>
    )
}

export default DeleteNotes;