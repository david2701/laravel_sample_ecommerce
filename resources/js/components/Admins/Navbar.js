import React, {Component} from 'react';
import {Link, Redirect, withRouter} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import '../../../css/admins/navbar.css';

class Navbar extends Component {

    logout(e) {
        e.preventDefault();
        localStorage.removeItem('adminsToken');
        this.props.history.push('adminsLogin');
    }

    render() {

        const Navbar = <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>

            <button
                className='navbar-toggler'
                type='button'
                data-toggle={'collapse'}
                data-target={'#navbarNav'}
                aria-expanded={'false'}
                aria-label='Toggle navigation'
            >
                <span className='navbar-toggler-icon'/>
            </button>

            <div className='collapse navbar-collapse' id={'navbarNav'}>
                <ul className='navbar-nav'>
                    <li className='nav-item position-absolute mr-2 active'>
                        <Link className='nav-link' to={'/home'}>
                            <FontAwesomeIcon icon='home' className={'icon'}/>
                            Home <span className="sr-only">(current)</span>
                        </Link>
                    </li>
                    <li className='nav-item active'>
                        <Link className='nav-link' to={'/getItems'}>
                            <FontAwesomeIcon icon='briefcase' className={'icon'}/>
                            Items
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <a
                            className='nav-link' href={'/adminsLogin'}
                            onClick={this.logout.bind(this)}>
                            <FontAwesomeIcon icon='angle-double-left' className={'icon'}/>
                            logout
                        </a>
                    </li>
                </ul>
            </div>
        </nav>

        return (
            <div> {localStorage.adminsToken ? Navbar : <Redirect to={'/adminsLogin'}/>}</div>
        );
    }
}

export default withRouter(Navbar);
