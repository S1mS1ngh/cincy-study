import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import './App.css'
import { BrowserRouter as Router} from "react-router-dom";
import {Route, Switch} from "react-router"

import LoginApp from './LoginApp'
import UserContext from "./contexts/userContext";
import Home from './components/home/home';
import Nav from './Nav'
import Chat from './components/chat/page/chat';
import Groups from './components/groups/groups';
import Explore from './components/explore/explore';
import { Calender } from './components/calender';
import { Settings } from './components/settings';
import GroupOne from "./components/groups/one/group.one";

export default function App() {
    const { user } = React.useContext(UserContext);
        return user.auth ?
            <div>
                <Router>
                    <Nav/>
                    <div id="main">
                        <Switch>
                            <Route path="/home" component={Home}/>
                            <Route path="/chat" component={Chat}/>
                            <Route
                                path="/groups"
                                render={({match: {url}}) => (
                                    <>
                                        <Route path={`${url}/`} component={Groups} exact/>
                                        <Route path={`${url}/one`} component={GroupOne} exact/>
                                    </>
                                )}
                            />
                            <Route path="/explore" component={Explore}/>
                            <Route path="/calender" component={Calender}/>
                            <Route path="/settings" component={Settings}/>
                            <Route component={Home}/>
                        </Switch>
                    </div>
                </Router>
            </div>
             :
            <div>
                <LoginApp />
            </div>
}