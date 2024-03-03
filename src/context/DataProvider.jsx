import { createContext, useState, useEffect } from 'react';
import notesService from '../service/notes-service';
import reminderService from '../service/reminder-service';
import userService from '../service/user-service';

export const DataContext = createContext(null);

const DataProvider = ({ children }) => {

    const [count, setCount] = useState([0]);
    const [notes, setNotes] = useState([]);
    const [notes1, setNotes1] = useState([]);
    const [user, setUser] = useState([]);

    useEffect(() => {
        notesService.getAllNotesByUserId(localStorage.getItem('token'))
            .then((response) => {
                setNotes(response.data.data)
                setNotes1(response.data.data)
            })
        userService.getUserDataById(localStorage.getItem('token'))
            .then((response) => {
                setUser(response.data.data);
            })
    }, [count]);

    const [archiveNotes, setArchiveNotes] = useState([]);

    useEffect(() => {
        notesService.getAllArchiveNotesByUserId(localStorage.getItem('token'))
            .then((response) => {
                setArchiveNotes(
                    response.data.data
                );
            })
    }, [count]);

    const [deleteNotes, setDeleteNotes] = useState([]);

    useEffect(() => {
        notesService.getAllTrashNotesByUserId(localStorage.getItem('token'))
            .then((response) => {
                setDeleteNotes(
                    response.data.data
                );
            })
        // console.log(deleteNotes);
    }, [count]);

    const [reminderNotes, setReminderNotes] = useState([]);

    useEffect(() => {
        reminderService.getAllReminder()
            .then((response) => {
                setReminderNotes(response.data.data);
            })
    }, [count]);

    const [labels, setLabels] = useState([]);

    useEffect(() => {
        notesService.getAllLabelsByUserId(localStorage.getItem('token'))
            .then((response) => {
                setLabels(response.data.data)
            })
        // console.log("Hi",notes);
    }, [count]);

    const [showLabelName, setShowLabelName] = useState([]);

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
            setLabels,
            count,
            setCount,
            showLabelName,
            setShowLabelName,
            user,
            setUser,
            notes1,
            setNotes1
        }}
        >
            {children}
        </DataContext.Provider>
    )
}

export default DataProvider;