import React from 'react';
import { withRouter } from 'react-router-dom';
import generateHash from '../../jsModules/generateHash';
import { Button } from '../../components/Button/Button-style';
import { Wrapper } from '../../components/Wrapper/Wrapper-style';

const Home = props => {
  
  const newChat = () => {
    props.history.push('/chat/' + generateHash());
  }

  return (
    <Wrapper>
      <Button onClick={newChat}>Create new Chat</Button>
    </Wrapper>
  );
}


export default withRouter(Home);