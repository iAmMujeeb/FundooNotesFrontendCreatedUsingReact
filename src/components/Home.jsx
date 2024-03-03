
import { Grid } from '@mui/material';
import { Route, Routes } from 'react-router-dom';

//components
import SwipeDrawer from './SwipeDrawer';
import Archives from './archives/Archives';
import DeleteNotes from './delete/DeleteNotes';
import Labels from './labels/labels';
import Notes from './notes/Notes';
import Reminder from './reminder/reminder';
import Reminders from './reminder/reminders';

const Home = () => {
    return (
        <Grid>
            {(localStorage.getItem('token') !== null) ?
                <Grid style={{ display: 'flex', width: '100%' }}>
                    <SwipeDrawer />
                    <Routes>
                        <Route path='/' element={<Notes />} />
                        <Route path='/archive' element={<Archives />} />
                        <Route path='/delete' element={<DeleteNotes />} />
                        <Route path='/reminder' element={<Reminder />} />
                        <Route path='/reminders' element={<Reminders />} />
                        <Route path='/labels/:id' element={<Labels />} />
                    </Routes>
                </Grid>
                :
                <div style={{ textAlign: 'center' }}>
                    Please Sign In First, <span></span>
                    <a href="/signin">Sign in</a>
                </div>
            }
        </Grid>
    )
}

export default Home;