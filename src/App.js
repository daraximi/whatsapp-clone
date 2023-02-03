import { useEffect, useState } from 'react';
import './App.css';
import Chat from './Chat';
import Sidebar from './Sidebar';
import Pusher from 'pusher-js';
import axios from './axios.js';


function App() {
  const [messages, setMessages] = useState([]);
  
  useEffect(()=>
  {
    axios.get('/messages/sync').then(response =>{
      setMessages(response.data);

    })
  },[]);
  console.log(messages);





  useEffect(()=>{
    const pusher = new Pusher('3fffe69bddee4216f2fa', {
      cluster: 'mt1'
    });

    const channel = pusher.subscribe('messages');
    channel.bind('inserted',(newMessage)=> {
      //alert(JSON.stringify(newMessage));
      setMessages([...messages, newMessage]);

    });
    return ()=>{
      channel.unbind_all();
      channel.unsubscribe();
    }
  },[messages]);

  



  return (
    <div className="app">
      <div className='app__body'>
        {/** Sidebar */}
        <Sidebar/>

        {/**Chat component */}
        <Chat messages={messages}/>  
      </div>     
    </div>
  );
}

export default App;
