import { Container, Divider, FormGroup, IconButton, List, ListItem, ListItemIcon, ListItemText, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Grid } from '@mui/material';
import { LightbulbOutlined as Lightbulb, ArchiveOutlined as Archive, DeleteOutlineOutlined as Delete } from '@mui/icons-material';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { useContext } from 'react';
import { DataContext } from '../context/DataProvider';
import { useEffect } from 'react';
import notesService from '../service/notes-service';
import LabelOutlinedIcon from '@mui/icons-material/LabelOutlined';

// function createData(deleteButton, labelName, editButton) {
//     return { deleteButton, labelName, editButton };
// }

// const rows = [
//     createData('deleteButton', 'work', 'editButton'),
//     createData('deleteButton', 'arm', 'editButton'),
//     createData('deleteButton', 'private', 'editButton'),
// ];

const NavList = () => {

    const { labels, setLabels } = useContext(DataContext);

    const [count, setCount] = useState(0);

    useEffect(() => {
        notesService.getAllLabelsByUserId(localStorage.getItem('token'))
            .then((response) => {
                setLabels(response.data.data)
            })
        // console.log("Hi",notes);
    }, [count]);

    let initialValue = {
        labelName: ""
    }

    const [formValue, setForm] = useState(initialValue);

    const [labelName, setLabelName] = useState("");

    const [open, setOpen] = useState(false);

    const changeValue = (event) => {
        setForm({ ...formValue, [event.target.name]: event.target.value })
    }

    const changeValue1 = (e) => {
        setLabelName(e.target.value)
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const save = (event) => {
        event.preventDefault();
        if (labels.length < 4) {
            notesService.createLabel(formValue.labelName, localStorage.getItem('token'));
        } else {
            console.log("Cannot Create more labels please delete old ones");
        }
        setCount(count => count + 1)
    }

    const deleteLabel = (labelId) => {
        notesService.deleteLabelById(labelId);
        setCount(count => count + 1)
    }

    const editLabel = (labelId) => {
        if (labelName !== "") {
            notesService.editLabelById(labelId, labelName);
        } else {
            console.log("No Data Provided");
        }
        setLabelName("");
        setCount(count => count + 1)
    }

    const navList = [
        { id: 1, name: 'Notes', icon: <Lightbulb />, route: '' },
        { id: 2, name: 'Reminders', icon: <NotificationsNoneOutlinedIcon />, route: 'reminders' },
        // { id: 3, name: 'Edit Label', icon: <CreateOutlinedIcon />, route: 'labels' },
        // { id: 1, name: 'Archives', icon: <Archive />, route: 'archive' },
        // { id: 2, name: 'Trash', icon: <Delete />, route: 'delete' },
    ]
    const navList1 = labels;

    const navList2 = [
        // { id: 1, name: 'Notes', icon: <Lightbulb />, route: '' },
        // { id: 2, name: 'Reminders', icon: <NotificationsNoneOutlinedIcon />, route: 'reminder' },
        { id: 3, name: 'Edit Label', icon: <CreateOutlinedIcon /> },
        // { id: 1, name: 'Archives', icon: <Archive />, route: 'archive' },
        // { id: 2, name: 'Trash', icon: <Delete />, route: 'delete' },
    ]
    const navList3 = [
        // { id: 1, name: 'Notes', icon: <Lightbulb />, route: '' },
        // { id: 2, name: 'Reminders', icon: <NotificationsNoneOutlinedIcon />, route: 'reminder' },
        // { id: 3, name: 'Edit Label', icon: <CreateOutlinedIcon />, route: 'editlabel' },
        { id: 1, name: 'Archives', icon: <Archive />, route: 'archive' },
        { id: 2, name: 'Trash', icon: <Delete />, route: 'delete' },
    ]

    return (
        <Grid>
            <List>
                {
                    navList.map(list => (
                        <Link key={list.id} to={`${list.route}`} style={{ textDecoration: 'none', display: 'flex', color: 'inherit', borderRadius: '0 20px 0 20px' }}>
                            <ListItem button key={list.id}>
                                <ListItemIcon style={{ alignItems: 'center' }}>
                                    {list.icon}
                                </ListItemIcon>
                                <ListItemText primary={list.name} />
                            </ListItem>
                        </Link>
                    ))
                }
                {
                    labels.map(label => (
                        <Link key={label.labelId} to={`labels/${label.labelId}`} style={{ textDecoration: 'none', display: 'flex', color: 'inherit' }}>
                            <ListItem button key={label.labelId}>
                                <ListItemIcon style={{ alignItems: 'center' }}>
                                    <LabelOutlinedIcon />
                                </ListItemIcon>
                                <ListItemText primary={label.labelName} />
                            </ListItem>
                        </Link>
                    ))
                }
                {
                    navList2.map(list => (
                        <div key={list.id} style={{ textDecoration: 'none', display: 'flex', color: 'inherit' }}>
                            <ListItem button key={list.id} onClick={handleClickOpen}>
                                <ListItemIcon style={{ alignItems: 'center' }}>
                                    {list.icon}
                                </ListItemIcon>
                                <ListItemText primary={list.name} />
                            </ListItem>
                        </div>
                    ))
                }
                {<Dialog sx={{}} open={open} onClose={handleClose}>
                    <Grid>
                        <Container sx={{ width: '400px', height: '400px' }}>
                            <DialogTitle sx={{ fontWeight: 'medium' }}>Edit Labels</DialogTitle>
                            <DialogContent>
                                <form action="" onSubmit={save}>
                                    <FormGroup row>
                                        <IconButton sx={{ marginRight: '5px' }} aria-label="add-icon" size="small" disabled>
                                            <AddIcon fontSize="inherit" />
                                        </IconButton>
                                        <TextField
                                            sx={{ width: '70%' }}
                                            autoFocus
                                            name='labelName'
                                            id="labelName"
                                            value={formValue.labelName}
                                            onChange={changeValue}
                                            placeholder="Create New Label"
                                            type="text"
                                            variant="standard"
                                        />
                                        <IconButton sx={{ marginLeft: 'auto' }} aria-label="add-button" type='submit' size="small">
                                            <DoneOutlinedIcon fontSize="inherit" />
                                        </IconButton>
                                    </FormGroup>
                                </form>
                                <TableContainer>
                                    <Table>
                                        <TableBody>
                                            {labels.map((label) => (
                                                <TableRow
                                                    key={label.labelId}
                                                    sx={{ borderBottom: 'none' }}
                                                >
                                                    <TableCell key={label.id} sx={{ borderBottom: 'none' }}>
                                                        <IconButton sx={{ marginTop: '20px' }} aria-label="add-button" onClick={() => deleteLabel(label.labelId)} size="small">
                                                            <DeleteOutlineOutlinedIcon fontSize="inherit" />
                                                        </IconButton>
                                                    </TableCell>
                                                    <TableCell key={label.id} sx={{ borderBottom: 'none' }} component="th">
                                                        <TextField
                                                            sx={{ width: '100%' }}
                                                            autoFocus
                                                            id="labelName"
                                                            defaultValue={label.labelName}
                                                            onChange={(e) => changeValue1(e)}
                                                            type="text"
                                                            variant="standard"
                                                        />
                                                    </TableCell>
                                                    <TableCell key={label.id} sx={{ borderBottom: 'none' }}>
                                                        <IconButton sx={{ marginTop: '20px' }} aria-label="add-button" onClick={() => editLabel(label.labelId)} size="small">
                                                            <DoneOutlinedIcon fontSize="inherit" />
                                                        </IconButton>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </DialogContent>
                            <DialogActions>
                            </DialogActions>
                        </Container>
                        <Divider />
                        <div style={{ padding: '20px', marginLeft: 'auto' }}>
                            <Button sx={{ color: 'black', fontWeight: 'bold' }} variant="text" onClick={handleClose}>Done</Button>
                        </div>
                    </Grid>
                </Dialog>
                }
                {
                    navList3.map(list => (
                        <Link key={list.id} to={`${list.route}`} style={{ textDecoration: 'none', display: 'flex', color: 'inherit' }}>
                            <ListItem button key={list.id}>
                                <ListItemIcon style={{ alignItems: 'center' }}>
                                    {list.icon}
                                </ListItemIcon>
                                <ListItemText primary={list.name} />
                            </ListItem>
                        </Link>
                    ))
                }
            </List>
        </Grid>
    )
}

export default NavList;