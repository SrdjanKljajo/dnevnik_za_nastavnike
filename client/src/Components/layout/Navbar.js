import React, { useState, useContext } from 'react';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink } from 'reactstrap';
import { FaHome } from 'react-icons/fa';
import AuthService from '../../Services/AuthService';
import { AuthContext } from '../../Context/AuthContext';

const AppNavBar = () => {
    const [collapsed, setCollapsed] = useState(true);

    const toggleNavbar = () => setCollapsed(!collapsed);

    const { isAuthenticated, user, setIsAuthenticated, setUser } = useContext(AuthContext);

    const onClickLogoutHandler = () => {
        AuthService.logout().then(data => {
            if (data.success) {
                setUser(data.user);
                setIsAuthenticated(false);
            }
        });
    }

    const unauthenticatedNavBar = () => {
        return (
            <>
                <NavItem>
                    <NavLink href="/" active={window.location.pathname === "/"}><FaHome style={{ fontSize: "1.2em" }} /></NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="/login" active={window.location.pathname === "/login"}>Prijava</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="/register" active={window.location.pathname === "/register"}>Registracija</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="/kontakt" active={window.location.pathname === "/kontakt"}>Admin-kontakt</NavLink>
                </NavItem>
            </>
        )
    }

    const authenticatedNavBar = () => {

        return (
            <>
                <NavItem>
                    <span className="navbar-text mr-md-4 text-capitalize text-white font-italic">{user ? ` ${user.username}` : ''}</span>
                </NavItem>
                <NavItem>
                    <NavLink href="/" active={window.location.pathname === "/"}><FaHome style={{ fontSize: "1.2em" }} /></NavLink>
                </NavItem>

                {
                    user.role === "admin" ?
                        <NavItem>
                            <NavLink href="/admin" active={window.location.pathname === "/admin"}>Admin</NavLink>
                        </NavItem> : null
                }

                <NavItem>
                    <NavLink href="/ucenici" active={window.location.pathname === "/ucenici"}>Učenici</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="#" onClick={onClickLogoutHandler}>Odjava</NavLink>
                </NavItem>
            </>
        )
    }

    return (

        <Navbar color="dark" dark expand="md" className="nav sticky-top">
            <NavbarBrand href="/" className="mr-auto">logo škole</NavbarBrand>
            <NavbarToggler onClick={toggleNavbar} className="mr-2" />
            <Collapse
                isOpen={!collapsed}
                navbar
                className="justify-content-end">
                <Nav navbar>
                    {!isAuthenticated ? unauthenticatedNavBar() : authenticatedNavBar()}
                </Nav>
            </Collapse>
        </Navbar>
    );
}

export default AppNavBar;