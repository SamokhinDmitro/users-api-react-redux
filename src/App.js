import React from "react";

import {Switch, Route} from 'react-router-dom';

import Home from "./components/Home/Home";
import Layout from "./hoc/Layout/Layout";
import Posts from "./components/Posts/Posts";
import UserInfo from "./components/UserInfo/UserInfo";
import PostInfo from "./components/PostInfo/PostInfo";

const App = props => {

        return (
            <Layout>
                <Switch>
                    <Route path='/' exact component={Home} />
                    <Route path='/users/:id' component={UserInfo} />
                    <Route path='/posts/:id' component={PostInfo}/>
                    <Route path='/posts' component={Posts} />
                </Switch>
            </Layout>
        );
}

export default App;

