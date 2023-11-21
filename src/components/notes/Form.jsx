import { useState, useRef } from 'react';

import { Box, TextField, ClickAwayListener, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import Button from '@mui/material/Button';
import { ArchiveOutlined } from '@mui/icons-material'
import notesService from '../../service/notes-service';
import { useContext } from 'react';
import { useEffect } from 'react';
import { DataContext } from '../../context/DataProvider';

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

const Container = styled(Box)`
    display: flex;
    flex-direction: column;
    margin: auto;
    box-shadow: 0 1px 2px 0 rgb(60 64 67 / 30%), 0 2px 6px 2px rgb(60 64 67 / 15%);
    border-color: #e0e0e0;
    width: 600px;
    border-radius: 8px;
    min-height: 30px;
    padding: 10px 15px;
`

// let formData = new FormData();

const Form = () => {

    const { setNotes } = useContext(DataContext);

    const [count, setCount] = useState(0);

    useEffect(() => {
        notesService.getAllNotesByUserId(localStorage.getItem('token'))
            .then((response) => {
                setNotes(response.data.data)
            }).catch((e) => {
                console.log(e);
            })
    }, [count]);

    let initialValue = {
        title: '',
        note: '',
        isArchive: false,
        isTrash: false,
    }

    const [formValue, setForm] = useState(initialValue);
    const [image, setImage] = useState(null);

    const [showTextField, setShowTextField] = useState(false);

    const containerRef = useRef();

    const changeValue = (event) => {
        setForm({ ...formValue, [event.target.name]: event.target.value })
    }



    const handleClickAway = (event) => {
        setShowTextField(false);
        containerRef.current.style.minheight = '30px'

        if (formValue.title || formValue.title) {
            save(event);
            setForm(initialValue);
            // window.location.reload();
            console.log(localStorage.getItem('token'));
            setCount(count => count + 1);
        }

    }

    // const imageUpload = () => {
    //     console.log(image);
    //     notesService.uploadImage(image);
    // }

    const changeImageValue = (event) => {
        console.log(event);
        let file = event.target.files[0];
        console.log(file);
        const imageData = new FormData();
        imageData.append('image', file);
        console.log(imageData);
        setImage(imageData);
        console.log(image);
    }

    // const reset = () => {
    //     setForm({ ...initialValue });
    //     console.log(formValue);
    // }

    const save = (event) => {
        event.preventDefault();
        let object = {
            title: formValue.title,
            note: formValue.note,
            isArchive: formValue.isArchive,
            isTrash: formValue.isTrash,
        }
        notesService.createNotesData(object, localStorage.getItem('token'), image)
            .then((response) => {
                alert("Data added successfully!", response);
            }).catch((error) => {
                console.log("Data not added!", error);
            })
    }

    const setArchive = () => {
        formValue.isArchive = true;
    }

    const onTextAreaClick = () => {
        setShowTextField(true);
        containerRef.current.style.minheight = '70px'
    }

    return (
        <ClickAwayListener onClickAway={handleClickAway}>
            <Container ref={containerRef}>
                {showTextField &&
                    <TextField
                        value={formValue.title}
                        placeholder="Title"
                        variant="standard"
                        InputProps={{ disableUnderline: true }}
                        style={{ marginBottom: 10 }}
                        onChange={(e) => changeValue(e)}
                        name='title'
                    />
                }
                <TextField
                    value={formValue.note}
                    placeholder="Take a note..."
                    multiline
                    maxRows={Infinity}
                    variant="standard"
                    InputProps={{ disableUnderline: true }}
                    onClick={onTextAreaClick}
                    onChange={(e) => changeValue(e)}
                    name='note'
                    id='note'
                />
                {showTextField && <div>
                    <IconButton component="label" sx={{ marginRight: 'auto' }} aria-label="delete">
                        <AddAPhotoIcon />
                        <VisuallyHiddenInput name='image' id='image' type="file" onChange={(e) => changeImageValue(e)} />
                    </IconButton>
                    <IconButton name='isArchive' id='isArchive' value={formValue.isArchive} onClick={setArchive} component="label" sx={{ marginRight: 'auto' }} aria-label="delete">
                        <ArchiveOutlined />
                    </IconButton>
                    <Button sx={{ color: 'black', marginLeft: '75%' }} onClick={handleClickAway} size="small">
                        close
                    </Button>
                </div>
                }
            </Container>
        </ClickAwayListener>
    )
}

export default Form;