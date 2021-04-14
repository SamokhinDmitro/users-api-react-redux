import React from "react";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {withRouter} from 'react-router-dom';

//Styles
const useStyles = makeStyles({
    cardContainer: {
      width: '100%'
    },
    cardTitle: {
        fontSize: '14px',
        margin: 0
    },
    card: {
        display: 'flex',
        jusitfyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        cursor: 'pointer'
    },
    cardContent: {
        //padding: '10px',
        '&:last-child': {
            padding: 10
        }
    },
    hidden: {
        display: 'none!important'
    }

});

const User = props => {

    const classes = useStyles();
    const cls = [classes.cardContainer];

    if(props.status){
        cls.push(classes.hidden);
    }


    return (
        <Grid item lg={3} className={cls.join(' ')}>
            {/*Card*/}
            <Card className={classes.card}
                  variant="outlined"
                  align="center"
                  onClick={() => props.history.push(`/users/${props.id}`)}
            >
                <CardContent className={classes.cardContent}>
                    <Typography variant="h3" className={classes.cardTitle} color="textSecondary" gutterBottom>
                        Name: <strong>{props.name}</strong>
                    </Typography>
                </CardContent>
            </Card>
            {/*END Card*/}
        </Grid>
    );


}

export default withRouter(User);
