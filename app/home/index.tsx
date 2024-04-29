import {
  Button,
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React from "react";
import { assets } from "../../components/assets";
import RecipeList from "../../components/RecipeList";
import { UserDataContext, useDataContext } from "../../components/context";
import { Link } from "expo-router";

const ScreenWidth = Dimensions.get("window").width;
export default function HomePage() {
  const { createdRecipes } = useDataContext();


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Image
            source={assets.gradient}
            style={{ position: "absolute", marginTop: 2 }}
          ></Image>
        </View>
        <View style={styles.abtnprem}>
          <Image style={{ width: 20, height: 20 }} source={assets.premium} />
          <Text
            style={{
              fontSize: 15,
              fontWeight: "bold",
              color: "#333A73",
              left: -80,
            }}
          >
            <Text
              style={{ fontSize: 15, fontWeight: "bold", color: "#FBA834" }}
            >
              PREMIUM
            </Text>
          </Text>
          <Link href={"/home/about"}>
          <Text style={{ fontSize: 15, fontWeight: "bold", color: "#333A73" }}>
            {" "}
            ABOUT{" "}
          </Text>
          </Link>
          
        </View>
        <View style={styles.headerbottom}>
          <View>
            <Text
              style={{
                color: "#333A73",
                fontSize: 25,
                fontWeight: "bold",
                marginLeft: 25,
                marginTop: 45,
              }}
            >
              WELCOME!
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Input your ingredients"
              placeholderTextColor={"#333A73"}
            />
          </View>

          <Image
            style={{ width: 30, height: 30 }}
            source={assets["calendar-icon"]}
          />
          <Pressable style={{ paddingBottom: 10 }}>
            <Text>Add</Text>
          </Pressable>
          <View style={{paddingRight: 10, }}>
            <View
              style={{
                backgroundColor: "white",
                width: 80,
                height: 80,
                borderRadius: 100,
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <Image
                style={{ width: 100, height: 100 }}
                source={assets.logoNoText}
              />
            </View>
          </View>
        </View>
      </View> 

      <Text
        style={{
          color: "#333A73",
          fontSize:20,
          fontWeight: "bold",
          marginLeft: 10,
          marginTop: 20,
        }}
        >
        Choose your Recipe
        </Text>
      
      <RecipeList recipes={createdRecipes} />
      
    </View>


  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: "100%",
    width: "100%",
  },
  header: {
    width: "100%",
    position: "relative",
  },

  abtnprem: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-around",
    alignContent: "flex-start",
    top: 20,
    marginTop: 20
  },
  headerbottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  input: {
    width: 190,
    height: 40,
    backgroundColor: "#D9D9D9",
    borderRadius: 10,
    marginLeft: 10,
    top: 0,
    shadowOpacity: 0.59,
    shadowRadius: 4.65,
    elevation: 7,
    paddingHorizontal: 5,
  },

  calendar: {
    shadowOpacity: 0.59,
    shadowRadius: 4.65,
    elevation: 7,
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

  deleteposition: {},

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
    marginTop: 10,
    marginBottom: 10,
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
    top: 0,
    left: 0,
    width: "50%",
    height: "12%",
  },

  gradientimage: {
    width: "100%",
    height: "12%",
  },

  ingredientsText: {
    color: "#333A73",
    fontSize: 30,
    fontWeight: "bold",
    opacity: 1,
    position: "absolute",
    top: 40,
    right: 15,
  },

  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: ScreenWidth,
    height: "100%",
    justifyContent: "flex-start",
    alignItems: "flex-end",
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
    width: ScreenWidth,
    height: 62,
    resizeMode: "contain",
  },

  recipe_rectangle: {
    width: 511,
    height: 234,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 5,
  },
});
