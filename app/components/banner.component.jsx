import React from 'react';

class BannerComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      height: this.getBannerWidth()
    }
  }
  resizeHeight() {
    this.setState({
      height: this.getBannerWidth()
    })
  }
  getBannerWidth() {
    let bodyWidth = document.body.clientWidth,
      htmlDom = document.querySelector('html'),
      rootFontSize = window.getComputedStyle(htmlDom).fontSize.match(/\d+/)[0];

    return ((bodyWidth - 3 * rootFontSize) / 3 * 2).toFixed(0) + 'px'
  }
  componentDidMount() {
    window.addEventListener('resize', () => {
      if (window.requestAnimationFrame) {
        window.requestAnimationFrame(this.resizeHeight.bind(this));
      } else {
        setTimeout(this.resizeHeight.bind(this), 66);
      }
    });
  }
  render() {
    return (
      <div className="app-banner">
        <div className="banner-content" style={{height: this.state.height}}></div>
      </div>
    );
  }
}

export default BannerComponent;