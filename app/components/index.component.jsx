import React from 'react';
import NavigationComponent from './navigation.component';
import BannerComponent from './banner.component';
import ListComponent from './list.component';
import fetch from 'isomorphic-fetch';
import config from '../config/app.config';

class IndexComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      banner: [],
      list: {
        data: [],
        loading: true
      }
    };
  }

  getCardWidth() {
    let bodyWidth = document.body.clientWidth,
        htmlDom = document.querySelector('html'),
        rootFontSize = window.getComputedStyle(htmlDom).fontSize.match(/\d+/)[0];

    return ((bodyWidth - 3 * rootFontSize) / 2 * window.devicePixelRatio).toFixed(0)
  }

  componentDidMount() {
    setTimeout(() => {
      fetch(`${config.server_url}/list.json`,{
        method: 'GET'
      }).then(res => res.json()).then(res => {
        return Promise.all(res.map(item => {
          return new Promise((resolve, reject)=> {
            let img = new Image();
            item.imageUrl = img.src = `${item.imageUrl}?imageView2/1/w/${this.getCardWidth()}/h/${this.getCardWidth()}`;
            img.onload = img.onerror = () => {
              resolve(item);
            }
          });
        }));
      }).then((res) => {
        this.setState({
          list: {
            data: res,
            loading: false
          }
        });
        this.windowScroll();
      }).catch(err => {
        console.log(err);
      });
    }, 300);

  }

  windowScroll() {
    //more
    let windowHeight = window.document.body.offsetHeight,
      screenHeight = window.screen.availHeight,
      switchOff = false;

    window.addEventListener('scroll', () => {
      if (switchOff) return;
      let scrollTop = window.document.body.scrollTop;

      if (scrollTop > windowHeight - screenHeight - 50) {
        switchOff = true;
        fetch(`${config.server_url}/list.json`,{
          method: 'GET'
        }).then(res => res.json()).then(res => {
          return Promise.all(res.map(item => {
            return new Promise((resolve, reject)=> {
              let img = new Image();
              item.imageUrl = img.src = `${item.imageUrl}?imageView2/1/w/${this.getCardWidth()}/h/${this.getCardWidth()}`;
              img.onload = img.onerror = () => {
                resolve(item);
              }
            });
          }));
        }).then(res => {
          this.setState({
            list: {
              data: [].concat(this.state.list.data, res)
            }
          });
        }).catch(err => {
          console.log(err);
        });
      }
    });
  }

  render() {
    return (
      <div>
        <NavigationComponent />
        <BannerComponent />
        <ListComponent list={this.state.list} />
      </div>
    );
  }
}

export default IndexComponent;