import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

//components
import Home from './components/Home';
import DataProvider from './context/DataProvider';
import SwipeDrawer from './components/SwipeDrawer';
import Notes from './components/notes/Notes';
import Archives from './components/archives/Archives';
import DeleteNotes from './components/delete/DeleteNotes';
import Labels from './components/labels/labels';
import Reminder from './components/reminder/reminder';
import SignUp from './components/sign-up/sign-up'
import VerifyUser from './components/verify-user/verify-user';
import SignIn from './components/sign-in/sign-in';

function App() {
  return (
    <DataProvider>
    <Router>
      <Routes>
        <Route path='/' element={<SignUp />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/verifyuser' element={<VerifyUser />} />
        <Route path='/signin' element={<SignIn />} />
        {/* <Route path='/dashboard/*' element={<Dashboard />} /> */}
        <Route path='/home/*' element={<Home />} />
        {/* <Route path='/notes' element={<Notes />} />
        <Route path='/archive' element={<Archives />} />
        <Route path='/delete' element={<DeleteNotes />} />
        <Route path='/reminder' element={<Reminder />} />
        <Route path='/label' element={<Labels />} /> */}
      </Routes>
    </Router>
    </DataProvider>
  );
}

export default App;
