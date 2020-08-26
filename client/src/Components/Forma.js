import React from 'react';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';

const Forma = props => {

    return (
        <Form onSubmit={props.handler} >
            <h4 className="text-center">{props.isEditForm ? "Izmenite podatke: " : "Unesite podatke o učeniku "}</h4>
            <FormGroup>
                <Label for="ime">Učenik</Label>
                <Input
                    type="text"
                    required
                    name="ime"
                    id="ime"
                    value={props.ucenik.ime}
                    onChange={props.onChange}
                    className="form-control"
                    placeholder="Unesite ime i prezime učenika" />
            </FormGroup>
            <FormGroup>
                <Label for="razred">Razred</Label>
                <Input
                    type="text"
                    required
                    name="razred"
                    id="razred"
                    value={props.ucenik.razred}
                    onChange={props.onChange}
                    className="form-control"
                    placeholder="Unesite razred učenika" />
            </FormGroup>
            <FormGroup>
                <Label for="ocenePP">Ocene - prvo polugodište</Label>
                <Input
                    type="text"
                    name="ocenePP"
                    id="ocenePP"
                    value={props.ucenik.ocenePP}
                    onChange={props.onChange}
                    className="form-control"
                    placeholder="Unesite ocene" />
            </FormGroup>
            <FormGroup>
                <Label for="zakljucna">Zaključna ocena - prvo polugodište</Label>
                <Input
                    type="number"
                    name="zakljucnaPP"
                    id="zakljucnaPP"
                    min="1"
                    max="5"
                    value={props.ucenik.zakljucnaPP}
                    onChange={props.onChange}
                    className="form-control"
                    placeholder="Unesite zaključnu ocenu" />
            </FormGroup>
            <FormGroup>
                <Label for="oceneDP">Ocene - drugo polugodište</Label>
                <Input
                    type="text"
                    name="oceneDP"
                    id="oceneDP"
                    value={props.ucenik.oceneDP}
                    onChange={props.onChange}
                    className="form-control"
                    placeholder="Unesite ocene" />
            </FormGroup>
            <FormGroup>
                <Label for="zakljucnaDP">Zaključna ocena - drugo polugodište</Label>
                <Input
                    type="number"
                    name="zakljucnaDP"
                    id="zakljucnaDP"
                    min="1"
                    max="5"
                    value={props.ucenik.zakljucnaDP}
                    onChange={props.onChange}
                    className="form-control"
                    placeholder="Unesite zaključnu ocenu" />
            </FormGroup>
            <FormGroup>
                <Label for="napomene">Napomene o učeniku</Label>
                <Input
                    type="text"
                    name="napomene"
                    id="napomene"
                    value={props.ucenik.napomene}
                    onChange={props.onChange}
                    className="form-control"
                    placeholder="Unesite napomene" />
            </FormGroup>
            <Button className="btn btn-lg btn-block">Submit</Button>
        </Form>
    )
}

export default Forma
