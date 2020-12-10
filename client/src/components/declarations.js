import { Component } from "react";
import { Accordion, AccordionSummary, AccordionDetails, Typography, Container, List, ListItemText, ListItem } from "@material-ui/core";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

export default class Declarations extends Component {
    constructor(props) {
        super(props);
        this.state = {
            has_selected: 0,
            expanded: null
        }
    }

    componentDidMount() {
        if (this.props.declarations.declarations_open)
            for (let i = 0; i < this.props.lessons.length; i++)
                if (this.props.lessons[i].selected)
                    this.setState(old => ({ ...old, has_selected: old.has_selected + 1 }));
    }

    handleChange = (panel) => (event, isExpanded) => {
        this.setState(state => ({ ...state, expanded: isExpanded ? panel : false }));
    };

    render() {
        return (
            <Container style={{ marginTop: "25px" }}>
                {this.state.has_selected && <Typography>Υπάρχει εκκρεμής δήλωση {this.state.has_selected} μαθημάτων για την τρέχουσα περίοδο. Αναμένεται οριστικοποίηση της από τη Γραμματεία.</Typography>}
                {(this.props.declarations.declarations_open && !this.state.has_selected) && <Typography>Μπορείς να δηλώσεις τα μαθήματα που θα δώσεις αυτό το εξάμηνο</Typography>}
                {this.state.has_selected &&
                    <Accordion expanded={this.state.expanded === 0} onChange={this.handleChange(0)}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                        >
                            <Typography>ΕΚΚΡΕΜΗΣ ΔΗΛΩΣΗ</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <List component="nav">
                                {this.props.lessons.filter(lesson => lesson.selected).map(les => {
                                    return (
                                        <ListItem key={les.lescode}>
                                            <ListItemText primary={les.descr} secondary={les.termin + "ο εξάμηνο"}></ListItemText>
                                        </ListItem>
                                    );
                                })}
                            </List>
                        </AccordionDetails>
                    </Accordion>
                }
                {Object.keys(this.props.declarations.declarations).map(key => {
                    return (
                        <Accordion key={key} expanded={this.state.expanded === key} onChange={this.handleChange(key)}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                            >
                                <Typography>{key}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <List component="nav">
                                    {this.props.declarations.declarations[key].map(les => {
                                        return (
                                            <ListItem key={les.lescode}>
                                                <ListItemText primary={les.name} secondary={les.term + "ο εξάμηνο"}></ListItemText>
                                            </ListItem>
                                        );
                                    })}
                                </List>
                            </AccordionDetails>
                        </Accordion>
                    )
                })
                }
            </Container>
        );
    }
}
