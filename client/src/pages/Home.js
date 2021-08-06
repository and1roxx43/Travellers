import React, { useContext } from 'react';
import { useQuery } from '@apollo/client';
import { Grid, Transition, Header, Image } from 'semantic-ui-react';

import { AuthContext } from '../context/auth';

import PostCard from '../components/PostCard';
import PostForm from '../components/PostForm';
import { FETCH_POSTS_QUERY } from '../util/graphql';
import "./Home.css"

function Home() {
  const { loading, _, data } = useQuery(FETCH_POSTS_QUERY);
  const { user } = useContext(AuthContext);

  return (
    <Grid columns={5}>
        <Header style={{fontFamily: "cursive"}} as='h2' color='purple' textAlign='center'>
        WHAT'S ON YOUR MIND!!!
        </Header>
      <Grid.Row className="page-title" style={{width:"100%"}}>
         
         {/* logo to go here */}
          <Image></Image>
      </Grid.Row>
      <Grid.Row>
        {user && (
          <Grid.Column>
            <PostForm />
          </Grid.Column>
        )}
        {loading ? (
          <h1>Loading posts...</h1>
        ) : (
          <Transition.Group>
            {data.getPosts &&
              data.getPosts.map((post) => (
                <Grid.Column key={post.id} style={{margin: "2px"}}>
                  <PostCard post={post} />
                </Grid.Column>
              ))}
          </Transition.Group>
        )}
      </Grid.Row>
    </Grid>
  );
}

export default Home;
