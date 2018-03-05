import './index.css'
import React, { Component } from 'react'
import subscribeToMessages from './messages'
import FadeIn from './FadeIn'

class PinScrollToBottom extends Component {
  //this is the imperative work we want to complete
  // window.scrollTo(0, document.documentElement.scrollHeight)
  // const{ scrollHeight, clientHeight, scrollTop } = document.documentElement

componentDidMount(){
   this.scroll()
}

componentDidUpdate(){ //updates everytime the component gets props or a new state
  if (!this.scrolledUp)
    this.scroll() //PinScrollToBottom doesn't have it's own state and instead gets it from App
}

componentWillUpdate(){//your chance to do anything before the next render happens, you can't set state (you'd use ComponentWillRecieveProps)
const { scrollHeight, scrollTop, clientHeight } = document.documentElement
  this.scrolledUp = scrollTop + clientHeight < scrollHeight // if the distance from the top plus the clientHeight is less than the scrollHeight
  //then that means the user has scrolledUp
}
scroll(){
  window.scrollTo(0, document.documentElement.scrollHeight) //this is the imperative part where automative scrolling happens
  //because on mount and update scroll is called

}
  render() {
    return this.props.children
  }
}

class App extends Component {
  state = {
    messages: []
  }

  componentDidMount() {
    subscribeToMessages((message) => {
      this.setState({
        messages: this.state.messages.concat([ message ])
       })
    })
  }

  render() {
    const { messages } = this.state
    return (
      <div className="app">
        <div className="link">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.youtube.com/watch?v=VKHFZBUTA4k&list=RDVKHFZBUTA4k"
          >Sketch on YouTube</a>
        </div>
        <PinScrollToBottom> 
          <ol className="messages">
            {messages.map((message, index) => (
              <FadeIn key={index}>
                <li className="message">
                  <div
                    className="avatar"
                    style={{ backgroundImage: `url(${message.avatar})`}}
                  />
                  <div className="text">{message.text}</div>
                </li>
              </FadeIn>
            ))}
          </ol>
        </PinScrollToBottom>
      </div>
    )
  }
}

export default App
