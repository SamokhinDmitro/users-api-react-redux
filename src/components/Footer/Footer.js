import React from "react";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Auxilialy from "../../hoc/Auxilialy";


const useStyles = makeStyles({
    footer: {
        padding: '20px 0',
        background: '#0B0D17',
        color: '#D9DBE1'
    }
});

const Footer = props => {
    const classes = useStyles();
    return (
       <Auxilialy>
           {/*FOOTER*/}
           <footer className={classes.footer}>
               <Typography align="center">
                   &copy; React Users API 2021  Все права защищены
               </Typography>
           </footer>
           {/*END FOOTER*/}
       </Auxilialy>
    );


}

export default Footer;
