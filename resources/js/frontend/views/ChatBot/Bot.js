import React, { Component } from 'react';

import { Interactions } from 'aws-amplify';
import { ChatFeed, Message } from 'react-chat-ui'

class Justin extends Component {
  constructor(props)
  {
      super(props);
      this.state = ({
        input: '',
        finalMessage: '',
        messages: [
          new Message({
            id: 1,
            message: "Hello, say Hi or Hellp :D",
          })
        ]
      });
      this.onChange = this.onChange.bind(this);
      this._handleKeyPress = this._handleKeyPress.bind(this);
      this.submitMessage = this.submitMessage.bind(this);

  }
  _handleKeyPress(e){
    if (e.key === 'Enter') {
      this.submitMessage()
    }
  }
  onChange(e) {
    const input = e.target.value
    this.setState({
      input
    })
  }
  async submitMessage() {
    const { input } = this.state
    if (input === '') return
    const message = new Message({
      id: 0,
      message: input,
    })
    let messages = [...this.state.messages, message]

    this.setState({
      messages,
      input: ''
    })
    const response = await Interactions.send("Justin", input);
    const responseMessage = new Message({
      id: 1,
      message: response.message,
    })
    messages  = [...this.state.messages, responseMessage]
    this.setState({ messages })

    if (response.dialogState === 'Fulfilled') {
        const finalMessage = `Hi, sorry if I didn't understand you... If you want to talk with somebody real I recomend <a>Samaritans</a>`
        this.setState({ finalMessage })
      
    }
  }
  render() {
    return (
      <div className="App">
        <header style={styles.header}>
          <p style={styles.headerTitle}>Hi I am Justin!</p>
        </header>
        <div style={styles.messagesContainer}>
        <h2>{this.state.finalMessage}</h2>
        <ChatFeed
          messages={this.state.messages}
          hasInputField={false}
          bubbleStyles={styles.bubbleStyles}
        />

        <input
          onKeyPress={this._handleKeyPress}
          onChange={this.onChange.bind(this)}
          style={styles.input}
          value={this.state.input}
        />
        </div>
      </div>
    );
  }
}

const styles = {
  bubbleStyles: {
    text: {
      fontSize: 16,
    },
    chatbubble: {
      borderRadius: 30,
      padding: 10
    }
  },
  headerTitle: {
    color: 'white',
    fontSize: 22
  },
  header: {
    backgroundColor: 'rgb(0, 132, 255)',
    padding: 20,
    borderTop: '12px solid rgb(204, 204, 204)'
  },
  messagesContainer: {
    display: 'flex',
    flexDirection: 'column',
    padding: 10,
    alignItems: 'center'
  },
  input: {
    fontSize: 16,
    padding: 10,
    outline: 'none',
    width: 350,
    border: 'none',
    borderBottom: '2px solid rgb(0, 132, 255)'
  }
}

export default Justin