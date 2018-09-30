import React, { Component } from 'react';
import Axios from 'axios';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Balloon from './components/Balloon';
import Conversation from './data/Conversation';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      conversations: [],
      selecting: false,
    };

    this.conversations = new Conversation();
  }

  componentDidMount() {
    Axios.get('https://5bb0ae166418d70014071bac.mockapi.io/api/v1/chat')
         .then(response => {
           this.conversations.process(response.data);
           const { conversations } = this.conversations;
           this.setState({ conversations });
         });
  }

  select(id) {
    const { selecting } = this.state;
    if (selecting) {
      this.conversations.select(id);
      this.setState({ conversations: this.conversations.conversations });
    }
  }

  removeSelected() {
    this.conversations.removeSelected();
    this.setState({
      selecting: false,
      conversations: this.conversations.conversations,
    });
  }

  deleteChat() {
    const id = this.conversations.getSelectedId();

    // call deleting endpoint using id
    console.log({ id });
    this.deleteSelected();
  }

  deleteSelected() {
    this.conversations.deleteSelected();
    this.setState({
      selecting: false,
      conversations: this.conversations.conversations,
    });
  }

  renderTrash() {
    const selectedCount = this.conversations.countSelected();
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
          <Balloon
            {...item}
            selecting={selecting}
            key={index.toString()}
            onClick={() => this.select(item.id)}
          />
        ))}
      </div>
    );
  }
}

export default App;
