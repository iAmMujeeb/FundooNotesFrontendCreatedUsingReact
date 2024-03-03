import { Card, CardContent, Typography, Button } from '@mui/material';
import { styled } from '@mui/material/styles';

import notesService from '../../service/notes-service';
import { useContext } from 'react';
import { DataContext } from '../../context/DataProvider';

const StyledCard = styled(Card)`
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    width: 240px;
    margin: 8px;
    box-shadow: none;
`

const Label = ({ labelNote }) => {

    const { setCount } = useContext(DataContext);


    const getImage = (notesId) => {
        let imageData = `http://localhost:8080/image/getimagebynotesid/${notesId}`
        if (imageData != null) {
            return imageData;
        } else {
            return null;
        }
    }


    const removeLabel = (labelName, notesId) => {
        notesService.removeNotesfromLabel(notesId, labelName)
            .then((response) => {
                updateCount();
            });
        updateCount();
    }

    const updateCount = () => {
        setCount(count => ++count);
    }

    return (
        <StyledCard style={{ marginTop: '24px' }}>
            <CardContent>
                <Typography>{labelNote.labelNote.title}</Typography>
                <Typography>{labelNote.labelNote.note}</Typography>
                {
                    <div>
                        <img style={{ height: 'auto', width: '100%' }} src={getImage(labelNote.labelNote.notesId)} alt="" onError={(event) => event.target.style.display = 'none'} />
                    </div>
                }
                <div style={{ marginTop: '7px' }}>
                    <Button onClick={() => removeLabel(labelNote.showLabelName, labelNote.labelNote.notesId)} style={{ backgroundColor: 'lightgray', borderRadius: '12px', color: 'black', fontSize: '60%', height: '25px', marginRight: '3px' }}>
                        {labelNote.showLabelName}
                    </Button>
                </div>
            </CardContent>
            {/* <CardActions>
                <Stack direction="row" marginLeft={'auto'} alignItems="center" spacing={1} >
                <IconButton aria-label="delete" sx={{marginRight:'118px'}} size="small" onClick={() => labelNotes((labelNote.notesId))}>
                        <NotificationsActiveOutlinedIcon fontSize="inherit" />
                    </IconButton>
                    <IconButton aria-label="delete" size="small" onClick={() => unArchiveNote(labelNote.notesId)}>
                        <Unarchive fontSize="inherit" />
                    </IconButton>
                    <IconButton aria-label="delete" size="small" onClick={() => trashNote(labelNote.notesId)}>
                        <Delete fontSize="inherit" />
                    </IconButton>
                </Stack>
            </CardActions> */}
        </StyledCard>
    )
}

export default Label;