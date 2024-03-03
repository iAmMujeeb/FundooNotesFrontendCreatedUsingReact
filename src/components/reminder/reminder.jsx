import React from 'react';
import { Card, CardContent, Typography, Button } from '@mui/material';
import { styled } from '@mui/material/styles';

import { useContext } from 'react';
import { DataContext } from '../../context/DataProvider';
import reminderService from '../../service/reminder-service';

const StyledCard = styled(Card)`
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    width: 240px;
    margin: 8px;
    box-shadow: none;
`



const Reminder = (reminderNote) => {

    const { setCount } = useContext(DataContext);

    const getImage = (notesId) => {
        let imageData = `http://localhost:8080/image/getimagebynotesid/${notesId}`
        if (imageData != null) {
            return imageData;
        } else {
            return null;
        }
    }

    const removeReminder = (notesId, reminderId) => {
        console.log(notesId);
        console.log(reminderId);
        reminderService.deleteReminder(notesId, reminderId)
            .then((response) => {
                console.log(response);
            })
        updateCount();
    }

    const updateCount = () => {
        setCount(count => ++count);
    }

    return (
        <StyledCard style={{ marginTop: '24px' }}>
            <CardContent>
                <Typography>{reminderNote.reminderNote.notesModel.title}</Typography>
                <Typography>{reminderNote.reminderNote.notesModel.note}</Typography>
                {
                    <div>
                        <img style={{ height: 'auto', width: '100%' }} src={getImage(reminderNote.reminderNote.notesModel.notesId)} alt="" onError={(event) => event.target.style.display = 'none'} />
                    </div>
                }
                <div style={{ marginTop: '7px' }}>
                    <Button onClick={() => removeReminder(reminderNote.reminderNote.notesModel.notesId, reminderNote.reminderNote.reminderId)} style={{ backgroundColor: 'lightgray', borderRadius: '12px', color: 'black', fontSize: '60%', height: '25px', marginRight: '3px' }}>
                        {String(reminderNote.reminderNote.reminder).substring(0, 21)}
                    </Button>
                </div>
            </CardContent>
        </StyledCard>
    )
}

export default Reminder