import { useContext } from 'react';

import { Grid } from '@mui/material';
import { styled } from '@mui/material/styles';

import { DataContext } from '../../context/DataProvider';

//components
import DeleteNote from './DeleteNote';
import Form from '../notes/Form';
import EmptyNotes from '../notes/EmptyNotes';

const DrawerHeader = styled('div')(({ theme }) => ({
    ...theme.mixins.toolbar,
}));

const DeleteNotes = () => {

    const { deleteNotes } = useContext(DataContext);

    return (
        <Grid sx={{ display: 'flex', width: '100%' }}>
            <Grid sx={{ p: 3, width: '100%' }}>
                <DrawerHeader />
                <Form />
                {deleteNotes.length > 0 ?
                    <Grid container>
                        {
                            deleteNotes.map(deleteNote => (
                                <Grid key={deleteNote.notesId} item>
                                    <DeleteNote deleteNote={deleteNote} />
                                </Grid>
                            ))
                        }
                    </Grid>
                    : <EmptyNotes />
                }
            </Grid>
        </Grid>
    )
}

export default DeleteNotes;