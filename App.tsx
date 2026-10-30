import { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import Animated, { css, FadeOut } from 'react-native-reanimated';

export default function App() {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Exiting animation restarts a descendant CSS animation (web)</Text>
      <Text>
        The green bar loops: it waits 500ms, then grows from 0% to 100% over 2s.{'\n'}
        Press "Hide" while the bar is partly grown.{'\n\n'}
        Expected: the bar keeps growing while the track fades out over 1s.{'\n'}
        Actual: the bar snaps to 0% width as soon as the fade starts, then restarts after 500ms.
      </Text>
      <Button title={isVisible ? 'Hide' : 'Show'} onPress={() => setIsVisible((value) => !value)} />
      <View style={styles.slot}>
        {isVisible && (
          <Animated.View testID="track" exiting={FadeOut.duration(1000)} style={styles.track}>
            <Animated.View testID="bar" style={animations.bar} />
          </Animated.View>
        )}
      </View>
    </View>
  );
}

const animations = css.create({
  bar: {
    height: '100%',
    backgroundColor: 'green',
    animationName: css.keyframes({
      from: { width: '0%' },
      to: { width: '100%' },
    }),
    animationDuration: '2000ms',
    animationDelay: '500ms',
    animationFillMode: 'backwards',
    animationIterationCount: 'infinite',
    animationTimingFunction: 'linear',
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
    gap: 24,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
  },
  slot: {
    height: 32,
  },
  track: {
    width: 320,
    height: 32,
    backgroundColor: '#ddd',
  },
});
