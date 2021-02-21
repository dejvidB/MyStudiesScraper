import React, { Component } from 'react';

import NavBar from './navbar';
import LoginComponent from './login';
import HomeComponent from './home';
import DeclarationsComponent from './declarations';
import AverageComponent from './average';
import GradesComponent from './grades';
import InfoComponent from './info';

import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import { setUserInfo, setTerms, setCategories, setLessons, setGrades, setDeclarations, setDeclarationsState, switchTheme } from '../redux/ActionCreators';

import { createMuiTheme, CssBaseline, ThemeProvider } from '@material-ui/core';

const darkTheme = createMuiTheme({
    palette: {
        type: "dark",
    }
});

const lightTheme = createMuiTheme({
    palette: {
        type: "light",
    }
});

const mapStateToProps = state => {
    return {
        user_info: state.user_info,
        terms: state.terms,
        categories: state.categories,
        lessons: state.lessons,
        grades: state.grades,
        declarations: state.declarations,
        declarations_open: state.declarations_open,
        theme: state.theme
    }
}

const mapDispatchToProps = dispatch => ({
    setUserInfo: user_info => dispatch(setUserInfo(user_info)),
    setTerms: terms => dispatch(setTerms(terms)),
    setCategories: categories => dispatch(setCategories(categories)),
    setLessons: lessons => dispatch(setLessons(lessons)),
    setGrades: grades => dispatch(setGrades(grades)),
    setDeclarations: declarations => dispatch(setDeclarations(declarations)),
    setDeclarationsState: state => dispatch(setDeclarationsState(state)),
    resetState: () => {
        dispatch(setUserInfo({}));
        dispatch(setTerms(0));
        dispatch(setCategories({}));
        dispatch(setLessons({}));
        dispatch(setGrades({}));
        dispatch(setDeclarations({}));
        setDeclarationsState(false);
    },
    switchTheme: () => {
        dispatch(switchTheme());
    }
});

class Main extends Component {
    render() {
        let theme = this.props.theme.theme === "light" ? lightTheme : darkTheme;
        return (
            <div>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <NavBar username={this.props.user_info.user_info.username} university={this.props.user_info.user_info.university} reset_state={this.props.resetState} switchTheme={this.props.switchTheme} />
                    <Switch>
                        <Route path="/"
                            component={() =>
                                <LoginComponent
                                    setUserInfo={this.props.setUserInfo}
                                    setTerms={this.props.setTerms}
                                    setCategories={this.props.setCategories}
                                    setLessons={this.props.setLessons}
                                    setGrades={this.props.setGrades}
                                    setDeclarations={this.props.setDeclarations}
                                    setDeclarationsState={this.props.setDeclarationsState}
                                    theme={theme}
                                />} exact
                        />
                        {this.props.user_info.terms &&
                            <>
                                <Route path="/home"
                                    component={() =>
                                        <HomeComponent
                                            user_info={this.props.user_info}
                                            categories={this.props.categories.categories}
                                            lessons={this.props.lessons.lessons}
                                            declarations_open={this.props.declarations.declarations_open}
                                            setLessons={this.props.setLessons}
                                            theme={this.props.theme.theme}
                                        />} exact />
                                <Route path="/declarations"
                                    component={() =>
                                        <DeclarationsComponent
                                            declarations={this.props.declarations}
                                            lessons={this.props.lessons.lessons}
                                        />} exact />
                                <Route path="/average"
                                    component={() =>
                                        <AverageComponent
                                            lessons={this.props.lessons.lessons}
                                        />} exact />
                                <Route path="/grades"
                                    component={() =>
                                        <GradesComponent
                                            grades={this.props.grades.grades}
                                        />} exact />
                                <Route path="/info"
                                    component={() =>
                                        <InfoComponent
                                            data={this.props.user_info.user_info.data}
                                            name={this.props.user_info.user_info.username}
                                            am={this.props.user_info.user_info.uid}
                                        />} exact />
                            </>
                        }
                        <Redirect to="/" />
                    </Switch>
                </ThemeProvider>
            </div>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
