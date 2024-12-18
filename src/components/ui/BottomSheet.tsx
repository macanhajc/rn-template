import React, { PropsWithChildren, useEffect, useState } from "react";
import {
  Dimensions,
  KeyboardAvoidingView,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolate,
  interpolateColor,
} from "react-native-reanimated";
import Text from "./Text";
import useColorScheme from "@/hooks/useColorScheme";
import { colors } from "@/theme/colors";
import { XIcon } from "lucide-react-native";

const { width, height: deviceHeight } = Dimensions.get("window");

export type BottomSheetProps = PropsWithChildren & {
  isOpen: boolean;
  title?: string;
  preventBackdropClose?: boolean;
  onClose?: () => void;
};

export default function BottomSheet({
  children,
  title,
  preventBackdropClose = true,
  isOpen,
  onClose,
}: BottomSheetProps) {
  const { colors: uColors, colorScheme } = useColorScheme();

  const animatedBackground = useSharedValue(0);
  const animatedColor = useSharedValue(colorScheme === "light" ? 0 : 1);

  const [height, setHeight] = useState(900);

  const sheetStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: interpolate(animatedBackground.value, [0, 1], [height, 0]),
      },
    ],
  }));

  const backdropStyle = useAnimatedStyle(() => ({
    opacity: animatedBackground.value,
  }));

  const animatedColorStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      animatedColor.value,
      [0, 1],
      [colors.light.background.z2, colors.dark.background.z2]
    ),
  }));

  useEffect(() => {
    animatedBackground.value = withTiming(isOpen ? 1 : 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  useEffect(() => {
    animatedColor.value = withTiming(colorScheme === "light" ? 0 : 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [colorScheme]);

  if (!isOpen) return null;

  return (
    <View>
      <Modal
        visible={isOpen}
        transparent
        animationType="fade"
        onRequestClose={onClose}
      >
        <Animated.View
          className="bg-[#00000090] absolute"
          style={[backdropStyle, { ...StyleSheet.absoluteFillObject }]}
        >
          <TouchableOpacity
            className="flex-1"
            onPress={() => {
              if (!preventBackdropClose && onClose) onClose();
            }}
          />
        </Animated.View>
        <Animated.View
          onLayout={(e) => setHeight(e.nativeEvent.layout.height)}
          style={[sheetStyle, animatedColorStyle, { width }]}
          className="min-h-[150px] rounded-tl-3xl rounded-tr-3xl bg-white absolute bottom-0"
        >
          <KeyboardAvoidingView behavior="height">
            {title || onClose ? (
              <View className="flex-row px-6 py-4 items-center justify-between">
                <Text className="text-xl">{title}</Text>

                {onClose ? (
                  <Pressable onPress={onClose}>
                    <XIcon stroke={uColors.text} />
                  </Pressable>
                ) : null}
              </View>
            ) : null}

            <ScrollView
              contentContainerClassName="p-6"
              style={{ maxHeight: deviceHeight * 0.8 }}
            >
              {children}
            </ScrollView>
          </KeyboardAvoidingView>
        </Animated.View>
      </Modal>
    </View>
  );
}
