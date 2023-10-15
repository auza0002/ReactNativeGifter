import DatePicker from "react-native-modern-datepicker";
import { useTheme } from "@rneui/themed";
const DatePickerScreen = ({ setSelectedDate }) => {
  const { theme } = useTheme();
  return (
    <DatePicker
      onSelectedChange={(selectedDate) => {
        setSelectedDate(selectedDate);
      }}
      options={{
        backgroundColor: theme.colors.background,
        textHeaderColor: theme.colors.text.white,
        textDefaultColor: theme.colors.text.primary,
        selectedTextColor: theme.colors.text.white,
        mainColor: theme.colors.dark, //arrows
        textSecondaryColor: theme.colors.text.secondary, //dow
        borderColor: theme.colors.primaryPressed,
      }}
      style={{
        borderRadius: 10,
      }}
      current={"2004-03-10"}
      selected={"2004-03-10"}
      maximumDate={new Date().toDateString()}
      mode="calendar"
    ></DatePicker>
  );
};
export default DatePickerScreen;
