import { useState, forwardRef } from "react";
import { InputBackground } from "./config";
import MaskInput, { MaskInputProps } from "react-native-mask-input";
import clsx from "clsx";
import { Pressable, TextInput as RNTextInput } from "react-native";
import useColorScheme from "@/hooks/useColorScheme";
import { EyeIcon, EyeOffIcon } from "lucide-react-native";
import Text from "../Text";

export type TextInputProps = MaskInputProps & {
  loading?: boolean;
  error?: boolean;
  disabled?: boolean;
  prefix?: React.ReactElement;
  inputClassName?: string;
  size?: "large" | "medium" | "small";
};

const TextInput = forwardRef<RNTextInput, TextInputProps>(
  (
    {
      prefix,
      error,
      size,
      disabled,
      loading,
      inputClassName,
      multiline,
      style,
      secureTextEntry,
      ...props
    },
    ref
  ) => {
    const { colors } = useColorScheme();
    const [focused, setFocused] = useState(false);
    const [isSecure, setIsSecure] = useState(secureTextEntry);

    return (
      <InputBackground
        focused={focused}
        error={error}
        size={size}
        prefix={prefix}
        loading={loading}
        disabled={disabled}
      >
        <MaskInput
          ref={ref}
          className={clsx("flex-1 text-lg pb-3", inputClassName)}
          readOnly={disabled}
          placeholderTextColor="#BCBCBC"
          multiline={multiline}
          secureTextEntry={isSecure}
          {...props}
          style={[
            { fontFamily: "Poppins-Regular", color: colors.text },
            multiline && {
              height: 180,
              textAlignVertical: "top",
              paddingTop: 16,
            },
            style,
          ]}
          onFocus={(event) => {
            setFocused(true);
            if (props.onFocus) props.onFocus(event);
          }}
          onBlur={(event) => {
            setFocused(false);
            if (props.onBlur) props.onBlur(event);
          }}
        />

        {secureTextEntry ? (
          <Pressable className="ml-0" onPress={() => setIsSecure(!isSecure)}>
            {!isSecure ? (
              <EyeOffIcon
                stroke={focused ? colors.primary : "#BCBCBC"}
                strokeWidth={1.5}
              />
            ) : (
              <EyeIcon
                stroke={focused ? colors.primary : "#BCBCBC"}
                strokeWidth={1.5}
              />
            )}
          </Pressable>
        ) : null}

        {!!(multiline && props?.maxLength) ? (
          <Text className="absolute text-sm bottom-1 right-3">
            {props.value?.length ?? 0}/{props.maxLength}
          </Text>
        ) : null}
      </InputBackground>
    );
  }
);

TextInput.displayName = "TextInput";

export default TextInput;
