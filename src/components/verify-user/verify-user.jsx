import * as React from 'react';
import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
// import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
// import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
// import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import userService from '../../service/user-service';


const defaultTheme = createTheme();

const VerifyUser = () => {

    let initialValue = {
        emailId: '',
        otp: '',
    }

    const [formValue, setForm] = useState(initialValue);

    const changeValue = (event) => {
        setForm({ ...formValue, [event.target.name]: event.target.value })
    }

    const verify = (event) => {

        let object = {
            emailId: formValue.emailId,
            otp: formValue.otp,
        }

        console.log(formValue);

        userService.verifyUserData(object.emailId, object.otp)
            .then((response) => {
                console.log(response.data.data);
            })
        alert("User Verified Successfully!");
    }


    return (
        <Grid>
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
                            Verify User
                        </Typography>
                        <Box component="form" action='signin' noValidate onSubmit={verify} sx={{ mt: 3 }}>
                            <Grid container spacing={2}>
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
                                        name="otp"
                                        label="OTP"
                                        type="number"
                                        id="otp"
                                        autoComplete="new-otp"
                                    />
                                </Grid>
                            </Grid>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2 }}
                            >
                                Verify User
                            </Button>
                            <Grid container justifyContent="flex-end">
                                <Grid item>
                                    <Link href="signin" variant="body2">
                                        Already have an account? Sign in
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>
                </Container>
            </ThemeProvider>
        </Grid>
    )
}

export default VerifyUser