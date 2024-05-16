import React from "react";
import { Overlay } from "react-native-elements";
import { styles } from "./Modal.styles";

const Modal = ({ show, close, children }) => (
  <Overlay
    isVisible={show || false}
    overlayStyle={styles.overlay}
    onBackdropPress={close}
  >
    {children}
  </Overlay>
);

export { Modal };
