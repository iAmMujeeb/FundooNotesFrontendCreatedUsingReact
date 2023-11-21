import { Card, CardContent, CardActions, Typography, Stack, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import { RestoreFromTrashOutlined as Restore, DeleteForeverOutlined as Delete } from '@mui/icons-material';
import notesService from '../../service/notes-service';
import { DataContext } from '../../context/DataProvider';
import { useState } from 'react';
import { useContext } from 'react';
import { useEffect } from 'react';

const StyledCard = styled(Card)`
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    width: 240px;
    margin: 8px;
    box-shadow: none;
`

const DeleteNote = ({ deleteNote }) => {

    const { setDeleteNotes } = useContext(DataContext);

    const [count, setCount] = useState(0);

    useEffect(() => {
        notesService.getAllTrashNotesByUserId(localStorage.getItem('token'))
            .then((response) => {
                setDeleteNotes(
                    response.data.data
                );
            }).catch((e) => {
                console.log(e);
            })
    }, [count]);

    const getImage = (notesId) => {
        let imageData = `http://localhost:8080/image/getimagebynotesid/${notesId}`
        if(imageData!=null){
            return imageData;
        }else{
            return null;
        }
    }

    const restoreNote = (notesId) => {
        return (notesService.setNotesToUnTrash(notesId),
        setCount(count => count + 1)
    )}

    const removeNote = (notesId) => {
        notesService.deleteNotesById(notesId)
        .then(setCount(count => count + 1))
    }

    return (
        <StyledCard>
            <CardContent>
                <Typography>{deleteNote.title}</Typography>
                <Typography>{deleteNote.note}</Typography>
                { 
                    <div>
                        <img style={{ height: 'auto', width: '100%' }} src={getImage(deleteNote.notesId)} alt="" onError={(event) => event.target.style.display = 'none'} />
                    </div>
                }
            </CardContent>
            <CardActions>
                <Stack direction="row" marginLeft={'auto'} alignItems="center" spacing={1} >
                    <IconButton aria-label="restore" size="small" onClick={() => restoreNote(deleteNote.notesId)}>
                        <Restore fontSize="inherit" />
                    </IconButton>
                    <IconButton aria-label="delete" size="small" onClick={() => removeNote(deleteNote.notesId)}>
                        <Delete fontSize="inherit" />
                    </IconButton>
                </Stack>
            </CardActions>
        </StyledCard>
    )
}

export default DeleteNote;