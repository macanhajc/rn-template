import React from "react";
import Animated, {
  cancelAnimation,
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { Loader2Icon } from "lucide-react-native";
import useColorScheme from "@/hooks/useColorScheme";

const AnimatedSpinner = Animated.createAnimatedComponent(Loader2Icon);

export default function Spinner({
  iconClassName,
  color,
  ...rest
}: React.ComponentProps<typeof Loader2Icon> & {
  iconClassName?: string;
  color?: string;
}) {
  const { colors } = useColorScheme();

  const rotation = useSharedValue(0);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ rotateZ: `${rotation.value}deg` }],
    };
  }, [rotation.value]);

  React.useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, {
        duration: 1000,
        easing: Easing.linear,
      }),
      200
    );
    return () => cancelAnimation(rotation);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AnimatedSpinner
      className={iconClassName}
      {...rest}
      style={animatedStyles}
      strokeWidth={1.5}
      stroke={color ?? colors.text}
    />
  );
}
