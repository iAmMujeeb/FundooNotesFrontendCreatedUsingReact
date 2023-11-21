import { createContext, useState, useEffect } from 'react';
import notesService from '../service/notes-service';

export const DataContext = createContext(null);

const DataProvider = ({ children }) => {


    const [notes, setNotes] = useState([]);

    useEffect(() => {
        notesService.getAllNotesByUserId(localStorage.getItem('token'))
            .then((response) => {
                setNotes(response.data.data)
            })
        // console.log("Hi",notes);
    }, []);

    const [archiveNotes, setArchiveNotes] = useState([]);

    useEffect(() => {
        notesService.getAllArchiveNotesByUserId(localStorage.getItem('token'))
            .then((response) => {
                setArchiveNotes(
                    response.data.data
                );
            })
    }, []);

    const [deleteNotes, setDeleteNotes] = useState([]);

    useEffect(() => {
        notesService.getAllTrashNotesByUserId(localStorage.getItem('token'))
            .then((response) => {
                setDeleteNotes(
                    response.data.data
                );
            })
        // console.log(deleteNotes);
    }, []);

    const [reminderNotes, setReminderNotes] = useState([]);

    useEffect(() => {
        notesService.getAllReminderNotesByUserId(localStorage.getItem('token'))
            .then((response) => {
                setReminderNotes(
                    response.data.data
                );
            })
        // console.log(deleteNotes);
    }, []);

    const [labels, setLabels] = useState([]);

    useEffect(() => {
        notesService.getAllLabelsByUserId(localStorage.getItem('token'))
            .then((response) => {
                setLabels(response.data.data)
            })
        // console.log("Hi",notes);
    }, []);

    return (
        <DataContext.Provider value={{
            notes,
            setNotes,
            archiveNotes,
            setArchiveNotes,
            deleteNotes,
            setDeleteNotes,
            reminderNotes,
            setReminderNotes,
            labels,
            setLabels
        }}
        >
            {children}
        </DataContext.Provider>
    )
}

export default DataProvider;