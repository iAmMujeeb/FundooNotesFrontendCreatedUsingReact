
import { Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';

//components
import SwipeDrawer from './SwipeDrawer';
import Notes from './notes/Notes';
import Archives from './archives/Archives';
import DeleteNotes from './delete/DeleteNotes';
import Labels from './labels/labels';
import Reminder from './reminder/reminder';

const Home = () => {
    return (
        <Box style={{ display: 'flex', width: '100%' }}>
                <SwipeDrawer />
                <Routes>
                    <Route path='/' element={<Notes />} />
                    <Route path='/archive' element={<Archives />} />
                    <Route path='/delete' element={<DeleteNotes />} />
                    <Route path='/reminder' element={<Reminder />} />
                    <Route path='/labels' element={<Labels />} />
                </Routes>
        </Box>
    )
}

export default Home;