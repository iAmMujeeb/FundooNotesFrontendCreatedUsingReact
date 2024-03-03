import { Card, CardContent, CardActions, Typography, IconButton, Stack, MenuItem, Menu, Grid, TextField, ClickAwayListener } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ArchiveOutlined as Archive, DeleteOutlineOutlined as Delete } from '@mui/icons-material';
import notesService from '../../service/notes-service';
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';
import { DataContext } from '../../context/DataProvider';
import { useContext, useEffect, useRef, useState } from 'react';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import DialogTitle from '@mui/material/DialogTitle';
import { StaticDateTimePicker } from '@mui/x-date-pickers';
import reminderService from '../../service/reminder-service';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import DeleteIcon from '@mui/icons-material/Delete';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

const Container = styled(Grid)`
    display: flex;
    flex-direction: column;
    margin: auto;
    box-shadow: 0 1px 2px 0 rgb(60 64 67 / 30%), 0 2px 6px 2px rgb(60 64 67 / 15%);
    border-color: #e0e0e0;
    width: 600px;
    border-radius: 8px;
    min-height: 30px;
    padding: 10px 15px;
    breakpoint.up
`

const StyledCard = styled(Card)`
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    width: 240px;
    margin: 8px;
    box-shadow: none;
`
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const Note = ({ note }) => {

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const [openDatePicker, setOpenDatePicker] = useState(false);

    const [showLabelName, setShowLabelName] = useState([]);

    const [openDialog, setOpenDialog] = useState(false);

    const [openEditDialog, setOpenEditDialog] = useState(false);

    const { count, setCount } = useContext(DataContext);

    const [reminder, setReminder] = useState();

    const handleClickOpen = () => {
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleDatePickerClose = () => {
        setOpenDatePicker(false);
    }

    const handleCloseEditForm = () => {
        setOpenEditDialog(false);
    };

    const handleClickOpenEditForm = () => {
        setOpenEditDialog(true);
    };

    useEffect(() => {
        notesService.getLabelNamesByNoteId(note.notesId)
            .then((response) => {
                setShowLabelName(response.data.data);
            }).catch((e) => {
                console.log(e);
            })
        reminderService.getReminder(note.notesId)
            .then((response) => {
                setReminder(response.data.data);
            }).catch((e) => {
                console.log(e);
            })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [count]);

    const handleChange = (event, notesId) => {
        addLabel(notesId, event.target.value);
        const {
            target: { value },
        } = event;
        setShowLabelName(
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const { labels } = useContext(DataContext);

    const getImage = (notesId) => {
        let imageData = `http://localhost:8080/image/getimagebynotesid/${notesId}`
        if (imageData !== null) {
            return imageData;
        } else {
            return null;
        }
    }

    const updateCount = () => {
        setCount(count => ++count);
    }

    const ArchiveNote = (notesId) => {
        updateCount();
        notesService.setNotesToArchive(notesId);
    }

    const trashNote = (notesId) => {
        notesService.setNotesToTrash(notesId);
        updateCount();
    }

    const addLabel = (notesId, labelNameList) => {
        notesService.addNotesToLabel(notesId, labelNameList)
            .then((response) => {
                console.log(response);
            });
        updateCount();
    }

    const removeLabel = (labelName, notesId) => {
        notesService.removeNotesfromLabel(notesId, labelName)
            .then((response) => {
                console.log(response);
                updateCount();
            });
    }

    const dateChange = (event, notesId) => {
        console.log(event.$d);
        console.log(notesId);
        reminderService.createReminder(notesId, event.$d)
            .then((response) => {
                console.log(response);
                setReminder(response.data.data);
            })
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

    let initialValue = {
        title: note.title,
        note: note.note,
    }

    const [formValue, setForm] = useState(initialValue);
    const [image, setImage] = useState(null);

    const containerRef = useRef();

    const changeValue = (event) => {
        setForm({ ...formValue, [event.target.name]: event.target.value })
    }

    const changeImageValue = (event) => {
        let file = event.target.files[0];
        const imageData = new FormData();
        imageData.append('image', file);
        console.log(imageData);
        setImage(imageData);
        console.log(image);
    }

    const handleClickAway = (event, notesId) => {
        if (formValue.title || formValue.title) {
            save(event, notesId);
            setForm(initialValue);
            setOpenEditDialog(false);
            updateCount();
        }
    }

    const save = (event, notesId) => {
        event.preventDefault();
        let object = {
            title: formValue.title,
            note: formValue.note,
        }
        if ((note.title !== formValue.title) || (note.note !== formValue.note)) {
            notesService.updateNotesData(notesId, object, localStorage.getItem('token'), image)
                .then((response) => {
                    console.log("Data added successfully!", response);
                }).catch((error) => {
                    console.log("Data not added!", error);
                })
        }
    }

    const deleteImage = (notesId) => {
        notesService.deleteImageByNotesId(notesId)
            .then((response) => {
                console.log(response);
            })
        getImage(notesId);
        updateCount();
    }

    return (
        <Grid>
            {(localStorage.getItem('token') !== null) ?
                <StyledCard>
                    <Dialog open={openEditDialog} onClose={handleCloseEditForm}>
                        <Grid>
                            <ClickAwayListener onClickAway={(e) => handleClickAway(e, note.notesId)}>
                                <Grid>
                                    <Container ref={containerRef}>
                                        <Grid>
                                            {
                                                <div style={{ marginBottom: '10px' }}>
                                                    <img style={{ height: 'auto', width: '100%' }} src={getImage(note.notesId)} alt="" onError={(event) => event.target.style.display = 'none'} />
                                                </div>
                                            }
                                            <IconButton onClick={() => deleteImage(note.notesId)} sx={{ marginTop: '-120px', color: 'white', marginLeft: '90%', border: '5px 5px 5px 5px', backgroundColor: 'black' }} size="large">
                                                <DeleteIcon />
                                            </IconButton>
                                        </Grid>
                                        <Grid>
                                            <TextField
                                                value={formValue.title}
                                                placeholder="Title"
                                                variant="standard"
                                                InputProps={{ disableUnderline: true }}
                                                style={{ marginBottom: 10 }}
                                                onChange={(e) => changeValue(e)}
                                                name='title'
                                            />
                                        </Grid>
                                        <Grid>
                                            <TextField
                                                value={formValue.note}
                                                placeholder="Take a note..."
                                                multiline
                                                maxRows={Infinity}
                                                variant="standard"
                                                InputProps={{ disableUnderline: true }}
                                                onChange={(e) => changeValue(e)}
                                                name='note'
                                                id='note'
                                            />
                                        </Grid>
                                        <div>
                                            <Grid>
                                                <IconButton component="label" sx={{ marginRight: 'auto' }}>
                                                    <AddAPhotoIcon />
                                                    <VisuallyHiddenInput name='image' id='image' type="file" onChange={(e) => changeImageValue(e)} />
                                                </IconButton>
                                                <Button sx={{ color: 'black', marginLeft: '74.5%' }} onClick={(e) => handleClickAway(e, note.notesId)} size="small">
                                                    close
                                                </Button>
                                            </Grid>
                                        </div>
                                    </Container>
                                </Grid>
                            </ClickAwayListener>
                        </Grid>
                    </Dialog>
                    <CardContent>
                        <div onClick={handleClickOpenEditForm}>
                            <Typography>
                                {note.title}
                            </Typography>
                            <Typography>
                                {note.note}
                            </Typography>
                            {
                                <div style={{ marginBottom: '10px' }}>
                                    <img style={{ height: 'auto', width: '100%' }} src={getImage(note.notesId)} alt="" onError={(event) => event.target.style.display = 'none'} />
                                </div>
                            }
                        </div>
                        {showLabelName.map((labelName) =>
                            <Button onClick={() => removeLabel(labelName, note.notesId)} key={labelName} style={{ backgroundColor: 'lightgray', borderRadius: '12px', color: 'black', fontSize: '60%', height: '25px', marginRight: '3px' }}>
                                {labelName}
                            </Button>
                        )}
                        <div style={{ marginTop: '7px' }}>
                            {((reminder !== null) && (reminder !== undefined)) ?
                                <Button onClick={() => removeReminder(note.notesId, reminder.reminderId)} style={{ backgroundColor: 'lightgray', borderRadius: '12px', color: 'black', fontSize: '60%', height: '25px', marginRight: '3px' }}>
                                    {(String(reminder.reminder).substring(0, 21))}
                                </Button>
                                : <div></div>
                            }
                        </div>
                    </CardContent>
                    <CardActions>
                        <Stack direction="row" marginLeft={'auto'} alignItems="center" spacing={1} >
                            <IconButton sx={{ marginRight: '85px' }} size="small" onClick={() => setOpenDatePicker(!openDatePicker)}>
                                <NotificationsActiveOutlinedIcon fontSize="inherit" />
                            </IconButton>
                            <Dialog
                                open={openDatePicker}
                                onClose={handleDatePickerClose}
                                aria-labelledby="alert-dialog-title"
                                aria-describedby="alert-dialog-description"
                            >
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <StaticDateTimePicker onAccept={(e) => dateChange(e, note.notesId)} slotProps={{ actionBar: { actions: ['accept'] } }} orientation="landscape" />
                                </LocalizationProvider>
                            </Dialog>
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
                                    <MenuItem onClick={handleClickOpen}>Add Label</MenuItem>
                                    <Dialog
                                        open={openDialog}
                                        onClose={handleCloseDialog}
                                        aria-labelledby="alert-dialog-title"
                                        aria-describedby="alert-dialog-description"
                                    >
                                        <DialogTitle id="alert-dialog-title">
                                            Label Note
                                        </DialogTitle>
                                        <DialogContent>
                                            <FormControl sx={{ m: 1, width: 300 }}>
                                                <Select
                                                    multiple
                                                    value={showLabelName}
                                                    onChange={(event) => handleChange(event, note.notesId)}
                                                    input={<OutlinedInput label="Tag" />}
                                                    renderValue={(selected) => selected.join(', ')}
                                                    MenuProps={MenuProps}
                                                >
                                                    {labels.map((label) => (
                                                        <MenuItem key={label.labelId} value={label.labelName}>
                                                            <Checkbox checked={showLabelName.indexOf(label.labelName) > -1} />
                                                            <ListItemText primary={label.labelName} />
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </DialogContent>
                                        <DialogActions>
                                            <Button onClick={handleCloseDialog} autoFocus>
                                                Done
                                            </Button>
                                        </DialogActions>
                                    </Dialog>
                                </Menu>
                            </div>
                        </Stack>
                    </CardActions>
                </StyledCard>
                :
                <div style={{ textAlign: 'center' }}>
                    Please Sign In First, <span></span>
                    <a href="signin">Sign in</a>
                </div>
            }
        </Grid>
    )
}

export default Note;