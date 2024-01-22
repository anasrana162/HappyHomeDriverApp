import React, { Component } from 'react';
import {
  I18nManager,
  SafeAreaView,
  StatusBar,
  NativeModules,
  View,
  Modal,
  Image,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Animated,
} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import NetInfo, { useNetInfo } from '@react-native-community/netinfo';
import 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import reduxStore from './src/redux/Store';
import { COLOR } from './src/assets';
import { ToastProvider } from 'react-native-toast-notifications';
import DrawerNav from './src/navigation/DrawerNav';
import Netinfo from './src/components/atoms/Netinfo';
import codePush from 'react-native-code-push';
import { ProgressBar } from "react-native-paper";

const {
  StatusBarManager: { HEIGHT },
} = NativeModules;
const width = Dimensions.get("screen").width;
const height = Dimensions.get("screen").height - HEIGHT;

// appcenter codepush release-react -a a2zcreatorzz-gmail.com/HappyHomeDriver_Android -d Staging  


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isConnected: null,
      network: true,
      syncMessage: 'Loading',
      progress: null,
      updateProcess: true,
      downloaded: 0,
      progressListner: new Animated.Value(0),
      downloading: true,
      update: false,
    };
  }

  componentDidMount() {
    NetInfo.refresh().then((state) => {
      this.setState({ isConnected: state.isConnected });
    });

    SplashScreen.hide();
  }


  syncImmediate() {
    this.setState({ updateProcess: true });
    codePush.sync(
      {
        installMode: codePush.InstallMode.IMMEDIATE,
        // updateDialog: {
        //   appendReleaseDescription: false,

        //   // optionalIgnoreButtonLabel: 'Close',
        //   optionalInstallButtonLabel: 'Install',
        //   optionalUpdateMessage: 'New update available. Install update',
        //   title: 'Update Required',
        // },
      },
      this.codePushStatusDidChange.bind(this),
      this.codePushDownloadDidProgress.bind(this),
    );
  }

  codePushDownloadDidProgress(progress) {
    const downloaded = Math.round(
      (progress?.receivedBytes / progress?.totalBytes) * 100,
    );
    console.log('downloaded', downloaded);
    this.setState({ progress, downloading: true, downloaded: downloaded });
  }

  codePushStatusDidChange(syncStatus) {
    switch (syncStatus) {
      case codePush.SyncStatus.CHECKING_FOR_UPDATE:
        console.log('==================CHECKING_FOR_UPDATE==================');
        console.log(codePush.SyncStatus.CHECKING_FOR_UPDATE);
        console.log('====================================');

        setTimeout(() => {
          this.setState({ syncMessage: 'Checking For Update' });
        }, 100);
        break;

      case codePush.SyncStatus.DOWNLOADING_PACKAGE:
        // alert("Please wait few minutes while the update is installed")

        setTimeout(() => {
          this.setState({
            update: true,
            syncMessage: 'Downloading updates',
            downloading: true,
          });
        }, 100);
        break;

      case codePush.SyncStatus.AWAITING_USER_ACTION:
        setTimeout(() => {
          this.setState({
            syncMessage: 'Waiting for user action to accept',
            downloading: false,
          });
        }, 100);
        break;

      case codePush.SyncStatus.INSTALLING_UPDATE:
        console.log('================INSTALLING_UPDATE====================');
        console.log(codePush.SyncStatus.INSTALLING_UPDATE);
        console.log('====================================');
        setTimeout(() => {
          this.setState({
            syncMessage: 'Kindly wait, update is being install',
            downloading: true,
          });
        }, 100);
        break;

      case codePush.SyncStatus.UP_TO_DATE:
        console.log('=================UP_TO_DATE===================');
        console.log(codePush.SyncStatus.UP_TO_DATE);
        console.log('====================================');
        setTimeout(() => {
          this.setState({
            syncMessage: 'Your app is upto-date',
            updateProcess: false,
            downloading: false,
          });
        }, 100);
        break;

      case codePush.SyncStatus.UPDATE_IGNORED:
        setTimeout(() => {
          this.setState({ syncMessage: 'User ignored the update' }, () => {
            BackHandler.exitApp();
          });
        }, 100);
        break;

      case codePush.SyncStatus.UPDATE_INSTALLED:
        console.log('==================UPDATE_INSTALLED==================');
        console.log(codePush.SyncStatus.UPDATE_INSTALLED);
        console.log('====================================');
        setTimeout(() => {
          this.setState(
            {
              update: false,
              syncMessage: 'Your application is updated now',
              updateProcess: false,
            },
            () => {
              codePush.restartApp();
            },
          );
        }, 100);
        break;

      case codePush.SyncStatus.UNKNOWN_ERROR:
        console.log(codePush.SyncStatus.UNKNOWN_ERROR)
        // setTimeout(() => {
        //   this.setState({ syncMessage: "There is an unknown error" });
        // }, 100);
        break;
    }
  }


  render() {
    const { isConnected, updateProcess } = this.state;
    const { store, persistor } = reduxStore();
    const theme = {
      ...DefaultTheme,
      colors: {
        ...DefaultTheme.colors,
        background: 'transparent',
      },
    };

    return (
      <SafeAreaProvider>
        <StatusBar backgroundColor="#fff" barStyle="dark-content" />

        <ToastProvider>
          <Provider store={store}>
            <PersistGate  persistor={persistor}>

              {updateProcess == false ?
                <>
                  {isConnected ? (
                    <>
                      <NavigationContainer theme={theme}>
                        <DrawerNav />
                      </NavigationContainer>

                    </>
                  ) : (
                    <Netinfo />
                  )}
                </> :
                <>
                <Image
                source={require('./src/assets/images/launch_screen.png')}
                style={{width:width,height:height}}
                />
              <Modal
                animationType="slide"
                transparent={true}
                visible={this.state.update} //this.state.update
              >
                <View
                  style={styles.modalOuterCont}>
                  <View
                    style={styles.modalInnerCont}>
                    {/* <Image
                  source={require('./assets/logo.png')}
                  style={styles.imageModal}
                /> */}
                    <Text
                      style={styles.titleModalEN}>
                      App is updating, please wait.
                    </Text>

                    <Text
                      style={styles.downloaded}>
                      {this.state.downloaded}%
                    </Text>
                    <ProgressBar
                      progress={0.01 * this.state.downloaded}
                      color="#61CE70"
                      style={styles.progressBar}
                    />
                  </View>
                </View>
              </Modal>
                </>
              }



            </PersistGate>
          </Provider>
        </ToastProvider>
      </SafeAreaProvider>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width,
    height: height,
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor:"red"
  },
  image: {
    width: 330,
    height: 150,
    // marginTop: 60,
    marginBottom: 60,
    marginLeft: 20
  },
  modalOuterCont: {
    width: width,
    height: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(52,52,52,0.3)',
  },
  modalInnerCont: {
    width: width,
    height: 270,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
  titleModalEN: {
    // fontFamily: 'Careem-Bold',
    fontWeight: "500",
    fontSize: 20,
    color: 'black',
    alignSelf: 'center',
    marginBottom: 10,
  },
  titleModalAR: {
    // fontFamily: 'Careem-Bold',
    fontSize: 14,
    color: 'black',
    alignSelf: 'center',
    marginBottom: 20,
  },
  downloaded: {
    // fontFamily: 'Careem-Bold',
    fontSize: 18,
    color: 'white',
    alignSelf: 'center',
    marginVertical: 10,
    position: 'absolute',
    bottom: 48,
    left: 35,
    zIndex: 50,
  },
  progressBar: {
    height: 30,
    width: '90%',
    alignSelf: 'center',
    borderRadius: 10,
    backgroundColor: '#EBECED',
  },
  imageModal: {
    width: 220,
    height: 75,
    alignSelf: 'center',
    marginTop: 0,
    marginBottom: 20,
  },
  progressBar: {
    height: 30,
    width: '90%',
    alignSelf: 'center',
    borderRadius: 10,
    backgroundColor: '#EBECED',
  },
});
export default codePush(codePush.CheckFrequency.ON_APP_START)(App);
// export default App;