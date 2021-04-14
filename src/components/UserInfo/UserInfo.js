import React, {useEffect} from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import {Link} from 'react-router-dom';

import makeStyles from "@material-ui/core/styles/makeStyles";

import {connect} from 'react-redux';
import {asyncLoadUserInfo} from "../../redux/actions/actions";


import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Box from "@material-ui/core/Box";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Paper from "@material-ui/core/Paper";
import CardActions from "@material-ui/core/CardActions";



//Styles
const useStyles = makeStyles({

    info: {
        marginBottom: '15px',
        padding: '10px',
        display: 'flex',
        jusitfyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        background: '#f5f5f5'
    },
    infoTitle: {
        fontSize: '20px',
        fontWeight: '700',
        margin: 0,
        marginBottom: '15px',
        color: '#333333'
    },
    infoBlock: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '10px',
    },
    infoText: {
        margin: 0,
        color: '#00000',
    },
    infoContent: {
        width: '100%',
        '&:last-child': {
            padding: 10
        }
    },

    infoActions: {
        display: 'flex',
        justifyContent: 'center'
    },
    infoLink: {
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
    infoError: {
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
    table: {

    },
    tableContainer: {
        marginBottom: '20px'
    },
    tableTitle: {
        color: '#000',
        fontWeight: '700',
        textAlign: 'center',
        background: '#acb7c1d1'
    },
    tableCellTitle: {
        color: '#000',
        fontWeight: '500'
    },
    post: {
        padding: '10px 20px',
        marginBottom: '15px',
        display: 'flex',
        jusitfyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        transition: 'all 0.5s ease-in',
        border: '2px dashed #B0DD38',
        borderRadius: '5px',
        background: '#f5f5f5',
        '&:hover': {
            background: '#DADADA',
            cursor: 'pointer'
        },
        '&:last-child': {
            marginBottom: 0
        }
    },

    postTitle: {
        fontSize: '20px',
        fontWeight: 'bold',
        margin: 0
    },

    postContent: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 0,
        '&:last-child': {
            padding: 0
        }
    },
    postError: {
        color: 'red'
    }
});


//Table create td
function createData(name, descr) {
    return { name, descr};
}


