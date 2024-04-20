import React, { Component } from 'react'
import axios from 'axios'

export default class PostDetails extends Component {
  constructor(props){
    super(props);
    this.state={
      post:{}
    };
  }

componentDidMount(){
  const id = this.props.match.params.id;
  axios.get(`/post/${id}`).then((res) => {
    if(res.data.success){
      this.setState({
        post:res.data.post
      });
      console.log(this.state.post);
    }
  });
}

  render() {
    const {topic,description,postCategory} = this.state.post
    return (
      <div>
        <h4>{topic}</h4>
        <h2>{description}</h2>
        <h1>{postCategory}</h1>
      </div>
    )
  }
}
