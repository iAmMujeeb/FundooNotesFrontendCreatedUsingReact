import { Card, CardContent, CardActions, Typography, Stack, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import { UnarchiveOutlined as Unarchive, DeleteOutlineOutlined as Delete } from '@mui/icons-material';
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';

import notesService from '../../service/notes-service';
import { useState } from 'react';
import { useContext } from 'react';
import { DataContext } from '../../context/DataProvider';
import { useEffect } from 'react';

const StyledCard = styled(Card)`
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    width: 240px;
    margin: 8px;
    box-shadow: none;
`

const Archive = ({ archive }) => {

    const [ count, setCount]  = useState(0);

    const { archives, setArchiveNotes } = useContext(DataContext);

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

    useEffect(() => {
        notesService.getAllArchiveNotesByUserId(localStorage.getItem('token'))
            .then((response) => {
                setArchiveNotes(
                    response.data.data
                );
            }).catch((e) => {
                console.log(e);
            })
    }, [count, setArchiveNotes]);

    const labelNotes = () => {
        console.log("hi");
    }

    const unArchiveNote = (notesId) => {
        notesService.setNotesToUnArchive(notesId);
        setCount(count => count + 1);
    }

    const trashNote = (notesId) => {
        notesService.setNotesToTrash(notesId);
        setCount(count => count + 1);
    }

    return (
        <StyledCard>
            <CardContent>
                <Typography>{archive.title}</Typography>
                <Typography>{archive.note}</Typography>
                <div>
                <img style={{height:'80px', width:'80px'}} src={`http://localhost:8080/image/getimagebynotesid/${archive.notesId}`} alt="" />
                </div>
            </CardContent>
            <CardActions>
                <Stack direction="row" marginLeft={'auto'} alignItems="center" spacing={1} >
                <IconButton aria-label="delete" sx={{marginRight:'118px'}} size="small" onClick={() => labelNotes((archive.notesId))}>
                        <NotificationsActiveOutlinedIcon fontSize="inherit" />
                    </IconButton>
                    <IconButton aria-label="delete" size="small" onClick={() => unArchiveNote(archive.notesId)}>
                        <Unarchive fontSize="inherit" />
                    </IconButton>
                    <IconButton aria-label="delete" size="small" onClick={() => trashNote(archive.notesId)}>
                        <Delete fontSize="inherit" />
                    </IconButton>
                </Stack>
            </CardActions>
        </StyledCard>
    )
}

export default Archive;