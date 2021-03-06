import { Component } from "react";
import {
    Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    FormGroup, FormControlLabel, Switch, TextField, Checkbox, Container
} from "@material-ui/core";

export default class AverageComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            use_ects: this.props.lessons.filter(les => les.gradedescr)[0] && this.props.lessons.filter(les => les.gradedescr)[0]["ects"] > 1,
            lessons: this.props.lessons.filter(les => les.gradedescr).map(les => {
                return { "lescode": les.lescode, "descr": les.descr, "gradedescr": parseFloat(les.gradedescr.replace(/[^,0-9]/g, "").replace(",", ".")), "selected": les.passed, "ects": les.ects || 1 };
            })
        };
        this.handleToggle = this.handleToggle.bind(this);
        this.handleCheck = this.handleCheck.bind(this);
        this.handleEctsChange = this.handleEctsChange.bind(this);
    }

    handleToggle = () => {
        this.setState(state => ({
            use_ects: !state.use_ects,
            lessons: this.props.lessons.filter(les => les.gradedescr).map(les => {
                return { "lescode": les.lescode, "descr": les.descr, "gradedescr": parseFloat(les.gradedescr.replace(/[^,0-9]/g, "").replace(",", ".")), "selected": les.passed, "ects": les.ects || 1 };
            })
        }));
    }

    handleCheck = (e, lescode) => {
        this.setState(state => ({
            ...state, lessons: state.lessons.map(les => {
                return les.lescode === lescode ? les.gradedescr >= 5 ?
                    { ...les, selected: e.target.checked } : les : les;
            })
        }));
    }

    handleEctsChange = (e, lescode) => {
        if (e.target.value.length && e.target.value > 0)
            this.setState((state) => ({
                ...state, lessons: state.lessons.map(les => {
                    return les.lescode === lescode ?
                        { ...les, ects: e.target.value } : les;
                })
            })
            );
    }

    render() {
        let sum = 0, ects = 0;
        return (
            <Container maxWidth="lg" style={{ marginTop: "25px" }}>
                <TableContainer component={Paper}>
                    <Table size="small">
                        <TableHead>
                            <TableRow>
                                <TableCell />
                                <TableCell>Όνομα μαθήματος</TableCell>
                                <TableCell>Βαθμός</TableCell>
                                <TableCell>
                                    <FormGroup>
                                        <FormControlLabel
                                            control={<Switch size="small" checked={this.state.use_ects} onChange={this.handleToggle} />}
                                            label="Βαρύτητα/ECTS"
                                        />
                                    </FormGroup>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.lessons.length === 0 &&
                                <TableRow>
                                    <TableCell />
                                    <TableCell>ΔΕΝ ΒΡΕΘΗΚΕ ΙΣΤΟΡΙΚΟ ΜΑΘΗΜΑΤΩΝ</TableCell>
                                    <TableCell />
                                    <TableCell />
                                </TableRow>
                            }
                            {this.state.lessons.length > 0 &&
                                this.state.lessons.map(les => {
                                    sum += les.selected ? parseFloat(les.gradedescr) * (this.state.use_ects ? parseFloat(les.ects) : 1) : 0;
                                    ects += les.selected ? this.state.use_ects ? parseFloat(les.ects) : 1 : 0;
                                    return (
                                        <TableRow key={les.lescode}>
                                            <TableCell>
                                                <Checkbox
                                                    checked={les.selected}
                                                    onChange={(e) => { this.handleCheck(e, les.lescode) }} />
                                            </TableCell>
                                            <TableCell>
                                                {les.descr}
                                            </TableCell>
                                            <TableCell>
                                                {les.gradedescr}
                                            </TableCell>
                                            <TableCell>
                                                <TextField type="number" value={this.state.use_ects ? les.ects : 1} disabled={!this.state.use_ects} onChange={(e) => { this.handleEctsChange(e, les.lescode) }} />
                                            </TableCell>
                                        </TableRow>
                                    );
                                })
                            }
                        </TableBody>
                        <caption><span style={{ float: "left", fontSize: "16px" }}>Μέσος Όρος: {ects ? (sum / ects).toFixed(2) : 0}</span> <span style={{ float: "right", fontSize: "16px" }}>{this.state.use_ects && "Σύνολο ECTS: " + ects}</span></caption>
                    </Table>
                </TableContainer>
            </Container>
        );
    }
};
