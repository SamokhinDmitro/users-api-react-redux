import React, {useEffect} from "react";
import Auxilialy from "../../hoc/Auxilialy";

import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";

import {asyncLoadUsers, setSearchUsersName} from "../../redux/actions/actions";

import {connect} from 'react-redux';
import User from "./User/User";
import TextField from "@material-ui/core/TextField";
import makeStyles from "@material-ui/core/styles/makeStyles";


const useStyles = makeStyles({

    searchContainer: {
        width: '100%',
    },
    searchInput: {
        width: '100%',
    }
});

const Home = props => {

    const classes = useStyles();

    //Декомпозиция метода загрузки данных - обходим предупреждение в useEffect
    const {onLoadUsers} = props;

    //Аналог componentDidMount - useEffect()
    useEffect( () => {
        onLoadUsers();
    }, [onLoadUsers]);


    //FilterStatus
    let status = false;

    return (
       <Auxilialy>
           <Container>
               <Grid container spacing={2} direction="column" alignItems="center">

                   <Grid item lg={3} className={classes.searchContainer}>
                           <TextField
                               id="search-block"
                               label="Search User"
                               defaultValue={props.searchTitle}
                               variant="outlined"
                               className={classes.searchInput}
                               onInput={props.onSearchName}
                           />
                   </Grid>


                   {props.data.length
                       ? props.data.map((item, index) => {

                           // Filter Users
                          if(item.name.search(props.searchName.trim()) === -1){
                              status = true;
                          }else{
                              status = false;
                          }
                          // End Filter Users

                           return (
                               <User key={index} status={status} name={item.name} id={item.id}/>
                           );
                       })
                       : <User name={'No users!'}/>
                   }

               </Grid>
           </Container>
       </Auxilialy>
    );
}

const mapStateToProps = state => {
    return {
        data: state.users.data,
        searchName: state.users.searchName
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSearchName: event => {
            dispatch(setSearchUsersName(event.target.value))
        },
        onLoadUsers: () =>  dispatch(asyncLoadUsers())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
