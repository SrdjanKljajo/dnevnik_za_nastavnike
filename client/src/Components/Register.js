import React, { useState, useRef, useEffect } from 'react';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import AuthService from '../Services/AuthService';
import Message from '../Components/Message';

const Register = props => {
    const [user, setUser] = useState({ predmet: "", username: "", password: "", role: "" });
    const [message, setMessage] = useState(null);
    let timerID = useRef(null);

    useEffect(() => {
        return () => {
            clearTimeout(timerID);
        }
    }, []);

    const onChange = e => {
        setUser({ ...user, [e.target.name]: e.target.value });
    }

    const resetForm = () => {
        setUser({ predmet: "", username: "", password: "", role: "" });
    }

    const onSubmit = e => {
        e.preventDefault();
        AuthService.register(user).then(data => {
            const { message } = data;
            setMessage(message);
            resetForm();
            if (!message.msgError) {
                timerID = setTimeout(() => {
                    window.location = '/login';
                }, 2000)
            }
        });
    }

    return (
        <div className="container">
            <div className="col-lg-6 col-md-8 mx-auto registracija">
                <h3 className="text-center">Registrujte se</h3>
                <Form onSubmit={onSubmit}>
                    <FormGroup>
                        <Label for="predmet" className="mr-sm-2">Nastavni predmet</Label>
                        <Input
                            type="text"
                            required
                            name="predmet"
                            id="predmet"
                            value={user.predmet}
                            placeholder="Unesite naziv predmeta"
                            onChange={onChange}
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="username" className="mr-sm-2">Predmetni nastavnik</Label>
                        <Input
                            type="text"
                            required
                            name="username"
                            id="username"
                            minLength="6"
                            maxLength="30"
                            value={user.username}
                            placeholder="Unesite ime i prezime"
                            onChange={onChange}
                            className="text-capitalize"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="password" className="mr-sm-2">Lozinka</Label>
                        <Input
                            type="password"
                            name="password"
                            minLength="6"
                            required
                            value={user.password}
                            id="password"
                            placeholder="Unesite lozinku"
                            onChange={onChange}
                        />
                    </FormGroup>
                    <FormGroup hidden>
                        <Label for="role" className="mr-sm-2"></Label>
                        <Input
                            type="text"
                            defaultValue={user.role = "user"}
                            name="role"
                            id="role"
                            //value={user.role}
                            placeholder="Enter user role"
                            onChange={onChange}
                        />
                    </FormGroup>
                    <Button className="btn-lg btn-block">Prihvati</Button>
                </Form>
                {message ? <Message message={message} /> : null}
            </div>
        </div>
    )
}

export default Register;