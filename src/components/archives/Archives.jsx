import { useContext } from 'react';

import { Grid } from '@mui/material';
import { styled } from '@mui/material/styles';

import { DataContext } from '../../context/DataProvider';

//components
import Archive from './Archive';
import Form from '../notes/Form';
import EmptyNotes from '../notes/EmptyNotes';

const DrawerHeader = styled('div')(({ theme }) => ({
    ...theme.mixins.toolbar,
}));

const Archives = () => {

    const { archiveNotes } = useContext(DataContext);

    return (
        <Grid sx={{ display: 'flex', width: '100%' }}>
            {(localStorage.getItem('token') !== null) ?
                <Grid sx={{ display: 'flex', width: '100%' }}>
                    <Grid sx={{ p: 3, width: '100%' }}>
                        <DrawerHeader />
                        <Form />
                        {archiveNotes.length > 0 ?
                            <Grid container>
                                {
                                    archiveNotes.map(archive => (
                                        <Grid key={archive.notesId} item>
                                            <Archive archive={archive} />
                                        </Grid>
                                    ))
                                }
                            </Grid>
                            : <EmptyNotes />
                        }
                    </Grid>
                </Grid>
                :
                <div style={{ textAlign: 'center' }}>
                    Please Sign In First, <span></span>
                    <a href="signin">Sign in</a>
                </div>
            }
        </Grid>
    )
}

export default Archives;