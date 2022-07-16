import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

import Chat from './Chat';
import './Live.css';
import v from './video.mp4'

function Live()  {
//   constructor(props) {
//     super(props);

//     this.state = {
//       loading: true,
//       exists: false,
//       live: false
//     };
//     this.checkUserLive = this.checkUserLive.bind(this);
//   }

//   async componentDidMount() {
//     try {
//       await this.checkUserExists();
//     } catch (e) {
//       console.error(e);
//     }
//     this.interval = setInterval(this.checkUserLive, 10000);
//   }

//   componentWillUnmount() {
//     clearInterval(this.interval);
//   }

//   checkUserExists() {
//     fetch('https://streamcaster.me/api/check_user_exists', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({
//         username: this.props.match.params.username
//       }),
//       credentials: 'same-origin'
//     })
//     .then(response => response.json())
//     .then(responseJson => {
//       if (responseJson.response === 'User exists') {
//         this.setState({ exists: true });
//         this.checkUserLive();
//       } else {
//         this.setState({ loading: false });
//       }
//     })
//     .catch((error) => {
//       console.error(error);
//     });
//   }

//   checkUserLive() {
//     fetch('https://streamcaster.me/api/check_user_live', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({
//         username: this.props.match.params.username
//       }),
//       credentials: 'same-origin'
//     })
//     .then(response => response.json())
//     .then(responseJson => {
//       if (responseJson.response === 'User live') {
//         this.setState({ live: true, loading: false });
//       } else {
//         this.setState({ live: false, loading: false });
//       }
//     })
//     .catch((error) => {
//       console.error(error);
//     });
//   }

//  render() {
//     const videoJsOptions = {
//       sources: [{
//         src: '/source/' + this.props.match.params.username + '.m3u8',
//         type: 'application/x-mpegurl'
//       }],
//       autoplay: true,
//       controls: true,
//       preload: 'auto',
//       aspectRatio: '16:9'
//     }
    return (
      <div className="Live1">
        
           
            <div className='video'>
                <div className='video-container'>
                   <div>Video</div>
                </div>
                <div className='video-heading'>
                    <div className='video-title'>
                      <h1>Your Live Streaming</h1>
                      <h3>Description</h3>
                    </div>
                    <div className='Follow-button'>
                        Subscribe
                    </div>
                </div>
            </div>
                  <div className='chat-container'>
                    <Chat authenticated={true} username={'prateek'} stream={true} />
                  </div>
               
              
           
        
      </div>
    );
  
  }

  export default Live;