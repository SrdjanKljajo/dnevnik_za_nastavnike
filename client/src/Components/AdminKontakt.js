import React, { useState } from 'react';
import { Form, FormGroup, Label, Input, Button, Alert } from 'reactstrap';
import axios from 'axios';

const AdminKontakt = (props) => {

    const [name, setName] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [sent, setSent] = useState(false);
    const [notSent, setNotSent] = useState(false);

    const handleInput = (e) => {
        e.preventDefault();
        if (e.target.id === "Name") {
            setName(e.target.value)
        } else if (e.target.id === "LastName") {
            setLastname(e.target.value)
        } else if (e.target.id === "Email") {
            setEmail(e.target.value)
        } else {
            setMessage(e.target.value)
        }
    }

    const resetForm = () => {
        setName('');
        setLastname('');
        setEmail('');
        setMessage('');
    }

    const formSubmit = (e) => {
        e.preventDefault();
        let data = {
            name,
            lastname,
            email,
            message
        }

        axios.post('/kontakt', data)
            .then(res => {
                setSent({
                    sent: true
                }, resetForm())

            }).catch(() => {
                setNotSent({
                    notSent: true
                }, resetForm())
            })

        const timer = setTimeout(() => {
            setSent(false)
            setNotSent(false)
        }, 4000);
        return () => clearTimeout(timer)

    }

    return (
        <div className="container-fluid bg-dark text-white py-5">
            <h5 className="text-center m-5">Ukoliko imate dodatna pitanja ili nedoumice budite slobodni da me kontaktirate popunjavanjem kontakt forme. <br /> Dobićete odgovor na unetu email adresu u najkraćem roku!</h5>
            <div className="col-lg-4 col-md-8 mx-auto">
                <Form onSubmit={formSubmit}>
                    <FormGroup>
                        <Label for="Name">Ime</Label>
                        <Input
                            type="text"
                            name="name"
                            id="Name"
                            placeholder="Ime"
                            required
                            value={name}
                            onChange={handleInput}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="LastName">Prezime</Label>
                        <Input
                            type="text"
                            name="lastname"
                            id="LastName"
                            placeholder="Prezime"
                            required
                            value={lastname}
                            onChange={handleInput}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="Email">Email</Label>
                        <Input
                            type="email"
                            name="email"
                            id="Email"
                            placeholder="Email"
                            required
                            value={email}
                            onChange={handleInput}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="Message">Unesite poruku</Label>
                        <Input
                            type="textarea"
                            name="message"
                            id="Message"
                            rows="8"
                            required
                            value={message}
                            onChange={handleInput}
                        />
                    </FormGroup>
                    <Button block className="mb-1 btn-lg" style={{ backgroundColor: "teal" }}>Pošaljite poruku</Button>
                    <Alert color="success" className={sent ? 'msg msgAppear' : 'msg'}>Poruka je uspešno poslata</Alert>
                    <Alert color="danger" className={notSent ? 'msg msgAppear' : 'msg'}>Poruka nije poslata. Došlo je do greške. Obratite se administratoru sajta</Alert>
                </Form>
            </div>
        </div>
    );
}

export default AdminKontakt;
