import React from 'react';

import { connect } from 'react-redux';

import './MessageList.css';

import getNewDate from '../../../utils/newDate';

const MessageList = ({ messages, username }) => {
  let length = messages.length;
  if (length > 10) length = 10;
  return (<div className="main-page_message-contener">
    {Array.from({ length }, () => null).map((message, index) => {
      let messageBlockClass = ["main-page_message-block", "main-page_message-text"];
      if (messages[index].from === username) {
        messageBlockClass = ["main-page_message-block__own", "main-page_message-text__own"];
      }
      return (
        <div key={messages[index].id} className={messageBlockClass[0]}>
          <h4>{messages[index].from} ({getNewDate(messages[index].time)})</h4>
          <div className={messageBlockClass[1]}><p>{messages[index].message}</p></div>
        </div>
      );
    }
    )}
  </div>)
}

const mapStateToProps = state => ({
  messages: state.messages,
  username: state.username,
});

export default connect(mapStateToProps)(MessageList);
