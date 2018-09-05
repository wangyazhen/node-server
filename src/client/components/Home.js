import React from "react";
import { fetchTags } from '../../action';
import { connect } from 'react-redux';

class Home extends React.Component {
  componentDidMount() {
    console.log('这里是 home did mount ', this.props.tags.length);
    if (this.props.tags.length <= 0) {
      console.log('发起', fetchTags());
      this.props.dispatch(fetchTags());
    }
  }
  
  render() {
    const { tags } = this.props;
    console.log('组件中tags :', tags.length);
    return (
      <div>        
        <h3>Welcome 首页</h3>
        <p>标签列表</p>
        <ul>
          {
            tags.map(tag => (<li key={tag.id}>{tag.name}</li>))
          }
        </ul>
      </div>
    );
  }
}

Home.serverFatch = fetchTags;

export default connect((state) => ({ tags: state.main.tags }))(Home);
