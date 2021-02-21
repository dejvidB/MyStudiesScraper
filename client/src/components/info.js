import { Container, Grid, Typography } from '@material-ui/core';
import React, { Component } from 'react';

export default class InfoComponent extends Component {
    render() {
        return (
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justify="center"
            >
                <Grid item xs={12} bg={3}>
                    <Container style={{ marginTop: "25px" }}>
                        <Typography style={{ paddingTop: "10px" }}>• Ονοματεπώνυμο: <span style={{ fontWeight: "600" }}>{this.props.name}</span></Typography>
                        <Typography style={{ paddingTop: "10px" }}>• Αριθμός Μητρώου: <span style={{ fontWeight: "600" }}>{this.props.am}</span></Typography>
                        {this.props.data.map((info, i) => {
                            return (
                                <Typography key={i} style={{ paddingTop: "10px" }}>• {Object.keys(info)[0]}: <span style={{ fontWeight: "600" }}>{info[Object.keys(info)[0]]}</span></Typography>
                            );
                        })}
                    </Container>
                </Grid>
            </Grid>
        );
    }
};
