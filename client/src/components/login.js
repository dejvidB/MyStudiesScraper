import React, { Component } from 'react';
import { TextField, Grid, Button, FormControl, InputLabel, Input, InputAdornment, IconButton, CircularProgress } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { withRouter } from 'react-router-dom';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const theme = (theme) => createMuiTheme({
    overrides: {
        MuiButton: {
            root: {
                marginTop: "10px"
            }
        },
        MuiTextField: {
            root: {
                paddingBottom: "10px"
            }
        }
    }
}, theme);

export default withRouter(class LoginComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            showPassword: false,
            loading: false,
            success: false,
            failure: false
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState(state => ({ ...state, loading: true }));
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ "username": this.state.username, "password": this.state.password })
        };
        fetch('/api/login', requestOptions)
            .then(response => response.json())
            .then(res => {
                this.setState(state => ({ ...state, loading: false }));
                if (res.status === "success") {
                    this.props.setUserInfo(res.user_info);
                    this.props.setTerms(res.terms);
                    this.props.setCategories(res.data);
                    this.props.setLessons(res.lessons);
                    this.props.setGrades(res.grades);
                    this.props.setDeclarations(res.declarations);
                    this.props.setDeclarationsState(true);
                    this.setState(state => ({ ...state, "success": true, "failure": false }));
                    this.props.history.push({
                        pathname: '/home'
                    });
                } else {
                    this.setState(state => ({ ...state, "success)": false, "failure": true }));
                }
            });
    }

    handleChange = (e) => {
        this.setState(state => ({ ...state, [e.target.name]: e.target.value }));
    }

    handleClickShowPassword = () => {
        this.setState(state => ({ ...state, showPassword: !state.showPassword }));
    };

    handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    handleClose = () => {
        this.setState(state => ({ ...state, "success": false, "failure": false }));
    };

    render() {
        return (
            <ThemeProvider theme={theme(this.props.theme)}>
                <Grid
                    container
                    direction="column"
                    alignItems="center"
                    style={{ marginTop: '50px' }}
                >
                    <Grid item xs={10} sm={12} md={6}>
                        <form noValidate onSubmit={this.handleSubmit}>
                            <TextField label="Όνομα Χρήστη" name="username" value={this.state.username} onChange={this.handleChange} fullWidth autoFocus />
                            <FormControl fullWidth>
                                <InputLabel htmlFor="password">Κωδικός</InputLabel>
                                <Input
                                    id="password"
                                    type={this.state.showPassword ? 'text' : 'password'}
                                    value={this.state.password}
                                    onChange={this.handleChange}
                                    name="password"
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={this.handleClickShowPassword}
                                                onMouseDown={this.handleMouseDownPassword}
                                            >
                                                {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                            </FormControl>

                            <Button variant="contained" color="primary" fullWidth type="submit">
                                Συνδεση
                                {this.state.loading &&
                                    <InputAdornment position="end">
                                        <CircularProgress color="secondary" size={25} />
                                    </InputAdornment>
                                }
                            </Button>
                        </form>
                    </Grid>
                </Grid>
                <Snackbar open={this.state.success || this.state.failure} autoHideDuration={6000} onClose={this.handleClose}>
                    <Alert onClose={this.handleClose} severity={this.state.success ? "success" : "error"}>
                        {this.state.success ? "Επιτυχία Σύνδεσης" : "Λάθος όνομα χρήστη ή κωδικός"}
                    </Alert>
                </Snackbar>
            </ThemeProvider>);
    };
});
