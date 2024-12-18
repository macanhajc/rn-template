import React, { useEffect } from "react";
import { ScrollView, ScrollViewProps, ViewProps } from "react-native";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import useColorScheme from "@/hooks/useColorScheme";
import { colors } from "@/theme/colors";

interface ScreenProps extends ViewProps {
  classNames?: string;
  disableScroll?: boolean;
  containerProps?: ScrollViewProps;
  bgColor?: string;
}

const ScreenChildren = ({
  classNames,
  bgColor,
  children,
  containerProps,
  ...props
}: Omit<ScreenProps, "disableScroll">) => {
  const insets = useSafeAreaInsets();
  const { colorScheme } = useColorScheme();

  const animatedColor = useSharedValue(colorScheme === "light" ? 0 : 1);

  const animatedStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      animatedColor.value,
      [0, 1],
      [colors.light.background.z0, colors.dark.background.z0]
    ),
  }));

  useEffect(() => {
    if (!bgColor) {
      animatedColor.value = withTiming(colorScheme === "light" ? 0 : 1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bgColor, colorScheme]);

  return (
    <Animated.View
      {...props}
      className={classNames}
      style={[
        bgColor ? { backgroundColor: bgColor } : animatedStyle,
        { flexGrow: 1, paddingTop: insets.top },
      ]}
    >
      {children}
    </Animated.View>
  );
};

export default function Screen({
  children,
  classNames,
  bgColor,
  disableScroll,
  containerProps,
  ...props
}: ScreenProps) {
  if (disableScroll) {
    return (
      <ScreenChildren classNames={classNames} bgColor={bgColor} {...props}>
        {children}
      </ScreenChildren>
    );
  }

  return (
    <ScrollView {...containerProps} contentContainerStyle={{ flexGrow: 1 }}>
      <ScreenChildren classNames={classNames} bgColor={bgColor} {...props}>
        {children}
      </ScreenChildren>
    </ScrollView>
  );
}
