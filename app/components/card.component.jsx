import React from 'react';

class CardComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: this.getCardWidth()
    };
  }
  getCardWidth() {
    let bodyWidth = document.body.clientWidth,
        listDom = document.querySelector('.app-list');

    let paddingLeft = parseInt(window.getComputedStyle(listDom).paddingLeft.match(/\d+/)[0]);
    return (bodyWidth - 3 * paddingLeft) / 2
  }
  render() {
    return (
      <div className="app-card">
        <div className="card-img-container">
          <div className="img-container">
            <img className="card-img"
             src={this.props.data.imageUrl}/>
          </div>
          <div className="img-mask">
            <p className="card-datetime">
              <span className="time">15:26</span>
              <span className="date">25.Feb.2016</span>
            </p>
            <p className="card-location">
              <span className="iconfont icon-dingwei"></span>
              <span className="item">{this.props.data.location.level1}</span>
              <span className="item">{this.props.data.location.level2}</span>
              <span className="item">{this.props.data.location.level3}</span>
            </p>
          </div>
        </div>
        <div className="card-bottom">
          <div className="card-description">
            {this.props.data.description}
          </div>
          <div className="card-user">
            <img className="card-user-avatar" src={this.props.data.user.avatar}/>
            <p className="card-user-name">{this.props.data.user.name}</p>
          </div>
        </div>
      </div>
    );
  }
}

CardComponent.propTypes = {
  data: React.PropTypes.object
};

export default CardComponent;