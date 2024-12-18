import { useEffect } from "react";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  interpolateColor,
  withTiming,
} from "react-native-reanimated";
import { ViewProps } from "react-native";
import useColorScheme from "@/hooks/useColorScheme";
import { colors } from "@/theme/colors";

export default function Card({ children, ...props }: ViewProps) {
  const { colorScheme } = useColorScheme();

  const animatedColor = useSharedValue(colorScheme === "light" ? 0 : 1);

  const animatedStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      animatedColor.value,
      [0, 1],
      [colors.light.background.z2, colors.dark.background.z2]
    ),
  }));

  useEffect(() => {
    animatedColor.value = withTiming(colorScheme === "light" ? 0 : 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [colorScheme]);

  return (
    <Animated.View
      {...props}
      style={[
        animatedStyle,
        props.style,
        { elevation: 4, shadowColor: "#00000050" },
      ]}
    >
      {children}
    </Animated.View>
  );
}
