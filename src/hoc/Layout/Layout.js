import React from "react";
import classes from './Layout.module.css';

import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";

const Layout = props => {
    return (
        <div className={classes.Layout}>
            <Header/>

            <main className={classes.main}>
                {props.children}
            </main>
            
            <Footer/>
        </div>
    );


}

export default Layout;
