import {
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { assets } from "../../../components/assets";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import { useDataContext } from "../../../utils/UserData";
import { Swipeable } from "react-native-gesture-handler";

export default function Ingredients() {
  const [isInputScreenVisible, setIsInputScreenVisible] = useState(false);
  const toggleInputScreen = () => {
    setIsInputScreenVisible(!isInputScreenVisible);
  };

  const { createdIngredients, setCreatedIngredients, favoriteRecipes } =
    useDataContext();

  const [ingredientName, setIngredientName] = useState("");
  const [purchaseDate, setPurchaseDate] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [daysUntilExpiration, setDaysUntilExpiration] = useState("");

  const [markedDates, setmarkedDates] = useState({});
  const [selectedDateIngredients, setSelectedDateIngredients] = useState([]);

  const [isExpiryDateVisible, setIsExpiryDateVisible] = useState(false);
  const [isPurchaseDateVisible, setIsPurchaseDateVisible] = useState(false);

  const handleInputChange = (text) => {
    setIngredientName(text);
  };

  const togglePurhaseDate = () => {
    setIsPurchaseDateVisible(!isPurchaseDateVisible);
  };

  const toggleExpiryDate = () => {
    setIsExpiryDateVisible(!isExpiryDateVisible);
  };

  const handlePurchaseDateConfirm = (date) => {
    setPurchaseDate(moment(date).format("YYYY-MM-DD"));
    togglePurhaseDate();
  };

  const handleExpiryDateConfirm = (date) => {
    setExpirationDate(moment(date).format("YYYY-MM-DD"));
    toggleExpiryDate();
  };

  const handleMarkDate = (date) => {
    const updatedMarkedDates = { ...markedDates };
    updatedMarkedDates[date] = { selected: true, marked: true };
    setmarkedDates(updatedMarkedDates);

    const ingredientsForSelectedDate = createdIngredients.filter(
      (ingredient) => ingredient.expirationDate === date
    );
    setSelectedDateIngredients(ingredientsForSelectedDate);
  };

  const handleDelete = (index, name) => {
    const deletedIngredient = createdIngredients[index];

    if (!deletedIngredient) {
      console.error("Cannot delete ingredient at index:", index);
      return;
    }
    const newIngredients = createdIngredients.filter(
      (ingredient, i) => i !== index
    );
    setCreatedIngredients(newIngredients);

    const updatedMarkedDates = { ...markedDates };
    delete updatedMarkedDates[deletedIngredient.expirationDate];
    setmarkedDates(updatedMarkedDates);
  };

  const fetchRecipes = async (ingredient) => {
    try {
      const response = await fetch(
        `https://api.edamam.com/search?q=${encodeURIComponent(
          ingredient
        )}&app_id=edad196e&app_key=72b9b5a24765be1a0be1c75b89c2c52c`
      );

      const data = await response.json();

      return data.hits.map((hit) => {
        return {
          ingredient: ingredient,
          recipe: hit.recipe,
        };
      });
    } catch (e) {
      console.error("Error fetching recipes:", e);
      return [];
    }
  };

  const handlePress = async () => {
    if (ingredientName.trim() !== "") {
      try {
        if (!purchaseDate || !expirationDate) {
          alert("Please enter both purchase date and expiration date.");
          return;
        }

        const response = await fetch(
          `https://api.edamam.com/api/food-database/v2/parser?ingr=${ingredientName}&app_id=7d110714&app_key=fb587c1ac3389996471cfe7104d369e9`
        );
        const data = await response.json();

        if (data.hints.length === 0) {
          console.error(
            "No ingredients found for:",
            ingredientName,
            ". Please try again with a different ingredient."
          );
          return;
        }

        if (data.hints && data.hints.length > 0) {
          const ingredient = data.hints[0];
          const expirationDateTime = new Date(expirationDate);
          const currentDate = new Date();

          currentDate.setHours(0, 0, 0, 0);

          const daysRemaining = Math.ceil(
            (expirationDateTime.getTime() - currentDate.getTime()) /
              (1000 * 60 * 60 * 24)
          );

          const newIngredient = {
            name: ingredient.food.label,
            image: ingredient.food.image,
            expirationDate: expirationDate,
            purchaseDate: purchaseDate,
            daysUntilExpiration: daysRemaining,
            recipes: [],
          };

          const fetchedRecipes = await fetchRecipes(ingredientName);

          newIngredient.recipes = fetchedRecipes;

          setCreatedIngredients([...createdIngredients, newIngredient]);

          setIngredientName("");
          setPurchaseDate("");
          setExpirationDate("");
          setDaysUntilExpiration(daysRemaining.toString());
          handleMarkDate(expirationDate);
        }
      } catch (e) {
        console.error("Error adding ingredient:", e);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={assets.gradient} style={{ zIndex: 1 }} />
        <Image
          source={assets["ingredients-bg"]}
          resizeMode="cover"
          style={styles.bgimage}
        />
        <Text style={styles.ingredientsText}>Ingredients</Text>
      </View>
      <View style={styles.content}>
        <TouchableOpacity style={styles.searchbar} onPress={toggleInputScreen}>
          <Text
            style={{
              color: "black",
              fontSize: 16,
              justifyContent: "center",
            }}
          >
            Add Ingredient
          </Text>
        </TouchableOpacity>
        <ScrollView style={styles.scrollContainer}>
          {createdIngredients.map(
            ({ name, image, daysUntilExpiration }, index) => (
              <Swipeable
                key={index}
                friction={2}
                rightThreshold={70}
                renderRightActions={() => (
                  <Pressable
                    onPress={() => {
                      handleDelete(index, name);
                    }}
                    style={{
                      width: 70,
                      height: 69,
                      backgroundColor: "red",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text style={{ color: "white" }}>Delete</Text>
                  </Pressable>
                )}
              >
                <View
                  key={index}
                  style={[
                    styles.rectangle,
                    (daysUntilExpiration === 2 ||
                      daysUntilExpiration === 3 ||
                      daysUntilExpiration === 1) && {
                      backgroundColor: "yellow",
                    },
                    daysUntilExpiration <= 0 && { backgroundColor: "red" },
                  ]}
                >
                  <View style={styles.displayItem}>
                    <Image source={{ uri: image }} style={styles.image} />
                    <View style={styles.textposition}>
                      <Text style={styles.displayText}>{name}</Text>
                      <Text style={styles.resultText}>
                        Will expire on: {daysUntilExpiration} day(s)
                      </Text>
                    </View>
                  </View>
                </View>
              </Swipeable>
            )
          )}
        </ScrollView>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isInputScreenVisible}
        onRequestClose={toggleInputScreen}
      >
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <TouchableOpacity
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0, 0, 0, 0.5)",
            }}
            onPress={toggleInputScreen}
          />

          <View
            style={{
              width: 330,
              height: 300,
              backgroundColor: "#F2F2F2",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 15,
            }}
          >
            <View>
              <Text
                style={{
                  fontSize: 16,
                  color: "#333333",
                  fontWeight: "bold",
                }}
              >
                Ingredient
              </Text>
            </View>
            <TextInput
              style={{
                width: 257,
                height: 27,
                backgroundColor: "#D9D9D9",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: 10,
                borderRadius: 10,
                paddingLeft: 5,
              }}
              placeholder={"Input Ingredient"}
              placeholderTextColor="#888"
              onChangeText={handleInputChange}
              value={ingredientName}
            />

            <View>
              <Text
                style={{
                  fontSize: 16,
                  color: "#333333",
                  fontWeight: "bold",
                }}
              >
                Date of Purchase
              </Text>

              {/* <View style={{ flex: 1 }}></View> */}
            </View>

            <View
              style={{
                height: 27,
                width: 257,
                backgroundColor: "#D9D9D9",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 10,
                paddingLeft: 5,
                flexDirection: "row",
              }}
            >
              <TextInput
                style={{ flex: 1, paddingLeft: 5 }}
                placeholder={"YYYY-MM-DD"}
                placeholderTextColor="#888"
                value={purchaseDate}
                onChangeText={(text) => setPurchaseDate(text)}
              ></TextInput>
              <TouchableOpacity onPress={togglePurhaseDate}>
                <Image
                  source={assets["calendar-icon"]}
                  style={styles.icon_size}
                />
              </TouchableOpacity>

              <DateTimePickerModal
                isVisible={isPurchaseDateVisible}
                mode="date"
                onConfirm={handlePurchaseDateConfirm}
                onCancel={togglePurhaseDate}
              />
            </View>

            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text
                style={{
                  fontSize: 16,
                  color: "#333333",
                  fontWeight: "bold",
                  paddingTop: 10,
                  alignItems: "center",
                }}
              >
                Expiration Date
              </Text>
            </View>

            <View
              style={{
                height: 27,
                width: 257,
                backgroundColor: "#D9D9D9",
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 10,
                flexDirection: "row",
              }}
            >
              <TextInput
                style={{ flex: 1, paddingLeft: 5 }}
                placeholder={"YYYY-MM-DD"}
                placeholderTextColor="#888"
                value={expirationDate}
                onChangeText={(text) => setExpirationDate(text)}
              ></TextInput>
              <TouchableOpacity onPress={toggleExpiryDate}>
                <Image
                  source={assets["calendar-icon"]}
                  style={styles.icon_size}
                />
              </TouchableOpacity>

              <DateTimePickerModal
                isVisible={isExpiryDateVisible}
                mode="date"
                onConfirm={handleExpiryDateConfirm}
                onCancel={toggleExpiryDate}
              />
            </View>

            <TouchableOpacity
              onPress={handlePress}
              style={[
                styles.button,
                { marginTop: 15, height: 30, justifyContent: "center" },
              ]}
            >
              <Text style={[styles.buttonText, {}]}>ADD</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  header: {
    width: "100%",
    position: "relative",
  },
  content: {
    flexBasis: "100%",
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
    alignSelf: "center",
    borderRadius: 15,
    marginTop: 25,
    marginBottom: 10,
    paddingLeft: 5,
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
    width: 55,
    height: 55,
    borderRadius: 27.5,
    marginLeft: 5,
  },

  rectangle: {
    backgroundColor: "lightgray",
    padding: 10,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "center",
    paddingHorizontal: 15,
    width: 358,
    height: 69,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 4,
    borderRadius: 20,
  },

  scrollContainer: {
    flex: 1,
    width: "100%",
    paddingTop: 20,
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
    zIndex: 1,
  },

  overlay: {
    position: "relative",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    justifyContent: "flex-start",
    alignItems: "flex-end",
  },
  icon: {
    width: 35,
    height: 30,
    resizeMode: "contain",
  },

  icons: {
    alignItems: "center",
  },

  descriptionText: {
    fontSize: 10,
    color: "white",
  },

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
    width: "100%",
    height: 62,
    resizeMode: "contain",
  },
});
