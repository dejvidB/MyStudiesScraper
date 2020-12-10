import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem, withStyles, Box } from '@material-ui/core';
import Brightness6Icon from '@material-ui/icons/Brightness6';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { Link, withRouter } from 'react-router-dom';
import { Component } from 'react';
import { HomeWork } from '@material-ui/icons';

const useStyles = () => ({
  rightToolbar: {
    marginLeft: "auto",
    marginRight: -12
  },
  menuButton: {
    marginRight: 16,
    marginLeft: -12
  }
});

export default withStyles(useStyles)(withRouter(class NavBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      anchorEl: null
    }
  }

  handleMenu = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleLogOut = () => {
    this.props.reset_state();
    this.props.history.push({
      pathname: '/'
    });
  }

  handleThemeSwitch = () => {
    this.props.switchTheme();
  }

  render() {
    const { classes } = this.props;
    return (
      this.props.university ?
        <AppBar position="static" color="primary" className={classes.root}>
          <Toolbar>
            <IconButton
              title="Αρχική Σελίδα"
              color="inherit"
              className={classes.menuButton}
              onClick={() => {
                this.props.history.push({
                  pathname: '/home'
                });
              }}
            >
              <HomeWork />
            </IconButton>

            <Box display={{ xs: 'none', md: 'block' }}>
              <Typography variant="h6">
                <Link to="/home" style={{ color: "inherit", textDecoration: "none" }}>{this.props.university}</Link>
              </Typography>
            </Box>

            <section className={classes.rightToolbar}>
              <IconButton
                title="Αντιστροφή χρώματος"
                color="inherit"
                onClick={(e) => this.handleThemeSwitch(e)}
              >
                <Brightness6Icon />
              </IconButton>

              <IconButton
                title="Μενού"
                color="inherit"
                onClick={(e) => this.handleMenu(e)}
              >
                <AccountCircle />
              </IconButton>
            </section>
            <Menu
              id="menu-appbar"
              anchorEl={this.state.anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={this.state.anchorEl}
              onClose={this.handleClose}
            >
              <MenuItem onClick={this.handleClose} component={Link} to="/average">Υπολογισμός Μέσου Όρου</MenuItem>
              <MenuItem onClick={this.handleClose} component={Link} to="/declarations">Ιστορικό Δηλώσεων Μαθημάτων</MenuItem>
              <MenuItem onClick={this.handleClose} component={Link} to="/grades">Βαθμοί ανά Εξεταστική</MenuItem>
              <MenuItem onClick={this.handleLogOut} component={Link} to="/">Αποσύνδεση</MenuItem>
            </Menu>
          </Toolbar>
        </AppBar > : <></>
    );
  }
}));