const UserInfo = props => {

    const {onLoadData} = props;

    //Load users Info
    useEffect(( ) => {

     onLoadData(props.match.params.id);
    }, [onLoadData, props.match.params.id])

    //Use style
    const classes = useStyles();

    //Table content
    const rows = [
        createData('UserName', props.data.username),
        createData('Phone', props.data.phone),
        createData('Email', props.data.email),
        createData('WebSite', props.data.website)
    ];


    //Accordion params
    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    //Prepare Title
    const prepareStr = str => {
        return str.slice(0,1).toUpperCase() + str.slice(1);
    };

    //User Posts
    const userPosts = (
        <Box>
            <Accordion
                expanded={expanded === 'panel3'}
                onChange={handleChange('panel3')}
            >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel3bh-content"
                    id="panel3bh-header"
                >
                    <Typography component="h5" className={classes.accordionTitle}>
                        User Posts ({props.posts.length ?props.posts.length : 0})
                    </Typography>
                </AccordionSummary>
                <AccordionDetails className={classes.accordionDetails}>

                    {props.posts.length
                        ? props.posts.map((post, index) => {
                            return (
                                <Card className={classes.post}
                                      variant="outlined"
                                      onClick={() => props.history.push(`/posts/${post.id}`)}
                                      key={index}
                                >
                                    <CardContent className={classes.postContent}  align="center">
                                        <Typography variant="h4" className={classes.postTitle} color="textSecondary" gutterBottom>
                                            {post.title ? prepareStr(post.title) : null}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            );
                        })
                        : <Card className={classes.post}
                                variant="outlined"
                        >
                            <CardContent className={classes.postContent}  align="center">
                                <Typography variant="h4" className={classes.postError} color="textSecondary" gutterBottom>
                                    No posts!
                                </Typography>
                            </CardContent>
                        </Card>
                    }


                </AccordionDetails>
            </Accordion>
        </Box>
    );


    const infoCard = (<Grid item lg={8} xs={12} offset={2}>

        <Card className={classes.info}
              variant="outlined"
        >

            <CardContent className={classes.infoContent} align="center">
                <Typography variant="h4" className={classes.infoTitle} color="textSecondary" gutterBottom>
                    {props.data.name}
                </Typography>

                {/*TABLE INFO*/}
                <TableContainer component={Paper} className={classes.tableContainer}>
                    <Table className={classes.table} size="small" aria-label="info table">
                        <TableHead>
                            <TableRow>
                                <TableCell colSpan={2} className={classes.tableTitle}>Users Details Info</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow key={row.name}>
                                    <TableCell className={classes.tableCellTitle} component="th" scope="row">
                                        {row.name}
                                    </TableCell>
                                    <TableCell align="right">{row.descr}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                {/*END TABLE INFO*/}

                {/*Accordion Block*/}
                <Box>
                    {/*Address*/}
                    <Accordion
                        expanded={expanded === 'panel1'}
                        onChange={handleChange('panel1')}
                    >
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1bh-content"
                            id="panel1bh-header"
                        >
                            <Typography component="h5" className={classes.accordionTitle}>Address</Typography>
                        </AccordionSummary>
                        <AccordionDetails className={classes.accordionDetails}>

                            <Box className={classes.infoBlock}>
                                <Typography component="p" className={classes.infoText}>
                                    ZipCode:&nbsp;
                                </Typography>
                                <Box component="span"><strong> {props.data.address?.zipcode}</strong></Box>
                            </Box>


                            <Box className={classes.infoBlock}>
                                <Typography component="p" className={classes.infoText}>
                                    City:&nbsp;
                                </Typography>
                                <Box component="span"><strong> {props.data.address?.city}</strong></Box>
                            </Box>


                            <Box className={classes.infoBlock}>
                                <Typography component="p" className={classes.infoText}>
                                    Street:&nbsp;
                                </Typography>
                                <Box component="span"> <strong> {props.data.address?.street}</strong></Box>
                            </Box>


                            <Box className={classes.infoBlock}>
                                <Typography component="p" className={classes.infoText}>
                                    Suite:&nbsp;
                                </Typography>

                               <Box component="span"><strong> {props.data.address && props.data.address.suite}</strong></Box>
                            </Box>


                            <Box className={classes.infoBlock}>
                                <Typography component="p" className={classes.infoText}>
                                    Сoordinates:&nbsp;
                                </Typography>

                                <Typography component="p">
                                    <Box component="span">lat: <strong> {props.data.address?.geo?.lat}</strong></Box>
                                    <br/>
                                    <Box component="span">lng: <strong> {props.data.address?.geo?.lng}</strong></Box>
                                </Typography>
                            </Box>

                        </AccordionDetails>
                    </Accordion>
                    {/*END Address*/}

                    {/*Company*/}
                    <Accordion
                        expanded={expanded === 'panel2'}
                        onChange={handleChange('panel2')}
                    >
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel2bh-content"
                            id="panel2bh-header"
                        >
                            <Typography component="h5" className={classes.accordionTitle}>Company</Typography>
                        </AccordionSummary>
                        <AccordionDetails className={classes.accordionDetails}>
                            <Box className={classes.infoBlock}>
                                <Typography component="p" className={classes.infoText}>
                                    Name:&nbsp;
                                </Typography>

                                <Box component="span"><strong> {props.data.company?.name}</strong></Box>
                            </Box>

                            <Box className={classes.infoBlock}>
                                <Typography component="p" className={classes.infoText}>
                                    CatchPhrase:&nbsp;
                                </Typography>

                                <Box component="span"><strong> {props.data.company?.catchPhrase}</strong></Box>
                            </Box>

                            <Box className={classes.infoBlock}>
                                <Typography component="p" className={classes.infoText}>
                                    BS:&nbsp;
                                </Typography>

                                <Box component="span"><strong> {props.data.company?.bs}</strong></Box>
                            </Box>

                        </AccordionDetails>
                    </Accordion>
                    {/*END Company*/}
                </Box>
                {/*END Accordion Block*/}

            </CardContent>



            <CardActions className={classes.infoActions}>
               <Link to={'/'} className={classes.infoLink}>
                    Home Page
               </Link>

            </CardActions>
        </Card>

        {userPosts}

    </Grid>);



    return (
        <Container>
            <Grid container spacing={2} direction="row" alignItems="center" justify="center">

                {props.data.length !== 0
                ? infoCard
                : <Typography component="p" className={classes.infoError}>
                       No user information!
                    </Typography>
                }

            </Grid>
        </Container>
    );

}

const mapStateToProps = state => {
    return {
        data: state.userInfo.info,
        posts: state.userInfo.posts
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLoadData: id => dispatch(asyncLoadUserInfo(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserInfo);
