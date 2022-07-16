
import { Panel, Form, FormGroup, FormControl, Button, Badge, Tooltip, OverlayTrigger } from 'react-bootstrap';
import React, { useEffect, useState } from 'react'
import './Chat.css'
import ScrollToBottom from "react-scroll-to-bottom";


function Chat() {

    const [currentMessage, setCurrentMessage] = useState("");
    const [messageList, setMessageList] = useState([]);

    const sendMessage = async(e) => {
        e.preventDefault();
        if(currentMessage!==""){
            const messageData = {
               
                author: 'prateek',
                message: currentMessage,
                
            }
    
            setMessageList((list) => [...list, messageData]);
            setCurrentMessage("");
        }
    }

    // useEffect(() => {
    //     socket.on("receive_message", (data) => {
    //         setMessageList((list) => [...list, data]);
    //     })
    // }, [socket])
    const viewersTooltip = (
        <Tooltip id="viewersTooltip">
          Viewers
        </Tooltip>
      );

  return (
    <div className='Chat' >
    <div className='panel'>
        <div className='panel-heading'>
            Live Chat
        </div>
        <div className='panel-body'>
        <div>
           
            {messageList.map((messageContent) => 
                 <div key={messageContent.author + messageContent.message + messageContent.time}><p id="chat-username">{messageContent.author}:</p><p id="chat-message"> {messageContent.message}</p></div>
                 )}
                {/* // <div className='message' >
                //     <div>
                //         <div className='messageContent'>
                //             <p>{messageContent.message}</p>
                //         </div>
                //         <div className='messageMeta'>
                //             <p id="time">{messageContent.time}</p>
                //             <p id="author">{messageContent.author}</p>
                //         </div>
                //     </div>
                // </div> */}
          
            
        </div>
        </div>
        <div className='panel-footer'>
        <form className='chatFooter'>
            <input className='footer-input' value={currentMessage} type="text" placeholder="Type a message..." onChange={(e) => setCurrentMessage(e.target.value)} />
            <button type="submit" onClick={sendMessage}>&#9658;</button>
        </form>
    </div>
    </div>
    </div>
  )
}

export default Chat
