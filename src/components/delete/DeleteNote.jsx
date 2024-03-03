import { Card, CardContent, CardActions, Typography, Stack, IconButton, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { RestoreFromTrashOutlined as Restore, DeleteForeverOutlined as Delete } from '@mui/icons-material';
import notesService from '../../service/notes-service';
import { DataContext } from '../../context/DataProvider';
import { useState } from 'react';
import { useContext } from 'react';
import { useEffect } from 'react';
import reminderService from '../../service/reminder-service';

const StyledCard = styled(Card)`
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    width: 240px;
    margin: 8px;
    box-shadow: none;
`

const DeleteNote = ({ deleteNote }) => {

    const [showLabelName, setShowLabelName] = useState([]);
    const { count, setCount } = useContext(DataContext);
    const [reminder, setReminder] = useState();


    const getImage = (notesId) => {
        let imageData = `http://localhost:8080/image/getimagebynotesid/${notesId}`
        if (imageData != null) {
            return imageData;
        } else {
            return null;
        }
    }

    useEffect(() => {
        notesService.getLabelNamesByNoteId(deleteNote.notesId)
            .then((response) => {
                console.log(response);
                setShowLabelName(response.data.data);
            })
        reminderService.getReminder(deleteNote.notesId)
            .then((response) => {
                console.log(response);
                setReminder(response.data.data);
            }).catch((e) => {
                console.log(e);
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [count]);

    const updateCount = () => {
        setCount(count => ++count);
    }

    const restoreNote = (notesId) => {
        notesService.setNotesToUnTrash(notesId);
        setCount(count => count + 1);
    }

    const removeNote = (notesId) => {
        notesService.deleteNotesById(notesId);
        updateCount();
    }

    const removeLabel = (labelName, notesId) => {
        notesService.removeNotesfromLabel(notesId, labelName)
            .then((response) => {
                console.log(response);
                updateCount();
            });
    }

    const removeReminder = (notesId, reminderId) => {
        console.log(notesId);
        console.log(reminderId);
        reminderService.deleteReminder(notesId, reminderId)
            .then((response) => {
                console.log(response);
            }).catch((e) => {
                console.log(e);
            })
        updateCount();
    }

    return (
        <StyledCard style={{ marginTop: '24px' }}>
            <CardContent>
                <Typography>{deleteNote.title}</Typography>
                <Typography>{deleteNote.note}</Typography>
                {
                    <div>
                        <img style={{ height: 'auto', width: '100%' }} src={getImage(deleteNote.notesId)} alt="" onError={(event) => event.target.style.display = 'none'} />
                    </div>
                }
                <div style={{ marginTop: '7px' }}>
                    {showLabelName.map((labelName) =>
                        <Button onClick={() => removeLabel(labelName, deleteNote.notesId)} key={labelName} style={{ backgroundColor: 'lightgray', borderRadius: '12px', color: 'black', fontSize: '60%', height: '25px', marginRight: '3px' }}>
                            {labelName}
                        </Button>
                    )}
                </div>
                <div style={{ marginTop: '7px' }}>
                    {((reminder !== null) && (reminder !== undefined)) ?
                        <Button onClick={() => removeReminder(deleteNote.notesId, reminder.reminderId)} style={{ backgroundColor: 'lightgray', borderRadius: '12px', color: 'black', fontSize: '60%', height: '25px', marginRight: '3px' }}>
                            {(String(reminder.reminder).substring(0, 21))}
                        </Button>
                        : <div></div>
                    }
                </div>
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