import React, { Component } from 'react';
import RocketCore from './RocketCore';

export function FunctionalRocket({initialLaunchTime}) {
   return <RocketCore initialLaunchTime={initialLaunchTime} />;
}

export class ClassRocket extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      initialLaunchTime: Date.now()
    };
  }

  componentDidMount(){
    setInterval(() => {
      this.setState({initialLaunchTime: Date.now()})
    }, 500)
  }

  render() {
    const { initialLaunchTime } = this.state;
    return <RocketCore initialLaunchTime={initialLaunchTime} />;
  }
}
