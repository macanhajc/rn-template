import React from "react";
import { Animated, TextProps } from "react-native";
import { translate, TxKeyPath } from "@/locales";
import { I18nOptions } from "i18n-js";
import clsx from "clsx";

type FontWeight =
  | "Regular"
  | "Black"
  | "Bold"
  | "SemiBold"
  | "Medium"
  | "Light"
  | "LightItalic";

interface CustomTextProps extends TextProps {
  weight?: FontWeight;
  tx?: TxKeyPath;
  txOptions?: I18nOptions;
}

/**
 * A custom text component that supports theming, animated styles, and internationalization.
 *
 * - Supports multiple font weights using the "Poppins" font family.
 * - Allows for translation of text using `tx` and `txOptions` props.
 *
 */
export default function Text(props: CustomTextProps) {
  const {
    weight = "Regular",
    style,
    children,
    tx,
    className,
    txOptions,
    ...rest
  } = props;

  const i18nText = tx && translate(tx, txOptions);
  const content = i18nText || children;

  return (
    <Animated.Text
      {...rest}
      className={clsx("text-black dark:text-white", className)}
      style={[style, { fontFamily: `Poppins-${weight}` }]}
    >
      {content}
    </Animated.Text>
  );
}
