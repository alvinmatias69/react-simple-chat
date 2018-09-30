import React from 'react';
import './Balloon.css';

const Balloon = props => (
  <div
    className="Chat-container"
    style={{
      justifyContent: props.sent ? 'flex-end' : 'flex-start',
      backgroundColor: props.selected ? '#54d0f9' : 'transparent',
      cursor: props.selecting ? 'pointer' : 'default',
    }}
    onClick={props.onClick}
  >
    <div className={"row Balloon " + (props.sent ? "Sent" : "Receive")}>
      {props.content}
      <span className="Date-container">{props.date}</span>
    </div>
  </div>
);

export default Balloon;