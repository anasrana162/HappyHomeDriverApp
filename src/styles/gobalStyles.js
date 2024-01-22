import { StyleSheet } from 'react-native';
import { COLOR, FONT } from '../assets';

export const globals = StyleSheet.create({
  mainWrpr: {
    flex: 1,
    backgroundColor: COLOR.L_grey,
    alignItems: 'center',
  },
  fontReg: {
    fontFamily: FONT.fontReg,
    color: COLOR.black,
  },
  fontBold: {
    fontFamily: FONT.fontBold,
    color: COLOR.black,
  },
  footerBTNcontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    borderWidth: 1,
    bottom: 0,
    backgroundColor: COLOR.white,
    borderColor: '#ddd',
  },
  // ==============AUTH SCREENS===============
  authMain: {
    width: '100%',
    height: '100%',
    rowGap: 50,
    backgroundColor: COLOR.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  authContainer: {
    width: '100%',
    alignItems: 'center',
  },
  // ==============AUTH SCREENS===============

  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  rotate180: { transform: [{ rotate: '180deg' }] },
  rotate0: { transform: [{ rotate: '0deg' }] }
});
