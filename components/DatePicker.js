// import React, { useState } from "react";
// import { Button, View } from "react-native";
// import DateTimePickerModal from "react-native-modal-datetime-picker";
// import COLORS from '../src/consts/colors'
//Ctrl+K+C +U

// const DatePicker = () => {
//   const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

//   const showDatePicker = () => {
//     setDatePickerVisibility(true);
//   };

//   const hideDatePicker = () => {
//     setDatePickerVisibility(false);
//   };

//   const handleConfirm = (date) => {
//     console.warn("A date has been picked: ", date);
//     hideDatePicker();
//   };

//   return (
//     <View>
//       <Button  title="Show Date Picker" onPress={showDatePicker} style = {{color: COLORS.white}} />
//       <DateTimePickerModal
//         isVisible={isDatePickerVisible}
//         mode="date"
//         onConfirm={handleConfirm}
//         onCancel={hideDatePicker}
//       />
//     </View>
//   );
// };

// export default DatePicker;