import { Card, CardContent, CardActions, Typography, IconButton, Stack, MenuItem, Menu } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ArchiveOutlined as Archive, DeleteOutlineOutlined as Delete } from '@mui/icons-material';
import notesService from '../../service/notes-service';
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';
import { DataContext } from '../../context/DataProvider';
import { useContext, useState } from 'react';
import { useEffect } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const StyledCard = styled(Card)`
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    width: 240px;
    margin: 8px;
    box-shadow: none;
`

const Note = ({ note }) => {

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    const { setNotes } = useContext(DataContext);

    const [count, setCount] = useState(0);

    const [showTextField, setShowTextField] = useState(false);

    useEffect(() => {
        notesService.getAllNotesByUserId(localStorage.getItem('token'))
            .then((response) => {
                setNotes(response.data.data)
            }).catch((e) => {
                console.log(e);
            })
    }, [count]);

    const getImage = (notesId) => {
        let imageData = `http://localhost:8080/image/getimagebynotesid/${notesId}`
        if (imageData !== null) {
            return imageData;
        } else {
            return null;
        }
    }

    const labelNotes = () => {
        console.log("hi");
    }

    const ArchiveNote = (notesId) => {
        return (notesService.setNotesToArchive(notesId),
            setCount(count => count + 1)
        )
    }

    const trashNote = (notesId) => {
        return (notesService.setNotesToTrash(notesId),
            setCount(count => count + 1)
        )
    }

    return (
        <StyledCard>
            <CardContent>
                <Typography>{note.title}</Typography>
                <Typography>
                    {note.note}
                </Typography>
                {
                    <div>
                        <img style={{ height: 'auto', width: '100%' }} src={getImage(note.notesId)} alt="" onError={(event) => event.target.style.display = 'none'} />
                    </div>
                }
            </CardContent>
            <CardActions>
                <Stack direction="row" marginLeft={'auto'} alignItems="center" spacing={1} >
                    <IconButton aria-label="delete" sx={{ marginRight: '85px' }} size="small" onClick={() => labelNotes((note.notesId))}>
                        <NotificationsActiveOutlinedIcon fontSize="inherit" />
                    </IconButton>
                    <IconButton aria-label="delete" size="small" onClick={() => ArchiveNote((note.notesId))}>
                        <Archive fontSize="inherit" />
                    </IconButton>
                    <IconButton aria-label="delete" size="small" onClick={() => trashNote(note.notesId)}>
                        <Delete fontSize="inherit" />
                    </IconButton>
                    <div>
                    <IconButton aria-label="delete" size="small" onClick={(handleClick)}>
                        <MoreVertIcon fontSize="inherit" />
                    </IconButton>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        <MenuItem onClick={labelNotes}>Add Label</MenuItem>
                        <MenuItem onClick={handleClose}>My account</MenuItem>
                        <MenuItem onClick={handleClose}>Logout</MenuItem>
                    </Menu>
                    </div>
                </Stack>
            </CardActions>
        </StyledCard>
    )
}

export default Note;