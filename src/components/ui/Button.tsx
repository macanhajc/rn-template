import React from "react";
import { Pressable, PressableProps } from "react-native";
import Text from "./Text";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import clsx from "clsx";
import Spinner from "./Spinner";
import useColorScheme from "@/hooks/useColorScheme";

type ButtonProps = PressableProps & {
  text?: string;
  loading?: boolean;
  icon?: React.ReactElement;
  containerClassName?: string;
  variant?: "primary" | "secondary" | "plane";
  size?: "large" | "medium" | "small";
};

const sizeProps = {
  large: "h-[54px] min-w-[54px]",
  medium: "h-[48px] min-w-[48px]",
  small: "h-[42px] min-w-[42px]",
};

export default function Button({
  text,
  icon,
  loading,
  size = "large",
  variant = "primary",
  containerClassName,
  className,
  disabled,
  ...rest
}: ButtonProps) {
  const { colors, colorScheme } = useColorScheme();
  const animatedStyle = useSharedValue(0);

  const animatedPressStyle = useAnimatedStyle(() => ({
    transform: [{ scale: interpolate(animatedStyle.value, [0, 1], [1, 0.99]) }],
  }));

  const iconColor =
    variant === "secondary"
      ? colors.primary
      : variant === "primary"
      ? "white"
      : colors.text;

  return (
    <Animated.View
      className={clsx(
        "w-full relative flex-row overflow-hidden rounded-full",
        variant === "primary" && "bg-primary border-primary",
        variant === "secondary" && " border border-primary",
        variant === "plane" && "border-transparent",
        sizeProps[size],
        containerClassName,
        disabled && "opacity-30"
      )}
      style={[animatedPressStyle, { elevation: variant === "primary" ? 1 : 0 }]}
    >
      <Pressable
        className={clsx(
          "flex-grow flex-row gap-2 justify-center items-center",
          className
        )}
        android_ripple={{ color: "#00000012" }}
        {...rest}
        onPressIn={() => (animatedStyle.value = withSpring(1))}
        onPressOut={() => (animatedStyle.value = withSpring(0))}
        disabled={disabled ?? loading}
      >
        {loading ? (
          <Spinner color={iconColor} />
        ) : (
          <>
            {icon
              ? React.cloneElement(icon, {
                  strokeWidth: 1.5,
                  stroke: iconColor,
                })
              : null}

            {text ? (
              <Text
                className={clsx(
                  "text-xl",
                  variant === "primary" && "!text-white",
                  variant === "secondary" && "!text-primary",
                  variant === "plane" && colorScheme === "light"
                    ? "text-black"
                    : "text-white"
                )}
                weight="Medium"
              >
                {text}
              </Text>
            ) : null}
          </>
        )}
      </Pressable>
    </Animated.View>
  );
}
