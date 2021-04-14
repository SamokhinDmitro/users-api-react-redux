import React, {useEffect} from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import {connect} from 'react-redux';

import {asyncLoadPosts} from "../../redux/actions/actions";
import Post from "./Post/Post";





const Posts = props => {

    const {onLoadPosts} = props;

    //Загрузка постов
    useEffect(() => {
        onLoadPosts()
    }, [onLoadPosts])


    return (
        <Container>
            <Grid container spacing={2} direction="column" alignItems="center" justify="center">

                {props.posts.length
                    ? props.posts.map((item, index) => {
                        return (
                            <Post key={index} title={item.title} author={item.userId} id={item.id}/>
                            )
                    })
                    : <h2>No posts</h2>
                }
            </Grid>
        </Container>
    );


}

const mapStateToProps = state => {

    return {
        posts: state.posts.posts,
        title: state.posts.postTitle
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLoadPosts: () => dispatch(asyncLoadPosts())
    }
}

export default connect(mapStateToProps, mapDispatchToProps )(Posts);
