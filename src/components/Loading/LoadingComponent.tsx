import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import LoadingManager from './LoadingManager';

import Spinner from 'react-native-loading-spinner-overlay';
import colors from 'assets/colors';

const TIMEOUT = 10000;
export function showLoading() {
  const ref: any = LoadingManager.getDefault();
  if (ref) {
    ref?.current?.showLoading();
  }
}

export function hideLoading() {
  const ref = LoadingManager.getDefault();
  if (ref) {
    ref?.current?.hideLoading();
  }
}
interface Props {}
interface State {
  visible: boolean;
}
class LoadingComponent extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      visible: false,
    };
  }
  showLoading = () => {
    this.setState({visible: true}, () => {
      setTimeout(() => {
        this.setState({visible: false});
      }, TIMEOUT);
    });
  };

  hideLoading = () => {
    this.setState({visible: false});
  };
  render() {
    return (
      <Spinner
        visible={this.state.visible}
        textContent={''}
        color={colors.white}
        textStyle={styles.spinnerTextStyle}
      />
    );
  }
}

export default LoadingComponent;

const styles = StyleSheet.create({
  spinnerTextStyle: {
    color: colors.primary,
  },
});
