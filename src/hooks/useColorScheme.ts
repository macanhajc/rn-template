import { colors } from "@/theme/colors";
import { useColorScheme as useColorSchemeRN } from "react-native";

const useColorScheme = () => {
  const colorScheme = useColorSchemeRN() ?? "light";

  return {
    colorScheme,
    colors: colors[colorScheme],
  };
};

export default useColorScheme;
