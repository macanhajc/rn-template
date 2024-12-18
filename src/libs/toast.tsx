import { BaseToast, ErrorToast, ToastProps } from "react-native-toast-message";

export const toastConfig = {
  /*
    Overwrite 'success' type,
    by modifying the existing `BaseToast` component
  */
  success: (props: ToastProps) => (
    <BaseToast
      {...props}
      style={{
        height: 50,
        borderLeftWidth: 0,
        borderRadius: 25,
        backgroundColor: "#22c55e",
      }}
      contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 0 }}
      text1Style={{
        fontSize: 16,
        paddingTop: 4,
        color: "white",
        fontWeight: 400,
        fontFamily: "Poppins-Regular",
      }}
    />
  ),
  /*
    Overwrite 'error' type,
    by modifying the existing `ErrorToast` component
  */
  error: (props: ToastProps) => (
    <ErrorToast
      {...props}
      style={{
        height: 50,
        borderLeftWidth: 0,
        borderRadius: 25,
        backgroundColor: "#e94a4a",
      }}
      contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 0 }}
      text1Style={{
        fontSize: 16,
        paddingTop: 4,
        color: "white",
        fontWeight: 400,
        fontFamily: "Poppins-Regular",
      }}
    />
  ),
};
