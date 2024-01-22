import { View, Text, Image, StyleSheet } from 'react-native';
import React from 'react';
import { ASSETS, COLOR, FONT } from '../assets';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import { SafeAreaView } from 'react-native-safe-area-context';
import Settings from '../screens/setting';
import Navigator from './Navigator';
import { languageHandler, selectLanguage } from '../redux/languageSlice';
import { useDispatch, useSelector } from 'react-redux';
import { globals } from '../styles/gobalStyles';
import ToggleButton from '../components/atoms/ToggleButton';
import '../../assets/i18n/i18n';
import { useTranslation } from 'react-i18next';
import Box from '../components/atoms/Box';
import { logoutUser, selectUser } from '../redux/authSlice';
import { DrawerActions } from '@react-navigation/native';
import { deleteSetting, selectSetting } from '../redux/settingSlice';

const Drawer = createDrawerNavigator();

const DrawerNav = () => {
  const lang = useSelector(selectLanguage);
  const { t } = useTranslation();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Drawer.Navigator
        drawerContent={props => (
          <CustomDrawerContent {...props} loadLang={lang} />
        )}
        screenOptions={{
          keyboardDismissMode: 'none',
          drawerStyle: { backgroundColor: COLOR.L_grey, width: '60%' },
          drawerActiveTintColor: COLOR.primary,
          drawerInactiveTintColor: COLOR.black,
          drawerPosition: lang === 'ar' ? 'right' : 'left',
          headerShown: false,
        }}>
        <Drawer.Screen
          options={{
            swipeEnabled: false,
            drawerIcon: ({ focused }) => (
              <Image
                source={ASSETS.home}
                tintColor={focused ? COLOR.primary : COLOR.black}
                style={{ width: 20, height: 20 }}
              />
            ),
          }}
          name="Home"
          component={Navigator}
        />
        <Drawer.Group
        // screenOptions={{
        //   headerShown: false,
        //   headerTitleAlign: 'center',
        //   headerTitleStyle: {fontFamily: FONT.fontBold},
        // }}
        >
          <Drawer.Screen
            // options={{
            //   drawerIcon: ({focused}) => (
            //     <Image
            //       source={ASSETS.settings}
            //       tintColor={focused ? COLOR.primary : COLOR.black}
            //       style={{width: 25, height: 25}}
            //     />
            //   ),
            //   headerTitle: t('Settings'),
            // }}
            name="Settings"
            component={Settings}
          />
        </Drawer.Group>
      </Drawer.Navigator>
    </SafeAreaView>
  );
};
export default DrawerNav;

const CustomDrawerContent = ({ navigation, loadLang }) => {
  const { t, i18n } = useTranslation();
  const dispatch = useDispatch();
  // const loadLang = useSelector(selectLanguage);
  const [user] = useSelector(selectUser);
  const [setting] = useSelector(selectSetting);
  const lang = useSelector(selectLanguage);

  const translator = () => {
    const newLanguage = i18n.language === 'ar' ? 'en' : 'ar';
    i18n.changeLanguage(newLanguage);
    dispatch(languageHandler(newLanguage));
  };
  const handleNav = label => navigation.navigate(label);
  const logout = () => {
    navigation.dispatch(DrawerActions.closeDrawer());
    dispatch(logoutUser(user));
    dispatch(deleteSetting(setting));
  };

  const Item = ({ label, icon, onPress, w, h }) => (
    <DrawerItem
      label={t(label)}
      labelStyle={globals.fontReg}
      pressColor={COLOR.primary}
      inactiveBackgroundColor={COLOR.white}
      icon={({ focused }) => (
        <Image
          source={icon}
          // tintColor={focused ? COLOR.primary : COLOR.black}
          style={[
            {
              width: w || 24,
              height: h || 24,
              position: 'absolute',
            },
            lang === 'ar' ? { right: 10 } : { left: 10 },
          ]}
        />
      )}
      onPress={onPress}
    />
  );

  return (
    <DrawerContentScrollView>
      <View style={styles.drawerContentWrpr}>
        {console.log("username",user)}
        <Image source={ASSETS.placeholder} style={styles.userImg} />
        <View style={{ marginTop: 15 }}>
          <Text style={[globals.fontBold, { fontSize: 22 }]}>{user == undefined ? "" : user.user_display_name}</Text>
        </View>
      </View>

      <Item label="Home" icon={ASSETS.home} onPress={() => handleNav('Home')} />
      <Item
        label="Settings"
        icon={ASSETS.settings}
        onPress={() => handleNav('Settings')}
      />
      <Item
        label="Logout"
        icon={ASSETS.powerOff}
        onPress={logout}
        w={22}
        h={22}
      />

      <ToggleButton
        bg="transparent"
        w={220}
        isOn={loadLang === 'ar' ? true : false}
        onToggle={translator}
        label={loadLang === 'ar' ? 'عربي' : 'English'}
        onColor={COLOR.primary}
        offColor={COLOR.blue}
      />
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  drawerContentWrpr: {
    alignItems: 'center',
    padding: 16,
    marginBottom: 30,
    backgroundColor: COLOR.white,
    borderBottomEndRadius: 15,
    borderBottomStartRadius: 15,
    // elevation: 5,
    top: -5,
  },
  userImg: {
    width: 80,
    height: 80,
    borderRadius: 50,
  },
});
