import React from "react";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {withRouter} from 'react-router-dom';


//Styles
const useStyles = makeStyles({

    postContainer: {
        width: '100%'
    },
    postTitle: {
        fontSize: '20px',
        fontWeight: 'bold',
        margin: 0
    },
    post: {
        padding: '10px 20px',
        display: 'flex',
        jusitfyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        transition: 'all 0.5s ease-in',
        '&:hover': {
            background: '#DADADA',
            cursor: 'pointer'
        }
    },
    postContent: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        '&:last-child': {
            padding: 10
        }
    },
    postLink: {
        //marginLeft: '15px',
        color: 'red',
        fontSize: '14px',
        '&:hover': {
            textDecoration: 'none',
        }
    }
});

const Post = props => {

    const classes = useStyles();

    const prepareStr = str => {
        return str.slice(0,1).toUpperCase() + str.slice(1);
    };


    return (
        <Grid item lg={8} offset={2} className={classes.postContainer}>
            {/*Post-Card*/}
            <Card className={classes.post}
                  variant="outlined"
                  onClick={() => props.history.push(`/posts/${props.id}`)}

            >
                <CardContent className={classes.postContent}  align="center">
                    <Typography variant="h4" className={classes.postTitle} color="textSecondary" gutterBottom>
                        {props.title ? prepareStr(props.title) : null}
                    </Typography>
                </CardContent>
            </Card>
            {/*END Post-Card*/}
        </Grid>
    );


}

export default withRouter(Post);
