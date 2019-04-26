import React, { useEffect, useRef, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import { Input } from '../../components/Input/Input-style';
import { Button } from '../../components/Button/Button-style';
import { Wrapper } from '../../components/Wrapper/Wrapper-style';
import { Message } from '../../components/Message/Message-style';
import { Header } from '../../components/Header/Header-style';
import { Form } from '../../components/Form/Form-style';
import firebase from '../../jsModules/firebase';
import SimpleCrypto from "simple-crypto-js";

let fb_Messages;
let fb_MessagesOrdered;
let fb_Secret;
let crypto;
let encryptTest = 'can you read me';

const Chat = props => {
  const secretInput = useRef('');
  const messageInput = useRef('');
  const messagesWrapper = useRef('');
  const [messages, setMessages] = useState([]);
  const [messageVal, setMessageVal] = useState('');
  const [secretVal, setSecretVal] = useState('');
  const [pwError, setPwError] = useState(false);
  
  const reset = () => {
    if (fb_MessagesOrdered) {
      fb_MessagesOrdered.off();
      fb_MessagesOrdered = null;
    }
    fb_Secret = null;
    crypto = null;
  }

  const initFirebase = () => {
    if (!crypto) { crypto = new SimpleCrypto(secretVal); }

    fb_MessagesOrdered = fb_Messages.orderByChild('timestamp');
    
    fb_MessagesOrdered.on('value',(snapshot) => {
      const snapshotVal = snapshot.val();
      if (snapshotVal) {
        const msgArr = [];
        for (let msg in snapshotVal) {
          const decryptedMsg = crypto.decrypt(snapshotVal[msg].message);
          msgArr.push(decryptedMsg);
        }
        setMessages(msgArr);
  
      } 
    });
  };

  useEffect(() => {
    document.querySelector('html').scrollTop = messagesWrapper.current.scrollHeight;
  }, [messages]);


  useEffect(() => {
    if (secretInput.current) { secretInput.current.focus(); }
    if (messageInput.current) { messageInput.current.focus(); }
  });


  useEffect(() => {
    props.saveSecret('');
    fb_Messages = firebase.database().ref('/' + props.match.params.id + '/messages');
    fb_Secret = firebase.database().ref('/' + props.match.params.id + '/secret');

    if (!props.match.params.exists) {
      fb_Messages.once('value', (snapshot) => {
        if (snapshot.val()) {
          props.history.push('/chat/' + props.match.params.id + '/true');
        }
      });
    }

    return () => {
      reset();
      fb_Messages = null;
    }
    
  }, []);

  const back = () => {
    props.history.push('/');
  }

  const setSecret = () => {
    if (secretVal.length > 0) {
      props.saveSecret(secretVal);
      initFirebase();
      props.history.push('/chat/' + props.match.params.id + '/true');
    }
  };

  const sendMessage = event => {
    event.preventDefault();
    const time = new Date().getTime();
    setMessages(messages.push(messageVal));

    if (messageVal.length > 0) {
      fb_Messages.push({
        message: crypto.encrypt(messageVal),
        time: time
      });
      setMessageVal('');
    }
  };

  

  const createChatRoom = (event) => {
    event.preventDefault();
    setSecret();
    const crypto = new SimpleCrypto(secretVal);
    const testString = crypto.encrypt(encryptTest);
    fb_Secret.set(testString);
  };

  const checkPassword = (event) => {
    event.preventDefault();
    const crypto = new SimpleCrypto(secretVal);
    fb_Secret.once('value', snapshot => {
      const snapshotVal = snapshot.val();
      if (snapshotVal) {
        const testString = crypto.decrypt(snapshotVal);
        const error = testString !== encryptTest; 
        setPwError(error);
        if (!error) {
          setSecret();
        }
      }
    });

  };

  const allMessages = (
    <Wrapper messagesMain>
      <Wrapper messages ref={messagesWrapper}>
        { messages.length > 0 ? messages.map((elm,index)  => {
          return (<Message key={index}>{elm}</Message>)
        }) : null }
      </Wrapper>
      <Form onSubmit={sendMessage} main>
        <Input ref={messageInput} value={messageVal} onChange={(e) => setMessageVal(e.target.value)} type="text" />
        <Button type="submit" main>Send</Button> 
      </Form>
    </Wrapper>
  );

  const passwordForm = (
    <Wrapper inputForm>
      <p><b>Please insert Password</b></p>
      <Form onSubmit={checkPassword}>
        <Input ref={secretInput} value={secretVal} onChange={(e) => setSecretVal(e.target.value)} type="text" />
        <Button type="submit">Set</Button> 
      </Form>
    </Wrapper>
  ); 


  const secretForm = (
    <Wrapper inputForm>
      <p><b>Set a secret password</b></p>
      <Form onSubmit={createChatRoom}>
        <Input ref={secretInput} value={secretVal} onChange={(e) => setSecretVal(e.target.value)} type="text" />
        <Button type="submit">Set</Button> 
      </Form>
    </Wrapper>
  );


  return (
    <Wrapper>
      <Header>
        <Button onClick={back} back>Back</Button>
      </Header>
      { props.match.params.exists ? 
        (props.secret && !pwError ? allMessages : passwordForm) : 
        secretForm
      }
      { pwError ? <p>Wrong Password</p> : null }
    </Wrapper>
  );
}


const mapStateToProps = state => {
  return {
    secret: state.chat.secret
  }
}

const mapDispatchToProps = dispatch => {
  return {
    saveSecret: data => dispatch(actions.saveSecret(data))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(Chat));