import { View } from "react-native";
import { Control, useController } from "react-hook-form";

import TextInput, { TextInputProps } from "../TextInput";
import Text from "../../Text";
import { forwardRef } from "react";
import { TextInput as RNTextInput } from "react-native";

type TextInputFormProps = TextInputProps & {
  name: string;
  control: Control<any>;
};

const TextInputForm = forwardRef<RNTextInput, TextInputFormProps>(
  ({ name, control, value, ...rest }, ref) => {
    const { field, fieldState } = useController({ control, name });

    return (
      <View className="flex-grow">
        <TextInput
          ref={ref}
          {...rest}
          error={!!fieldState.error}
          value={value ?? field.value}
          onChangeText={(masked) => {
            field.onChange(masked.trimStart());
          }}
        />

        {fieldState.error ? (
          <Text className="text-xs !text-red-500 mx-2 mt-1">
            {fieldState.error.message}
          </Text>
        ) : null}
      </View>
    );
  }
);

TextInputForm.displayName = "TextInputForm"

export default TextInputForm;
