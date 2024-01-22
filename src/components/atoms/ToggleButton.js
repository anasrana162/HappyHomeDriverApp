import {Text} from 'react-native';
import React from 'react';
import ToggleSwitch from 'toggle-switch-react-native';
import {globals} from '../../styles/gobalStyles';
import {COLOR} from '../../assets';
import Box from './Box';

const ToggleButton = ({
  label,
  isOn,
  lang,
  onToggle,
  w,
  onColor,
  offColor,
  bg,
}) => (
  <Box mv={8} w={w} fd={lang === 'ar' ? 'row-reverse' : 'row'} bg={bg}>
    <Text style={globals.fontReg}>{label}</Text>
    <ToggleSwitch
      size="medium"
      isOn={isOn}
      onColor={onColor}
      offColor={offColor}
      onToggle={onToggle}
    />
  </Box>
);

export default ToggleButton;
