import React from 'react';
import { Link, Switch, Route } from "react-router-dom";
import routes from '../routes';

class App extends React.Component {
  state = {
    num: 0,
    name: 'wyz',
  }
  say = () => {
    this.setState({
      name: '我是传奇 振'
    })
  }
  render() {
    return (
      <div>
        <h1>react ssr {this.state.name}</h1>
        <div>
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
        </div>
        <p>ok， amazing！！</p>
        <button onClick={this.say}>名字</button>
        <Switch>
          {
            routes.map(route => <Route key={route.path} { ...route } />)
          }
        </Switch>
      </div>
    )
  }
}

export default App;