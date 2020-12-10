import { Component } from "react";
import { Accordion, AccordionDetails, AccordionSummary, Container, List, ListItem, ListItemText, Typography } from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

let grades = [];

export default class GradesComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            expanded: null
        }

        grades = [];
        for (let i = 0; i < this.props.grades.length; i++) {
            if (!grades.hasOwnProperty(this.props.grades[i].perdescr))
                grades[this.props.grades[i].perdescr] = [];
            grades[this.props.grades[i].perdescr].push({
                "lescode": this.props.grades[i].lescode,
                "lesdescr": this.props.grades[i].lesdescr,
                "mark": this.props.grades[i].mark,
                "termin": this.props.grades[i].termin
            });
        }
    }

    handleChange = (panel) => (event, isExpanded) => {
        this.setState({ expanded: isExpanded ? panel : false });
    };

    render() {
        return (
            <Container style={{ marginTop: "25px" }}>
                {Object.keys(grades).map(key => {
                    return (
                        <Accordion key={key} expanded={this.state.expanded === key} onChange={this.handleChange(key)}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                            >
                                <Typography>{key}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <List component="nav" dense>
                                    {grades[key].map(les => {
                                        return (
                                            <ListItem key={les.lescode}>
                                                <ListItemText style={{ paddingLeft: "20px" }} primary={les.lesdescr} secondary={les.termin + "ο εξάμηνο"}></ListItemText>
                                                <Typography style={{ paddingLeft: "50px" }}>{les.mark}</Typography>
                                            </ListItem>
                                        );
                                    })}
                                </List>
                            </AccordionDetails>
                        </Accordion>
                    );
                })}
            </Container>
        );
    }
}
