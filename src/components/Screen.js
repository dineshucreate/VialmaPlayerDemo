import {Component} from 'react';

export default class Screen extends Component {
  navigateTo = (path, params) => {
    this.props.navigation.navigate(path, params);
  };
}
