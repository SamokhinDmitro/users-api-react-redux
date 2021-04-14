import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Container from "@material-ui/core/Container";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Navigation from "./Navigation/Navigation";


//Styles
const useStyles = makeStyles({
    title: {
        flexGrow: 1,
        margin: 0
    }
});

const Header = props => {
    const classes = useStyles();

    return (
       <React.Fragment>
           {/*HEADER*/}
           <AppBar position="relative">
               <Container maxWidth="lg">
                   <Toolbar>
                       <Typography variant="h6" className={classes.title}>
                           React Users Api
                       </Typography>

                       {/*Navigation*/}
                       <Navigation/>

                   </Toolbar>
               </Container>
           </AppBar>
           {/*END HEADER*/}
       </React.Fragment>
    );


}

export default Header;
