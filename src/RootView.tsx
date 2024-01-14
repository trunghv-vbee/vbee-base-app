import {InternetConnection} from 'components/InternetConnection';
import UpdateApp from 'components/UpdateApp';
import React, {ReactNode} from 'react';
import {LogBox, StyleSheet, View} from 'react-native';
LogBox.ignoreLogs(['Remote debugger']);
interface Props {
  children?: ReactNode;
}
const RootView = ({children}: Props) => {
  return (
    <View style={[styles.container]}>
      {!__DEV__ && <UpdateApp />}
      {children}
      {/* <PushController /> */}
      <InternetConnection />
    </View>
  );
};

export default RootView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
