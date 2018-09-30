import React, { Component } from 'react';
import Axios from 'axios';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { parseDate } from './lib/date';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      conversations: [],
      selecting: false,
    };
  }

  componentDidMount() {
    Axios.get('https://5bb0ae166418d70014071bac.mockapi.io/api/v1/chat')
         .then(response => this.processData(response.data));
  }

  processData(data) {
    const conversations = data.map(item => ({
      ...item,
      date: parseDate(item.date),
      selected: false,
    }));
    this.setState({ conversations });
  }

  select(id) {
    const { conversations, selecting } = this.state;
    if (selecting) {
      this.setState({
        conversations: conversations.map(item => ({
          ...item,
          selected: item.id === id ? !item.selected : item.selected,
        }))
      })
    }
  }

  removeSelected() {
    const { conversations } = this.state;
    this.setState({
      selecting: false,
      conversations: conversations.map(item => ({
        ...item,
        selected: false,
      }))
    })
  }

  deleteChat() {
    const { conversations } = this.state;
    const id = conversations.reduce((acc, cur) => {
      if (cur.selected) {
        acc.push(cur.id);
      }
      return acc;
    }, []);

    // call deleting endpoint using id
    console.log({ id });
    this.deleteSelected();
  }

  deleteSelected() {
    const { conversations } = this.state;
    this.setState({
      selecting: false,
      conversations: conversations.filter(item => !item.selected),
    });
  }

  renderTrash() {
    const { conversations } = this.state;
    const selectedCount = conversations.reduce((acc, cur) => {
      if (cur.selected) {
        acc += 1;
      }
      return acc;
    }, 0);
    if (selectedCount > 0) {
      return (
        <FontAwesomeIcon
          icon="trash"
          color="white"
          onClick={() => this.deleteChat()}
          className="Selector"
          size="lg"
          style={{ marginRight: '10px' }}
        />
      )
    }
  }


  renderEdit() {
    const { selecting } = this.state;
    if (selecting) {
      return (
        <FontAwesomeIcon
          icon="times"
          color="white"
          onClick={() => this.removeSelected()}
          className="Selector"
          size="lg"
        />
      );
    } else {
      return (
        <FontAwesomeIcon
          icon="edit"
          color="white"
          onClick={() => this.setState({ selecting: true })}
          className="Selector"
          size="lg"
        />
      );
    }
  }

  render() {
    const { conversations, selecting } = this.state;
    return (
      <div className="container App-container">
        <header className="App-header row">
          <h1 className="App-title">Chat View</h1>
          <div>
            {this.renderTrash()}
            {this.renderEdit()}
          </div>
        </header>

        {conversations.map((item, index) => (
            <div
              className="Chat-container"
              style={{
                justifyContent: item.sent ? 'flex-end' : 'flex-start',
                backgroundColor: item.selected ? '#54d0f9' : 'transparent',
                cursor: selecting ? 'pointer' : 'default',
              }}
              onClick={() => this.select(item.id)}
              key={index.toString()}
            >
              <div className={"row Balloon " + (item.sent ? "Sent" : "Receive")}>
                {item.content}
                <span className="Date-container">{item.date}</span>
              </div>
            </div>
        ))}
      </div>
    );
  }
}

export default App;
