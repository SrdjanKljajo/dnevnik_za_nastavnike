import React from 'react';
import { Button, ButtonGroup } from 'reactstrap';


const UcenikRedTabela = props => {

    const { ime, razred, ocenePP, oceneDP, zakljucnaPP, zakljucnaDP, napomene, _id } = props.ucenik;

    return (

        <tr>
            <td style={{ minWidth: "230px" }} className="text-capitalize">{ime}</td>
            <td style={{ minWidth: "4rem" }} className="text-center">{razred}</td>
            <td style={{ minWidth: "13rem" }}>{ocenePP}</td>
            <td style={{ minWidth: "4rem" }} className="text-center text-danger">{zakljucnaPP}</td>
            <td style={{ minWidth: "13rem" }}>{oceneDP}</td>
            <td style={{ minWidth: "4rem" }} className="text-center text-danger">{zakljucnaDP}</td>
            <td style={{ minWidth: "330px" }}>{napomene}</td>
            <td>
                <ButtonGroup>
                    <Button onClick={props.showEditForm.bind(this, props.ucenik)} color="secondary">Izmeni</Button>
                    <Button onClick={props.deleteHandler.bind(this, _id)} color="danger">Obriši</Button>
                </ButtonGroup>
            </td>

        </tr>
    )

}

export default UcenikRedTabela;