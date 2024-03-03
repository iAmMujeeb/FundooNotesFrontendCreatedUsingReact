import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

//components
import Home from './components/Home';
import DataProvider from './context/DataProvider';
import SignUp from './components/sign-up/sign-up'
import VerifyUser from './components/verify-user/verify-user';
import SignIn from './components/sign-in/sign-in';
import { Grid } from '@mui/material';
import HeaderBar from './components/HeaderBar';

function App() {
  return (
    <Grid>
      <DataProvider>
        <Router>
          <Routes>
            <Route path='*' element={<SignUp />} />
            <Route path='/' element={<SignUp />} />
            <Route path='/signup' element={<SignUp />} />
            <Route path='/verifyuser' element={<VerifyUser />} />
            <Route path='/signin' element={<SignIn />} />
            <Route path='/header' element={<HeaderBar />} />
            <Route path='/home/*' element={<Home />} />
          </Routes>
        </Router>
      </DataProvider>
    </Grid>
  );
}

export default App;
