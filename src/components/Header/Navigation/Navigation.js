import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import List from "@material-ui/core/List";
import {NavLink} from "react-router-dom";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";


//Styles
const useStyles = makeStyles({
    list: {
        display: 'flex',
    },
    link: {
        color: '#fff',
        textDecoration: 'none'
    },
    linkActive: {
        color: 'yellow'
    }
});


const Navigation = props => {
    const classes = useStyles();
    return (
        <List component="nav" aria-label="main" className={classes.list}>
            <NavLink
                to="/"
                exact
                className={classes.link}
                activeClassName={classes.linkActive}>
                <ListItem button>
                    <ListItemText primary="Home"/>
                </ListItem>
            </NavLink>

            <NavLink to="/posts"
                     className={classes.link}
                     activeClassName={classes.linkActive}>
                <ListItem button>
                    <ListItemText primary="Posts"/>
                </ListItem>
            </NavLink>
        </List>
    );


}

export default Navigation;
