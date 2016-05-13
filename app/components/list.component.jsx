import React from 'react';
import CardComponent from './card.component';

class ListComponent extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let leftGroup = [],
        rightGroup = [];
    for (let i = 0, len = this.props.list.data.length; i < len; i++) {
      let item = <CardComponent data={this.props.list.data[i]} key={i}/>;
      if (!(i % 2)) {
        leftGroup.push(item);
      } else {
        rightGroup.push(item);
      }
    }

    return (
      <div className="app-list">
        {!this.props.list.loading ?
        <div className="list-content">
          <div className="left-container">
            {leftGroup}
          </div>
          <div className="right-container">
            {rightGroup}
          </div>
        </div>
        : <div className="list-loading">
          <img className="loading-svg" src="assets/svg/loading-spokes.svg" alt="loading"/>
        </div>
        }
      </div>
    );
  }
}

ListComponent.propTypes = {
  list: React.PropTypes.shape({
    data: React.PropTypes.array,
    loading: React.PropTypes.bool
  })
};

export default ListComponent;