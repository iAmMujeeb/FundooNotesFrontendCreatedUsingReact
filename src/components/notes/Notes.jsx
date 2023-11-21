import { useContext } from 'react';

import { Box, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

import { DataContext } from '../../context/DataProvider';
import { reorder } from '../../utils/common-utils';

//components
import Form from './Form';
import Note from './Note';
import EmptyNotes from './EmptyNotes';
import { useEffect } from 'react';
import notesService from '../../service/notes-service';

const DrawerHeader = styled('div')(({ theme }) => ({
    ...theme.mixins.toolbar,
}));

const Notes = () => {

    const { notes, setNotes } = useContext(DataContext);

    // useEffect(() => {
    //     console.log("Note Start");
    //     notesService.getAllNotesByUserId(localStorage.getItem('token'))
    //         .then((response) => {
    //             setNotes(response.data.data)
    //         }).catch((e) => {
    //             console.log(e);
    //         })
    // }, []);

    const onDragEnd = (result) => {
        if (!result.destination)
            return;

        const items = reorder(notes, result.source.index, result.destination.index);
        setNotes(items);
    }

    return (
        <Box sx={{ display: 'flex', width: '100%' }}>
            <Box sx={{ p: 3, width: '100%' }}>
                <DrawerHeader />
                <Form />
                {notes.length > 0 ?
                    <DragDropContext onDragEnd={onDragEnd}>
                        <Droppable droppableId="droppable">
                            {(provided, snapshot) => (
                                <Grid container style={{ marginTop: 16 }}
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                >
                                    {
                                        notes.map((note, index) => (
                                            <Draggable key={(note.notesId)} draggableId={(note.notesId)+''} index={index}>
                                                {(provided, snapshot) => (
                                                    <Grid ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        item
                                                    >
                                                        <Note note={note} />
                                                    </Grid>
                                                )}
                                            </Draggable >
                                        ))
                                    }
                                    {provided.placeholder}
                                </Grid>
                            )}
                        </Droppable >
                    </DragDropContext>
                    : <EmptyNotes />}
            </Box>
        </Box>
    )
}

export default Notes;