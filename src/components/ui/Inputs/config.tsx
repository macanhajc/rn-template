import React, { useEffect, useMemo } from "react";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { colors } from "@/theme/colors";
import clsx from "clsx";
import useColorScheme from "@/hooks/useColorScheme";
import Spinner from "../Spinner";
import { View } from "react-native";

type BaseProps = React.PropsWithChildren & {
  focused?: boolean;
  error?: boolean;
  loading?: boolean;
  disabled?: boolean;
  prefix?: React.ReactElement;
  size?: "large" | "medium" | "small";
};

const sizeProps = {
  large: "min-h-[54px] min-w-[54px]",
  medium: "min-h-[48px] min-w-[48px]",
  small: "min-h-[42px] min-w-[42px]",
};

export function InputBackground({
  children,
  focused,
  error,
  prefix,
  loading,
  disabled,
  size = "large",
}: BaseProps) {
  const { colors: uColors, colorScheme } = useColorScheme();

  const animatedColor = useSharedValue(colorScheme === "light" ? 0 : 1);
  const animatedFocus = useSharedValue(focused ? 1 : 0);

  const animatedStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      animatedColor.value,
      [0, 1],
      [colors.light.background.z2, colors.dark.background.z1]
    ),
  }));

  const animatedBorder = useAnimatedStyle(() => ({
    borderColor: interpolateColor(
      animatedColor.value,
      [0, 1],
      error
        ? [uColors.error, uColors.error]
        : [colors.light.background.z1, colors.dark.background.z2]
    ),
  }));

  const iconProps = useMemo(
    () => ({
      className: clsx("mr-3", focused ? `text-primary` : "text-neutral-600"),
      color: focused ? colors.dark.primary : "#BCBCBC",
      strokeWidth: 1.5,
    }),
    [focused]
  );

  useEffect(() => {
    animatedColor.value = withTiming(colorScheme === "light" ? 0 : 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [colorScheme]);

  useEffect(() => {
    animatedFocus.value = withTiming(focused ? 1 : 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focused]);

  return (
    <Animated.View
      className={clsx(
        "w-full px-4 flex-row items-center border-[1.5px] overflow-hidden rounded-xl",
        sizeProps[size]
      )}
      style={[
        animatedStyle,
        animatedBorder,
        { elevation: 4, shadowColor: "#00000030", gap: 8 },
      ]}
    >
      {disabled ? (
        <View className="absolute w-[120%] h-full bg-neutral-400 z-10 opacity-30" />
      ) : null}
      {prefix ? React.cloneElement(prefix, iconProps) : null}
      {children}
      {loading ? <Spinner color={uColors.text} /> : null}
    </Animated.View>
  );
}
