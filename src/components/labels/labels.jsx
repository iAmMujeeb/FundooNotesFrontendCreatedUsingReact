import { useContext } from 'react';

import { Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useParams } from "react-router-dom";
import { DataContext } from '../../context/DataProvider';

//components
import Form from '../notes/Form';
import { useEffect } from 'react';
import notesService from '../../service/notes-service';
import { useState } from 'react';
import Label from './Label';
import EmptyNotes from '../notes/EmptyNotes';

const DrawerHeader = styled('div')(({ theme }) => ({
    ...theme.mixins.toolbar,
}));

const Labels = () => {

    const params = useParams();
    const [showLabelName, setShowLabelName] = useState([]);
    const { count } = useContext(DataContext);

    const [labelNotes, setlabelNotes] = useState([]);

    useEffect(() => {
        console.log("label Start");
        notesService.getAllLabelNotesByLabelId(params.id, localStorage.getItem('token'))
            .then((response) => {
                console.log(response.data.data);
                setlabelNotes(
                    response.data.data
                )
            }).catch((e) => {
                console.log(e);
            })
        notesService.getAllLabelNotesByLabelId(3, localStorage.getItem('token'))
            .then((response) => {
                console.log(response.data.data);
            }).catch((e) => {
                console.log(e);
            })
        notesService.getCurrentLabel(params.id, localStorage.getItem('token'))
            .then((response) => {
                setShowLabelName(response.data.data);
            })
    }, [count, params.id]);

    return (
        <Grid sx={{ display: 'flex', width: '100%' }}>
            <Grid sx={{ p: 3, width: '100%' }}>
                <DrawerHeader />
                <Form />
                {labelNotes.length > 0 ?
                    <Grid container>
                        {
                            labelNotes.map((labelNote, index) => (
                                <Grid key={index} item>
                                    <Label labelNote={{ labelNote, showLabelName }} />
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

export default Labels;