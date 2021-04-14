import React, {useEffect} from "react"
import {connect} from 'react-redux';
import {asyncLoadPostInfo} from "../../redux/actions/actions";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import Box from '@material-ui/core/Box';
import {Link} from "react-router-dom";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import CardActions from "@material-ui/core/CardActions";


//Style
const useStyles= makeStyles({
    post: {
        marginBottom: '20px',
        padding: '10px 20px',
        display: 'flex',
        jusitfyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        background: '#f5f5f5'
    },
    postTitle: {
        fontSize: '20px',
        fontWeight: '700',
        margin: 0,
        marginBottom: '15px',
        color: '#333333'
    },
    postContent: {
        width: '100%'
    },
    postText: {
        margin: 0,
        marginBottom: '15px',
        color: '#00000',
    },
    postAuthor: {
        color: '#3f51b5',
        textDecoration: 'none',
        transition: 'color 0.5s ease-in',
        cursor: 'pointer',
        '&:hover': {
            color: '#1d3ef9'
        }
    },
    postActions: {
        display: 'flex',
        justifyContent: 'center'
    },
    postLink: {
        textDecoration: 'none',
        padding: '10px 12px',
        background: '#5967b3',
        border: '2px solid #5967b3',
        borderRadius: '5px',
        color: '#fff',
        transition: 'all 0.4s ease-in',
        '&:hover': {
            background: '#5065d2'
        }
    },
    postError: {
      color: 'red'
    },
    accordionHeading: {
        fontWeight: '700'
    },
    accordionDetails: {
        flexDirection: 'column'
    },
    accordionTitle: {
        fontWeight: '500'
    },
    comment: {
        marginBottom: '10px',
        padding: '10px 20px',
        border: '2px dashed #B0DD38',
        borderRadius: '5px',
        background: '#f5f5f5',
        '&:last-child': {
            marginBottom: 0
        }
    },
    commentTitle: {
        marginBottom: '10px',
    },
    commentSubtitle: {
        fontSize: '14px'
    },
    commentContent: {
        color: '#00000'
    }

});

const PostInfo = props => {
    const {onLoadData} = props;

    useEffect(() => {
        onLoadData(props.match.params.id);
    }, [onLoadData, props.match.params.id])

    const classes = useStyles();


    const prepareStr = str => {
        return str.slice(0,1).toUpperCase() + str.slice(1);
    };


    //Accordion params
    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };


    //Comments info
    const commentsList = (
        <Box>
            <Accordion
                expanded={expanded === 'panel1'}
                onChange={handleChange('panel1')}
            >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                >
                    <Typography component="h5" className={classes.accordionTitle}>
                        Post Comments ({props.comments.length ? props.comments.length : 0})
                    </Typography>
                </AccordionSummary>
                <AccordionDetails className={classes.accordionDetails}>


                    {props.comments.length
                        ? props.comments.map((comment, index) => {
                            return (
                                <Box className={classes.comment} key={index}>
                                    <Typography component="h6" className={classes.commentTitle}>
                                        Name: <strong> {comment.name ? prepareStr(comment.name) : null}</strong>
                                    </Typography>

                                    <Box component="span" className={classes.commentSubtitle}>
                                        Email: <strong>{comment.email}</strong>
                                    </Box>

                                    <hr/>
                                    <Typography component="p" className={classes.commentContent}>
                                        {comment.body}
                                    </Typography>
                                </Box>
                            );
                        })

                        :  <Box className={classes.comment}>
                            <Typography component="h6" className={classes.postError}>
                                No comments!
                            </Typography>
                        </Box>
                    }

                </AccordionDetails>
            </Accordion>
        </Box>
    );



    const postInfo = (
        <Grid item lg={8} xs={12} offset={2}>
            <Card className={classes.post}
                  variant="outlined"
            >
                <CardContent className={classes.postContent} align="center">
                    <Typography variant="h4" className={classes.postTitle} color="textSecondary" gutterBottom>
                        {props.data.title ? prepareStr(props.data.title) : null}
                    </Typography>

                        <Typography component="p" className={classes.postText}>
                            {props.data.body}
                        </Typography>

                        <Box component="span">
                            Author: <strong>
                            <Link className={classes.postAuthor} to={`/users/${props.data.userId}`}>{props.author}</Link>
                        </strong>
                        </Box>
                </CardContent>

                <CardActions className={classes.postActions}>
                    <Link to={'/'} className={classes.postLink}>
                        Home Page
                    </Link>

                    <Link to={'/posts'} className={classes.postLink}>
                        Posts
                    </Link>

                </CardActions>
            </Card>

            {commentsList}

        </Grid>
    );

    return (
        <Container>
            <Grid container spacing={2} direction="row" alignItems="center" justify="center">
                {props.data.length !== 0
                    ? postInfo
                    : <Typography component="p" className={classes.postError}>
                        No post!
                    </Typography>
                }
            </Grid>
        </Container>
    );


}

const mapStateToProps = state => {
    return {
        data: state.postInfo.info,
        author: state.postInfo.author,
        comments: state.postInfo.comments
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onLoadData: id => dispatch(asyncLoadPostInfo(id))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(PostInfo);

