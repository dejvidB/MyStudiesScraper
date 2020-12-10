import React, { Component } from 'react';

import {
    Typography, Grid, Card, CardContent, Container, FormGroup, FormControlLabel, Switch, Checkbox, FormControl,
    Button, Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText, ListItem, List, ListItemText,
    TextField, InputLabel, Input, InputAdornment, IconButton, CircularProgress, Snackbar
} from '@material-ui/core';
import { green, red } from '@material-ui/core/colors';

import { Done, WarningRounded, CalendarTodayRounded, ExpandMore, ChevronRight, Send, Warning, Visibility, VisibilityOff } from '@material-ui/icons';
import { TreeView, TreeItem, Alert } from '@material-ui/lab';

let default_expanded = [];
let grades_array = [];
let terms_array = [], i = 0;

export default class HomeComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showGrades: false,
            expanded: [],
            selected: this.props.lessons.filter(les => les.selected).map(les => { return les.lescode }),
            show_confirmation: false,
            username: "",
            password: "",
            showPassword: false,
            declaration_res: "",
            loading: false
        }
    }

    handleUsernameChange = (e) => {
        this.setState(state => ({ ...state, username: e.target.value }));
    }

    handlePasswordChange = (e) => {
        this.setState(state => ({ ...state, password: e.target.value }));
    }

    handleClickShowPassword = () => {
        this.setState(state => ({ ...state, showPassword: !state.showPassword }));
    };

    handleMouseDownPassword = (e) => {
        e.preventDefault();
    };

    handleDeclarationSubmit = (e) => {
        e.preventDefault();
        this.setState(state => ({ ...state, loading: true }));
        let lessons = [];
        for (let i = 0; i < this.props.lessons.length; i++) {
            if (this.state.selected.indexOf(this.props.lessons[i].lescode) !== -1) {
                lessons.push({ "mcocode": this.props.lessons[i].mcocode, "lescode": this.props.lessons[i].lescode, "id": i });
            }
        }
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "username": this.state.username,
                "password": this.state.password,
                lessons
            })
        };
        fetch('/api/declare', requestOptions)
            .then(response => response.json())
            .then(res => {
                this.setState(state => ({
                    ...state,
                    declaration_res: res.status,
                    loading: false
                }));
                if (res.state === "success")
                    this.props.setLessons(res.lessons);
            });
    }

    handleNodeClick = (e, nodeId) => {
        e.preventDefault();
        if (this.state.expanded.indexOf(nodeId) === -1) {
            this.setState(state => ({ ...state, expanded: state.expanded.concat(nodeId) }));
        } else {
            this.setState(state => ({ ...state, expanded: state.expanded.filter(a => a !== nodeId) }));
        }
    };

    handleToggle = () => {
        this.setState(state => ({ ...state, showGrades: !state.showGrades }), () => {
            if (this.state.showGrades) {
                this.setState(state => ({ ...state, expanded: default_expanded }));
            } else {
                this.setState(state => ({ ...state, expanded: [] }));
            }
        });
    };

    handleLessCheck = (e, les) => {
        e.stopPropagation();
        if (e.target.checked)
            this.setState(state => ({ ...state, selected: [...state.selected, les.lescode] }));
        else
            this.setState(state => ({ ...state, selected: state.selected.filter(lescode => lescode !== les.lescode) }));
    }

    handleClose = () => {
        this.setState(state => ({ ...state, show_confirmation: false, username: "", password: "" }));
    }

    handleCloseAlert = () => {
        this.setState(state => ({ ...state, declaration_res: "" }));
    }

    show_confirmation = () => {
        this.setState(state => ({ ...state, show_confirmation: true }));
    }

    render() {
        let lessons = this.props.lessons, categories = this.props.categories;
        while (++i <= this.props.user_info.terms) terms_array.push(i);

        return (
            <Container maxWidth="lg" style={{ marginTop: "25px" }}>
                <FormGroup style={{ float: "right" }}>
                    <FormControlLabel
                        control={<Switch checked={this.state.showGrades} onChange={this.handleToggle} />}
                        label="Εμφάνιση Βαθμών"
                    />
                </FormGroup>
                <Grid container spacing={4}
                    direction="row">
                    {terms_array.map(term => {
                        let perasmena = 0;
                        let xrwstoumena = 0;

                        let categories_array = {};
                        lessons.filter(les => les.termin === term).map(les => {
                            let cat = categories[Object.keys(categories)[categories["MCOID_" + les.mcocode].parent]].caption;
                            if (!categories_array[cat])
                                categories_array[cat] = {};
                            if (!categories_array[cat][les.typedescr])
                                categories_array[cat][les.typedescr] = [];
                            categories_array[cat][les.typedescr].push(les);
                            if (les.gradedescr) {
                                grades_array.push({ "name": les.descr, "grade": les.gradedescr.replace(/[^,0-9]/g, "").replace(",", "."), "ects": 1, "lescode": les.lescode, "selected": les.passed });
                                if (parseFloat(les.gradedescr.replace(/[^,0-9]/g, "").replace(",", ".")) >= 5 || les.passed)
                                    perasmena++;
                                else
                                    xrwstoumena++;
                                if (default_expanded.indexOf(term + "/" + cat) === -1)
                                    default_expanded.push(term + "/" + cat);
                                if (default_expanded.indexOf(term + "/" + cat + "/" + les.typedescr) === -1)
                                    default_expanded.push(term + "/" + cat + "/" + les.typedescr);
                            }
                        });
                        return (
                            <Grid item key={"TERMIN_" + term} xs={12} sm={6} md={3}>
                                <Card raised style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'column', height: "100%" }}>
                                    <CardContent>
                                        <Typography variant="h5" component="h2" style={{ marginBottom: "10px", display: 'flex', alignItems: 'center' }}>
                                            {term === this.props.user_info.user_info.semester && <CalendarTodayRounded />}
                                            <span style={{ marginLeft: "5px" }}>{term + "ο εξάμηνο"}</span>
                                        </Typography>
                                        {perasmena > 0 &&
                                            <Typography color="textSecondary" gutterBottom style={{
                                                display: 'flex',
                                                alignItems: 'center'
                                            }}>
                                                <Done style={{ color: green[500] }} /> {perasmena} περασμένα
                                            </Typography>
                                        }
                                        {xrwstoumena > 0 &&
                                            <Typography color="textSecondary" gutterBottom style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                marginBottom: "15px"
                                            }}>
                                                <WarningRounded style={{ color: red[500] }} /> {xrwstoumena} χρωστούμενα
                                            </Typography>
                                        }
                                        <TreeView
                                            defaultCollapseIcon={<ExpandMore />}
                                            defaultExpandIcon={<ChevronRight />}
                                            expanded={this.state.expanded}
                                        >
                                            {Object.keys(categories_array).map(cat => {
                                                return (
                                                    <TreeItem key={term + "/" + cat} nodeId={term + "/" + cat} label={cat} onClick={(e) => this.handleNodeClick(e, term + "/" + cat)}>
                                                        {Object.keys(categories_array[cat]).map(sub => {
                                                            return (
                                                                <TreeItem key={term + "/" + cat + "/" + sub} nodeId={term + "/" + cat + "/" + sub} label={categories_array[cat][sub].length + " " + sub} onClick={(e) => this.handleNodeClick(e, term + "/" + cat + "/" + sub)}>
                                                                    {categories_array[cat][sub].map(les => {
                                                                        return (
                                                                            <FormControl component="fieldset">
                                                                                <FormGroup>
                                                                                    {this.props.declarations_open && !les.passed ? <FormControlLabel style={{ "color": les.passed ? "green" : les.gradedescr && !les.passed ? "red" : "white", width: "100%" }}
                                                                                        control={<Checkbox checked={this.state.selected.indexOf(les.lescode) !== -1} onChange={(e) => this.handleLessCheck(e, les)} />}
                                                                                        label={(parseFloat(les.gradedescr.replace(/[^,0-9]/g, "").replace(",", ".")) || "") + " " + les.descr.replace(
                                                                                            /[^\x00-\x7F]+/g,
                                                                                            function (txt) {
                                                                                                return txt.length >= 3 ? txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase() : txt;
                                                                                            }
                                                                                        )}
                                                                                    /> :
                                                                                        <TreeItem style={{ "color": les.passed ? "green" : les.gradedescr && !les.passed ? "red" : "white" }} key={term + "/" + cat + "/" + sub + "/" + les.lescode} nodeId={term + "/" + cat + "/" + sub + "/" + les.lescode} label={(parseFloat(les.gradedescr.replace(/[^,0-9]/g, "").replace(",", ".")) || "") + " " + les.descr.replace(
                                                                                            /[^\x00-\x7F]+/g,
                                                                                            function (txt) {
                                                                                                return txt.length >= 3 ? txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase() : txt;
                                                                                            }
                                                                                        )} />
                                                                                    }
                                                                                </FormGroup>
                                                                            </FormControl>
                                                                        )
                                                                    })}
                                                                </TreeItem>
                                                            );
                                                        })}
                                                    </TreeItem>
                                                )
                                            })}
                                        </TreeView>
                                    </CardContent>
                                </Card>
                            </Grid>
                        );
                    })}

                </Grid>
                {this.props.declarations_open &&
                    <Grid
                        container
                        direction="row"
                        justify="flex-end"
                        alignItems="center"
                        style={{ marginTop: "25px", paddingBottom: "25px" }}
                    >
                        <Grid item>
                            <Button
                                variant="contained"
                                color="secondary"
                                endIcon={<Send />}
                                disabled={!this.state.selected.length}
                                onClick={this.show_confirmation}
                            >
                                Υποβολη Δηλωσης
                                </Button>
                        </Grid>
                    </Grid>
                }
                <Dialog
                    open={this.state.show_confirmation}
                    onClose={this.handleClose}
                    aria-labelledby="responsive-dialog-title"
                >
                    <DialogTitle id="responsive-dialog-title">Επιβεβαίωση δήλωσης {this.state.selected.length} μαθημάτων</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            <Typography gutterBottom style={{
                                display: 'flex'
                            }}><Warning style={{ color: "red" }} /> Υπάρχει ήδη μία εκκρεμής δήλωση μαθημάτων. Υποβάλλοντας νέα, γίνεται ακύρωση της παλιάς.</Typography>
                        </DialogContentText>
                        <Typography>Πρόκειται να κάνετε δήλωση των εξής μαθημάτων:</Typography>
                        <List dense>
                            {this.props.lessons.filter(les => this.state.selected.indexOf(les.lescode) !== -1).map(les => {
                                return (
                                    <ListItem key={les.lescode}>
                                        <ListItemText primary={les.descr} secondary={les.termin + "ο εξάμηνο"} />
                                    </ListItem>
                                );
                            })
                            }
                        </List>
                        <Typography style={{ textAlign: "center" }}>Βάλτε τα στοιχεία σύνδεσής σας για υποβολή της δήλωσης</Typography>
                        <Grid
                            container
                            direction="column"
                            alignItems="center"
                        >
                            <Grid item xs={12}>
                                <form noValidate onSubmit={this.handleDeclarationSubmit}>
                                    <TextField label="Όνομα Χρήστη" name="username" value={this.state.username} onChange={this.handleUsernameChange} fullWidth autoFocus />
                                    <FormControl fullWidth>
                                        <InputLabel htmlFor="password">Κωδικός</InputLabel>
                                        <Input
                                            id="password"
                                            type={this.state.showPassword ? 'text' : 'password'}
                                            value={this.state.password}
                                            onChange={this.handlePasswordChange}
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
                                        {this.state.loading &&
                                            <InputAdornment position="end">
                                                <CircularProgress color="secondary" size={25} />
                                            </InputAdornment>
                                        }
                                            ΕΠΙΒΕΒΑΙΒΩΣΗ & ΥΠΟΒΟΛΗ
                                        </Button>
                                </form>
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button autoFocus onClick={this.handleClose}>
                            Ακυρο
                            </Button>
                    </DialogActions>
                </Dialog>
                <Snackbar open={this.state.declaration_res === "success"} onClose={this.handleCloseAlert}>
                    <Alert severity="success" onClose={this.handleCloseAlert}>
                        {this.state.declaration_res === "success" ? "Η δήλωση ολοκληρώθηκε με επιτυχία" :
                            this.state.declaration_res === "login error" ? "Έδωσες λάθος όνομα χρήστη ή κωδικό" :
                                this.state.declaration_res === "declaration error" ? "ΠΡΟΣΟΧΗ! Η δήλωση δεν έχει ολοκληρωθεί!" && <p>Παρουσιάστηκαν λάθη σε ένα η περισσότερα μαθήματα.</p> :
                                    "Κάτι πήγε στραβά. Προσπάθησε αργότερα."
                        }
                    </Alert>
                </Snackbar>
            </Container>
        );
    }
}
