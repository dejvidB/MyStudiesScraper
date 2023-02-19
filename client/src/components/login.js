import React, { Component } from 'react';
import { TextField, Grid, Button, FormControl, InputLabel, Input, InputAdornment, IconButton, CircularProgress, Typography } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { withRouter } from 'react-router-dom';

import Login from "./images/login.png";
import Login2 from "./images/login2.png";
import Github from "./images/GitHub.png";

const Alert = props => <MuiAlert elevation={6} variant="filled" {...props} />;

const theme = theme => createMuiTheme({
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
                    this.props.setDeclarationsState(res.declarations_open);
                    this.setState(state => ({ ...state, "success": true, "failure": false }));
                    this.props.history.push({
                        pathname: '/home'
                    });
                } else {
                    this.setState(state => ({ ...state, "success": false, "failure": true }));
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
                    style={{ marginTop: '30px' }}
                >
                    <Grid item xs={10} sm={10} md={8}>
                        <form noValidate onSubmit={this.handleSubmit}>
                            <TextField label="Όνομα Χρήστη" name="username" value={this.state.username} onChange={this.handleChange} fullWidth autoFocus autoComplete="off" />
                            <FormControl fullWidth>
                                <InputLabel htmlFor="password">Κωδικός</InputLabel>
                                <Input
                                    id="password"
                                    type={this.state.showPassword ? 'text' : 'password'}
                                    value={this.state.password}
                                    onChange={this.handleChange}
                                    name="password"
                                    autoComplete="off"
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
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
                        <br />
                        <Typography>Προσωρινά εκτός λειτουργίας λόγω reCAPTCHA. Για προεπισκόπηση των λειτουργιών της εφαρμογής συνδεθείτε με όνομα χρήστη: <b>preview</b></Typography>
                    </Grid>
                    <Grid item style={{ marginTop: "25px" }} xs={10} sm={8} md={8} lg={4}>
                        <Typography variant="h5">Πώς δουλεύει;</Typography>
                        <Typography>① Πληκτρολογείτε τα στοιχεία σύνδεσής σας παραπάνω και πατάτε "ΣΥΝΔΕΣΗ" 👆</Typography>
                        <img src={Login} alt="MyStudiesScraper login form" style={{ border: "1px solid red", maxWidth: "100%", height: "auto" }} />
                        <Typography>② Το My Studies Scraper χρησιμοποιεί αυτά τα στοιχεία για να συνδεθεί στο my-studies, όπως θα έκανε ένας κανονικός χρήστης.</Typography>
                        <img src={Login2} alt="my-studies.uoa.gr login form" style={{ border: "1px solid red", maxWidth: "100%", height: "auto" }} />
                        <Typography>③ Συλλέγει τις εξής πληροφορίες:</Typography>
                        <ul>
                            <li>Τα μαθήματα του προγράμματος σπουδών</li>
                            <li>Το ιστορικό των δηλώσεων μαθημάτων</li>
                            <li>Το ιστορικό βαθμολογίας</li>
                            <li>Τις πληροφορίες του χρήστη όπως αυτές φαίνονται στην καρτέλα "Προφίλ-{'>'}Γενικές Πληροφορίες"</li>
                        </ul>
                        <Typography>④ Αποσυνδέεται από το my-studies</Typography>
                        <Typography>⑤ Εμφανίζει τις πληροφορίες που συνέλεξε</Typography>
                        <Typography style={{ fontWeight: "600" }}>Καμία πληροφορία του χρήστη δεν αποθηκεύται. Όλα τα δεδομένα ανήκουν και παραμένουν στο my-studies.uoa.gr</Typography>
                        <br/>
                        <Typography style={{ fontWeight: "700", textAlign: "center" }}>Η ιστοσελίδα ΔΕΝ αποτελεί επίσημη ιστοσελίδα του πανεπιστημίου.</Typography>
                        <Typography style={{ textAlign: "center" }}> <img src={Github}/> <a style={{ color: "white" }} href="https://github.com/dejvidB/MyStudiesScraper" target="_blank">GitHub repository</a></Typography>
                        <Typography style={{ textAlign: "center" }}>This website is created by: <a style={{ color: "white" }} href="https://github.com/dejvidB" target="_blank">dejvidB</a></Typography>
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
