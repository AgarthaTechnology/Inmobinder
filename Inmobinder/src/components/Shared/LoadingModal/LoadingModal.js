import React from "react";
import { View } from "react-native";
import { Overlay, Text, Icon } from "react-native-elements";
import { styles } from "./LoadingModal.styles";

export function LoadingModal(props) {
  const { show, text } = props;

  return (
    <Overlay isVisible={show} overlayStyle={styles.overlay}>
      <View style={styles.view}>
        <Icon
          name="home"
          type="font-awesome"
          size={50}
          color="#00a680"
          style={styles.icon}
        />
        {text && <Text style={styles.text}>{text}</Text>}
      </View>
    </Overlay>
  );
}

LoadingModal.defaultProps = {
  show: false,
};
