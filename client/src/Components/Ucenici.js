import React, { useState, useContext, useEffect } from 'react';
import UcenikRedTabela from './UcenikRedTabela';
import UcenikService from '../Services/UcenikService';
import Message from './Message';
import { AuthContext } from '../Context/AuthContext';
import $ from 'jquery';
import { FaSearch } from 'react-icons/fa';
import confirm from "reactstrap-confirm";
import Forma from './Forma';
import { Table } from 'reactstrap';

const Ucenici = props => {

    //search funcionality for table
    $(document).ready(function () {
        $("#myInput").on("keyup", function () {
            var value = $(this).val().toLowerCase();
            $("#myTable tr").filter(function () {
                return $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
            });
        });
    });

    const [ucenik, setUcenik] = useState({ ime: "", razred: "", ocenePP: "", oceneDP: "", zakljucnaPP: "", zakljucnaDP: "", napomene: "" });
    const [ucenici, setUcenici] = useState([]);
    const [isEditForm, setisEditForm] = useState(false);
    const [message, setMessage] = useState(null);
    const authContext = useContext(AuthContext);

    const { isAuthenticated, user } = useContext(AuthContext);

    useEffect(() => {
        UcenikService.getUcenici().then(data => {
            setUcenici(data.ucenici);
        });
    }, []);

    const onChange = e => {
        setUcenik({ ...ucenik, [e.target.name]: e.target.value });
    }

    const showEditForm = (ucenik) => {
        setisEditForm(true);
        setUcenik(ucenik);
    }

    const resetForm = () => {
        setUcenik({ ime: "", razred: "", ocenePP: "", oceneDP: "", zakljucnaPP: "", zakljucnaDP: "", napomene: "" });
    }

    async function deleteHandler(id) {
        if (await confirm({
            title: (
                <>
                    <strong>Upozorenje!</strong>!
                </>
            ),
            message: "Ova operacija je nepovratna! Da li ste sigurni da želite brisanje podataka o učeniku iz dnevnika?",
            confirmText: "Obriši učenika",
            cancelText: "Otkaži brisanje",
            confirmColor: "danger",
            cancelColor: "secondary"
        })) {
            const deleteData = await UcenikService.deleteUcenik(id);
            const message = deleteData.message;
            if (message.msgError) {
                setMessage(message);
            }
            else {
                await UcenikService.getUcenici()
                    .then(getData => {
                        setUcenici(getData.ucenici);
                        setMessage(message);
                        const timer = setTimeout(() => {
                            setMessage(null)
                        }, 4000);
                        return () => clearTimeout(timer);
                    })
            }
        }
    }

    async function addHandler(e) {
        e.preventDefault();
        UcenikService.postUcenik(ucenik)
            .then(data => {
                const { message } = data;
                resetForm();
                if (!message.msgError) {
                    UcenikService.getUcenici().then(getData => {
                        setUcenici(getData.ucenici);
                        setMessage(message);
                        const timer = setTimeout(() => {
                            setMessage(null)
                        }, 4000);
                        return () => clearTimeout(timer);
                    });
                }
                else if (message.msgBody === "UnAuthorized") {
                    setMessage(message);
                    authContext.setUser({ username: "", role: "" });
                    authContext.setIsAuthenticated(false);
                }
                else {
                    setMessage(message);
                }
            });

    }

    async function updateHandler(e) {
        e.preventDefault();
        UcenikService.updateUcenik(ucenik).then(data => {
            const { message } = data;
            resetForm();
            if (!message.msgError) {
                UcenikService.getUcenici().then(getData => {
                    setUcenici(getData.ucenici);
                    setMessage(message);
                    const timer = setTimeout(() => {
                        setMessage(null)
                    }, 4000);
                    return () => clearTimeout(timer);
                });
            }
            else if (message.msgBody === "UnAuthorized") {
                setMessage(message);
                authContext.setUser({ username: "", role: "" });
                authContext.setIsAuthenticated(false);
            }
            else {
                setMessage(message);
            }
        });
        setisEditForm(false);
        resetForm();
    }

    const renderForm = () => {
        return (
            <Forma isEditForm={isEditForm}
                ucenik={ucenik}
                onChange={onChange}
                handler={!isEditForm ? addHandler : updateHandler} />
        );
    }

    return (
        <div className="container-fluid my-5">
            {
                !isAuthenticated ?
                    (null) :
                    (<div>
                        <h4 className="text-center font-italic my-5">{user ? `Nastavni predmet - ${user.predmet}` : ''}</h4>
                    </div>)
            }
            <div className="d-flex justify-content-center h-100">
                <div className="searchbar">
                    <input className="search_input" id="myInput" type="text" placeholder="Pretražite učenike..." />
                    <span className="search_icon text-danger"><FaSearch /></span>
                </div>
            </div>
            <Table striped bordered responsive className="bg-white">
                <thead className="thead-dark text-center">
                    <tr>
                        <th scope="col" style={{ minWidth: "230px" }}>Učenik</th>
                        <th scope="col">Razred</th>
                        <th scope="col" style={{ minWidth: "13rem" }}>Ocene pp</th>
                        <th scope="col" style={{ minWidth: "4rem" }}>Z - 1</th>
                        <th scope="col" style={{ minWidth: "13rem" }}>Ocene dp</th>
                        <th scope="col" style={{ minWidth: "4rem" }}>Z - 2</th>
                        <th scope="col" style={{ minWidth: "200px" }}>Napomene o učeniku</th>
                    </tr>
                </thead>
                <tbody id="myTable">

                    {
                        ucenici.map(ucenik => {
                            return <UcenikRedTabela
                                key={ucenik._id}
                                ucenik={ucenik}
                                deleteHandler={deleteHandler}
                                showEditForm={showEditForm} />
                        })
                    }
                </tbody>
            </Table>

            <br />

            <div className="col-lg-6 col-md-8 mx-auto">
                {renderForm()}
                {message ? <Message message={message} /> : null}
            </div>
        </div>

    );

}

export default Ucenici;