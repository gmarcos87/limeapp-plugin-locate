import { h, Component } from 'preact';

export class LocateMenu extends Component {
  render() {
    return (<a href={'#/locate'}>{window.I18n.t('Locate')}</a>);
  }
}