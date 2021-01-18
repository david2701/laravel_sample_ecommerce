import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {HashRouter as Router, Route} from 'react-router-dom';
import Login from './Admins/Login';
import Home from "./Admins/Home";
import Navbar from "./Admins/Navbar";
import AddItem from "./Admins/items/AddItem";
import GetItems from "./Admins/items/GetItems"
import EditItem from "./Admins/items/EditItem";
import {library} from "@fortawesome/fontawesome-svg-core";
import {fab} from "@fortawesome/free-brands-svg-icons";
import {faAngleDoubleLeft, faBriefcase, faEdit, faHome, faPlusSquare, faTrash} from "@fortawesome/free-solid-svg-icons"

library.add(fab, faHome, faAngleDoubleLeft, faBriefcase, faPlusSquare, faTrash, faEdit);

class App extends Component {
    // state = { }
    render() {
        return (
            <div>
                <Router>
                    <Navbar/>
                    <div className="container">
                        <Route exact path={'/getItems'} component={GetItems}/>
                        <Route exact path={'/addItem'} component={AddItem}/>
                        <Route exact path={'/adminsLogin'} component={Login}/>
                        <Route exact path={'/home'} component={Home}/>
                        <Route exact path={'/edit/item/:id'} component={EditItem}/>

                    </div>
                </Router>
            </div>
        );
    }
}

export default App;

if (document.getElementById('App')) {
    ReactDOM.render(<App />, document.getElementById('App'));
}
