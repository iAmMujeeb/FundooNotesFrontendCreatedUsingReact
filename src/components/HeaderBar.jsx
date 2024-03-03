import { AppBar, Toolbar, Typography, IconButton, Grid, Menu, MenuItem, ListItemIcon, ClickAwayListener } from '@mui/material';
import { styled } from '@mui/material/styles';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuIcon from '@mui/icons-material/Menu';
import { useEffect, useState } from 'react';
import { DataContext } from '../context/DataProvider';
import { useContext } from 'react';
import { Logout } from '@mui/icons-material';
import ReplayIcon from '@mui/icons-material/Replay';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';

const Header = styled(AppBar)`
  z-index: 1201;
  background: #fff;
  height: 70px;
  box-shadow: inset 0 -1px 0 0 #dadce0;
`

const Heading = styled(Typography)`
  color: #5F6368;
  font-size: 24px;
  margin-left: 25px;
`

const HeaderBar = ({ open, handleDrawer }) => {

  const { notes, setNotes } = useContext(DataContext);
  const [search, setSearch] = useState('');
  const { notes1 } = useContext(DataContext);
  const { user } = useContext(DataContext);
  const logo = 'https://seeklogo.com/images/G/google-keep-logo-0BC92EBBBD-seeklogo.com.png';
  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);
  const [isSearch, setIsSearch] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    setIsSearch(isSearch => isSearch = false);
    if (notes !== notes1) { setNotes(notes1); }
    setSearch('');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const signOut = () => {
    console.log(localStorage.getItem('token'));
    localStorage.removeItem('token');
    alert("Sign Out Successful");
    window.location = 'signin';
  }

  const reload = () => {
    window.location.reload();
  }

  const handleChange = (e) => {
    if (!e.target.value) {
      setNotes(notes1);
      setSearch(e.target.value);
    } else {
      setNotes(notes1.filter((note) => note.title.toLowerCase().includes(e.target.value)));
      setSearch(e.target.value);
    }
  }

  const handleClickAway = () => {
    console.log("clicked Away");
    setCount(count => ++count);
  }

  return (
    <Grid>
      <Header open={open}>
        <Toolbar>
          <IconButton
            onClick={() => handleDrawer()}
            sx={{ marginRight: '20px' }}
            edge="start"
          >
            <MenuIcon />
          </IconButton>
          <img src={logo} alt="logo" style={{ width: 30 }} />
          <Heading>Keep</Heading>
          <ClickAwayListener onClickAway={handleClickAway}>
            <Grid sx={{ marginLeft: '10%', width: '45%' }} onClick={() => setIsSearch(true)}>
              <Paper component='form'
                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' }}
              >
                <Grid>
                  <IconButton sx={{ p: '10px' }} aria-label="menu" disabled>
                    <SearchIcon />
                  </IconButton>
                </Grid>
                <Grid>
                  <InputBase
                    sx={{ ml: 1, flex: 1 }}
                    placeholder="Search notes by title..."
                    onChange={(e) => handleChange(e)}
                    value={search}
                  />
                </Grid>
                <Grid sx={{ marginLeft: 'auto' }}>
                  {isSearch &&
                    <IconButton sx={{ p: '10px' }} onClick={handleClickAway}>
                      <CloseIcon />
                    </IconButton>
                  }
                </Grid>
              </Paper>
            </Grid>
          </ClickAwayListener>
          <IconButton onClick={(reload)} style={{ marginLeft: 'auto' }} size="large">
            <ReplayIcon fontSize="inherit" />
          </IconButton>
          <IconButton onClick={(handleClick)} size="large">
            <AccountCircleIcon fontSize="inherit" />
          </IconButton>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={openMenu}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <div style={{ fontSize: '90%', padding: '10px 20px 20px 20px' }}>
              {user.emailId}
            </div>
            <MenuItem onClick={signOut}>
              <div style={{ marginLeft: 'auto', marginRight: 'auto', fontSize: '90%' }}>
                <ListItemIcon>
                  <Logout fontSize="inherit" />
                </ListItemIcon>
                <span>
                  Sign out
                </span>
              </div>
            </MenuItem>
          </Menu>
        </Toolbar>
      </Header>
    </Grid>
  )
}

export default HeaderBar;