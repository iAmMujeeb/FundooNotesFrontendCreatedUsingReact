import * as React from 'react';
import { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import userService from '../../service/user-service';


const defaultTheme = createTheme();

const SignUp = () => {

    let initialValue = {
        fName: '',
        lName: '',
        // dob:'',
        password: '',
        emailId: '',
    }

    const [formValue, setForm] = useState(initialValue);

    const changeValue = (event) => {
        setForm({ ...formValue, [event.target.name]: event.target.value })
    }

    const save = (event) => {

        event.preventDefault();

        let object = {
            fName: formValue.fName,
            lName: formValue.lName,
            password: formValue.password,
            emailId: formValue.emailId,
        }

        console.log(formValue);

        userService.createUserData(object)
            .then((response) => {
                console.log(response.data.data);
                alert("Data added successfully!");
            }).catch((error) => {
                alert("User Already Present");
            }
            )

    };


    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign up
                    </Typography>
                    <Box component="form" action='#' noValidate onSubmit={save} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    value={formValue.fName} onChange={changeValue}
                                    autoComplete="given-name"
                                    name="fName"
                                    required
                                    fullWidth
                                    id="fName"
                                    label="First Name"
                                    autoFocus
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    value={formValue.lName} onChange={changeValue}
                                    required
                                    fullWidth
                                    id="lName"
                                    label="Last Name"
                                    name="lName"
                                    autoComplete="family-name"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    value={formValue.emailId} onChange={changeValue}
                                    required
                                    fullWidth
                                    id="emailId"
                                    label="Email Address"
                                    name="emailId"
                                    autoComplete="email"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    value={formValue.password} onChange={changeValue}
                                    // {(props.obj).map(() => obj.name)}
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="new-password"
                                />
                            </Grid>
                            {/* <Grid item xs={12} sx={{marginLeft:'16%'}}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer components={['DatePicker']}>
                                        <DatePicker name='startDate' id='name'
                                            label="Controlled picker"
                                            value={formValue.startDate}
                                            onChange={(newValue) => setForm({ ...formValue, startDate: newValue })}
                                        />
                                    </DemoContainer>
                                </LocalizationProvider>
                            </Grid> */}
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Sign Up
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="/signin" variant="body2">
                                    Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    )
}

export default SignUp