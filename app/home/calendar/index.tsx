import {
  Dimensions,
  Image,
  Modal,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { assets } from "../../../components/assets";
import moment from "moment";
import { useDataContext } from "../../../utils/UserData";
import { Calendar } from "react-native-calendars";
import { MarkedDates } from "react-native-calendars/src/types";
import CalendarModal from "../../../components/CalendarModal";

const ScreenWidth = Dimensions.get("window").width;

export default function CalendarPage() {
  const { createdIngredients } = useDataContext();

  const [selectedDate, setSelectedDate] = useState("");
  const [markedDates, setMarkedDates] = useState<MarkedDates>({});
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedDateIngredients, setselectedDateIngredients] = useState([]);

  useEffect(() => {
    const updatedMarkedDates = {};
    createdIngredients.forEach((ingredient) => {
      updatedMarkedDates[ingredient.expirationDate] = {
        marked: true,
        selectedColor: "blue",
      };
    });
    setMarkedDates(updatedMarkedDates);
  }, [createdIngredients]);

  const handleDayPress = (day) => {
    const selectedDate = day.dateString;
    const formattedDate = moment(selectedDate).format("MMMM D, YYYY");

    setSelectedDate(formattedDate);

    if (markedDates[selectedDate]) {
      const ingredientsForSelectedDate = createdIngredients.filter(
        (ingredient) => ingredient.expirationDate === selectedDate
      );
      setselectedDateIngredients(ingredientsForSelectedDate);
      setModalVisible(true);
    } else {
      setselectedDateIngredients([]);
      setModalVisible(false);
    }
  };

  const renderModalContent = (formattedDate) => (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <View
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          paddingLeft: 15,
          paddingTop: 5,
          borderRadius: 15,
          borderColor: "black",
          borderWidth: 1,
          width: 275,
        }}
      >
        <Text
          style={{
            color: "black",
            fontSize: 16,
            marginBottom: 10,
            fontWeight: "bold",
          }}
        >
          {formattedDate}
        </Text>
        {selectedDateIngredients.map((ingredient, index) => (
          <View
            key={index}
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 5,
            }}
          >
            <Image
              source={{ uri: ingredient.image }}
              style={{
                width: 49,
                height: 45,
                marginRight: 10,
                borderRadius: 30,
              }}
            />
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                textTransform: "uppercase",
              }}
            >
              {ingredient.name}
            </Text>
          </View>
        ))}

        <TouchableOpacity
          style={{
            marginTop: 15,
            paddingBottom: 5,
            paddingRight: 15,
            alignItems: "flex-end",
          }}
          onPress={() => setModalVisible(false)}
        >
          <Text style={{ fontWeight: "bold" }}>CLOSE</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={assets.gradient} style={{ zIndex: 1 }} />
        <Image
          source={assets["ingredients-bg"]}
          resizeMode="cover"
          style={styles.bgimage}
        />
        <Text style={styles.ingredientsText}>Calendar</Text>
      </View>
      <View style={{ flex: 1, top: 100 }}>
        <Calendar
          markedDates={markedDates}
          onDayPress={handleDayPress}
          style={styles.calendar}
        />
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          {renderModalContent(selectedDate)}

          {/* <CalendarModal selectedDate={setSelectedDate} /> */}
        </Modal>
      </View>
      <View style={styles.content}>
        <ScrollView style={styles.scrollContainer}>
          {createdIngredients.map((text, index) => (
            <View key={index} style={styles.rectangle}>
              <View style={styles.displayItem}>
                <Image source={{ uri: text.image }} style={styles.image} />
                <View style={styles.textposition}>
                  <Text style={styles.displayText}>{text.name}</Text>
                  {/* {daysUntilExpiration !== '' && (
                                        <Text style={styles.resultText}>Will expire on: {text.daysUntilExpiration} days</Text>
                                    )} */}
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    // justifyContent: "flex-start",
    // paddingHorizontal: 20,
  },
  header: {
    width: "100%",
    position: "relative",
  },
  bgimage: {
    position: "absolute",
    left: 0,
    bottom: 0,
    width: 300,
    height: 100,
  },
  ingredientsText: {
    color: "#333A73",
    fontSize: 30,
    fontWeight: "bold",
    position: "absolute",
    right: 10,
    top: 40,
    zIndex: 1
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    justifyContent: "flex-start",
    alignItems: "flex-end",
  },
  gradientimage: {
    width: "100%",
    height: "12%",
  },
  input: {
    flex: 1,
    paddingVertical: 8,
    fontSize: 16,
    marginLeft: 15,
    marginBottom: 10,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 10,
  },
  searchbar: {
    width: 273,
    height: 40,
    backgroundColor: "#D9D9D9",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
    marginTop: 25,
    marginBottom: 10,
    paddingLeft: 5,
    flexDirection: "row",
  },
  button: {
    backgroundColor: "#1F41BB",
    borderRadius: 5,
    height: 25,
    width: 100,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
  displayContainer: {
    width: "100%",
    marginTop: 10,
  },
  displayText: {
    fontSize: 16,
  },
  displayItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 5,
  },

  textposition: {
    fontSize: 12,
    marginLeft: 5,
  },

  image: {
    width: 59,
    height: 55,
    borderRadius: 25,
    marginLeft: 5,
  },

  rectangle: {
    backgroundColor: "lightgray",
    padding: 10,
    marginBottom: 10,

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    width: 358,
    height: 69,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
  },

  scrollContainer: {
    width: "100%",
    // height:"70%",
    // marginTop: 5,
    marginBottom: 90,
  },

  resultText: {
    fontSize: 14,
    color: "red",
  },

  icon_size: {
    width: 35,
    height: 30,
    resizeMode: "contain",
  },

  icontainer: {
    width: "100%",
    height: 97,
    position: "relative",
    backgroundColor: "white",
  },


  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 20,
  },

  icon: {
    width: 35,
    height: 30,
    resizeMode: "contain",
  },

  icons: {
    alignItems: "center",
  },

  // descriptionText: {
  //   fontSize: 10,
  //   color: "white",
  // },

  descriptions: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: 10,
  },

  navigationBar: {
    backgroundColor: "#201E53",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    width: ScreenWidth,
    height: 62,
    resizeMode: "contain",
  },
  calendar:{
    width: ScreenWidth,
    marginTop: -90
  }
});
