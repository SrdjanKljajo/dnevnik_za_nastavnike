import React, { useContext } from 'react';
import { AuthContext } from '../Context/AuthContext';

const Home = () => {

    const { isAuthenticated, user } = useContext(AuthContext);

    return (

        <div className="container-fluid pocetna">
            <div className="row height align-items-center">
                <div className="col">

                    {
                        !isAuthenticated ?
                            (<div>
                                <h2 className="mt-5 text-center">dnevnik nastavnika</h2>
                                <p className="m-4 text-center"><a href="/register" className="aHome" >Registrujte se</a> za pristup bazi podataka o učenicima.<br /> Ukoliko ste već registrovani,<a href="/login" className="aHome"> prijavite se</a></p>
                            </div>) :
                            (<div>
                                <h2 className=" text-white text-capitalize text-center">{user ? ` Nastavnik - ${user.username}` : ''}</h2>
                                <h4 className=" text-white text-center font-italic">{user ? ` Predmet - ${user.predmet}` : ''}</h4>
                            </div>)
                    }
                </div>
            </div>
        </div>
    )
}

export default Home;
