import { useContext } from 'react';

import { Box, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';

import { DataContext } from '../../context/DataProvider';

//components
import Form from '../notes/Form';
import { useEffect } from 'react';
import notesService from '../../service/notes-service';
import { useState } from 'react';
import Label from './Label';
import { useLocation } from 'react-router-dom';

const DrawerHeader = styled('div')(({ theme }) => ({
    ...theme.mixins.toolbar,
}));

const Labels = () => {

    const location = useLocation()
    const labelId = location.state.labelId;
    // console.log(labelId);

    const [count, setCount] = useState(0);

    const [ labelNotes, setlabelNotes  ] = useState([]);

    useEffect(() => {
        console.log("label Start");
        notesService.getAllLabelNotesByLabelId(labelId, localStorage.getItem('token'))
            .then((response) => {
                setlabelNotes(
                    response.data.data
                )
            }).catch((e) => {
                console.log(e);
            })
            // console.log(labelNotes);
    }, [labelId]);

    return (
        <Box sx={{ display: 'flex', width: '100%' }}>
            <Box sx={{ p: 3, width: '100%' }}>
                <DrawerHeader />
                <Form />
                <Grid container>
                    {
                        labelNotes.map(notes => (
                            <Grid key={notes.notesId} item>
                                <Label labelNote={notes} />
                            </Grid>
                        ))
                    }
                </Grid>
            </Box>
        </Box>
    )
}

export default Labels;