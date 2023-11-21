import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Box } from '@mui/material';

//components
import SwipeDrawer from './SwipeDrawer';
import Notes from './notes/Notes';
import Archives from './archives/Archives';
import DeleteNotes from './delete/DeleteNotes';
import Labels from './labels/labels';
import Reminder from './reminder/reminder';
import SignUp from './sign-up/sign-up'
import VerifyUser from './verify-user/verify-user';
import SignIn from './sign-in/sign-in';

const Home1 = () => {
    return (
        <Box style={{ display: 'flex', width: '100%' }}>
            <SwipeDrawer />
            <Notes />
        </Box>
    )
}

export default Home1;