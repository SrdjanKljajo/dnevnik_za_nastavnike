import React, { useState, useContext } from 'react';
import { Alert, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import AuthService from '../Services/AuthService';
import { AuthContext } from '../Context/AuthContext';

const Login = props => {
    const [user, setUser] = useState({ username: "", password: "" });
    const [message, setMessage] = useState(null);
    const authContext = useContext(AuthContext);


    const onChange = e => {
        setUser({ ...user, [e.target.name]: e.target.value });
    }

    const onSubmit = e => {
        e.preventDefault();
        AuthService.login(user).then(data => {
            console.log(data);
            const { isAuthenticated, user, message } = data;
            if (isAuthenticated) {
                authContext.setUser(user);
                authContext.setIsAuthenticated(isAuthenticated);
                window.location = '/';
            }
            else setMessage(message);
        });
    }

    return (
        <div className="container">
            <div className="col-lg-6 col-md-8 mx-auto prijava">
                <h3 className="text-center">Prijavite se</h3>
                <Form onSubmit={onSubmit}>
                    <FormGroup className="mb-2 ">
                        <Label for="username" className="mr-sm-2">Predmetni nastavnik</Label>
                        <Input
                            type="text"
                            required
                            name="username"
                            id="username"
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
                            required
                            id="password"
                            value={user.password}
                            placeholder="Unesite lozinku"
                            onChange={onChange}
                        />
                    </FormGroup>
                    <Button className="mt-3 btn-lg btn-block">Prihvati</Button>
                </Form>
                {message ? <Alert color="danger" className="text-center"> Korisničko ime ili šifra nisu tačni </Alert> : null}
            </div>
        </div>
    )
}

export default Login;