import React, {useRef, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import Animated, {
  Easing,
  withSpring,
  withTiming,
  useSharedValue,
  useAnimatedStyle,
  useAnimatedGestureHandler,
  withSequence,
} from 'react-native-reanimated';
import {PanGestureHandler} from 'react-native-gesture-handler';

const AnimatedBottomSheet = ({onPress1, onPress2, textBTN1, textBTN2}) => {
  const [isOpen, setIsOpen] = useState(false);
  const translateY = useSharedValue(0);

  const openBottomSheet = () => {
    setIsOpen(true);
    translateY.value = withTiming(-250, {duration: 300});
  };

  const closeBottomSheet = () => {
    setIsOpen(false);
    translateY.value = withTiming(0, {duration: 300});
  };

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, context) => {
      context.startY = translateY.value;
    },
    onActive: (event, context) => {
      translateY.value = context.startY + event.translationY;
    },
    onEnd: event => {
      if (event.velocityY > 500 || event.translationY > 100) {
        closeBottomSheet();
      } else {
        openBottomSheet();
      }
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateY: translateY.value}],
    };
  });

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={isOpen ? closeBottomSheet : openBottomSheet}>
        <Text style={styles.buttonText}>{isOpen ? 'Close' : 'Open'}</Text>
      </TouchableOpacity>
      <Animated.View style={[styles.bottomSheet, animatedStyle]}>
        <PanGestureHandler onGestureEvent={gestureHandler}>
          <Animated.View style={styles.draggableArea} />
        </PanGestureHandler>
        <View style={styles.content}>
          <Text style={styles.text}>Pick Your Image</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={onPress1}>
              <Text style={styles.buttonText}>{textBTN1}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onPress2}>
              <Text style={styles.buttonText}>{textBTN2}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 10,
    color: '#000',
  },
  bottomSheet: {
    position: 'absolute',
    bottom: 0,
    zIndex: 999,
    height: 250,
    width: 250,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 5,
  },
  draggableArea: {
    height: 40,
    width: 80,
    backgroundColor: '#ccc',
    alignSelf: 'center',
    marginTop: 10,
    borderRadius: 5,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
  },
  buttonContainer: {
    // flexDirection: 'row',
  },
});

export default AnimatedBottomSheet;
