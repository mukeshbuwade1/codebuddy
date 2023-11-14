import React from 'react';
import {
  View,
  ActivityIndicator,
  StyleSheet,
  Dimensions,
} from 'react-native';
import colors from '../assets/colors';

const {width,height} = Dimensions.get("window")

interface LoaderProps {
  showLoader: boolean;
}

const Loader = ({ showLoader }: LoaderProps) => {
  return showLoader ? (
    <View style={styles.container}>
      <ActivityIndicator
        size={'small'}
        style={styles.indicator}
        color={colors.primary}
      />
    </View>
  ) : null;
};

export default Loader;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: width,
    height: height,
    justifyContent: 'center',
    alignItems: 'center',
    opacity: 0.7,
    backgroundColor: '#000',
    zIndex: 8,
  },
  indicator: { transform: [{ scaleX: 2 }, { scaleY: 2 }] },
});
