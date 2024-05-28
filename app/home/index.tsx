import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  ScrollView,
  View,
  SafeAreaView,
} from "react-native";
import { assets } from "../../components/assets";
import RecipeList from "../../components/RecipeList";
import { useDataContext } from "../../utils/UserData";
import { Link, router } from "expo-router";
import { useAuth } from "../../utils/Auth";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import RecipeCard from "../../components/RecipeCard";
import { Linking } from 'react-native';

const ScreenWidth = Dimensions.get("window").width;

export default function HomePage() {
  const { createdIngredients } = useDataContext();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Image
            source={assets.gradient}
            style={{ position: "absolute", marginTop: 2, left: 0, right: 0 }}
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
            <Text
              style={{ fontSize: 15, fontWeight: "bold", color: "#333A73" }}
            >
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
                left: 50,
                bottom: 40,
                position: "absolute",
              }}
            >
              Welcome!
            </Text>
          </View>

          <View style={{ paddingRight: 10, marginTop: 5 }}>
            <View
              style={{
                backgroundColor: "white",
                width: 80,
                height: 80,
                borderRadius: 100,
                alignItems: "center",
                justifyContent: "flex-end",
                marginTop: 10,
                marginRight: 25,
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
      <View>
        <SafeAreaView>
          <ScrollView>
            <Text
              style={{
                color: "#333A73",
                fontSize: 20,
                fontWeight: "bold",
                marginLeft: 15,
                marginTop: 0,
              }}
            >
              Choose your Recipe
            </Text>{
              (createdIngredients.length === 0) ?  <View style={styles.noIngContainer}>
            
            <MaterialCommunityIcons name="pot-steam-outline" size={60} color="#5F648B" style={styles.cookingpot} />
            <View style={styles.noingtextContainer}>
            <Text style={styles.noIngredientsText}>
            No ingredients to display. </Text>
            
            <Text style={styles.noIngredientsText}> Try inputting something in the ingredients page.</Text>
            </View>
            
            
            </View> : <View />
            }
            {createdIngredients.map((ingredient, index) => {
              if (ingredient.recipes.length === 0) {
                return <View />;
              }
              return (
                <RecipeList
                key = {index}
                ingredient={ingredient}
                  recipes={ingredient.recipes}
                />
              );
            })}

            <Text
              style={{
                color: "#333A73",
                fontSize: 20,
                fontWeight: "bold",
                marginLeft: 15,
                marginTop: 0,
                height: 500,
              }}
            ></Text>
          </ScrollView>
        </SafeAreaView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: "100%",
    position: "relative",
    marginTop: -30,
  },

  abtnprem: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-around",
    alignContent: "flex-start",
    marginTop: 20,
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

  tagContainer: {
    borderColor: "#333A73",
    borderWidth: 5,
    margin:5,
    borderRadius: 16,
  },
  text: {
    flexDirection: "row",
    alignItems: "center",
    fontSize: 24,
    fontWeight: "bold",
    paddingLeft: 15,
    paddingTop: 10,
  },
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: 20,
  },
  button: {
    backgroundColor: "white",
    padding: 5,
    margin: 5,
    borderRadius: 100,
    borderWidth: 3,
    borderColor: "#333A73",
    marginBottom: 13,
  },
  activeButton: {
    backgroundColor: "#FBA834",
    borderColor: "#FBA834",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  activeButtonText: {
    color: "white",
  },
  cookingpot: {
    marginTop: 145,
    marginBottom: 5,
    alignSelf: "center",
  },
  noIngredientsText:{
    marginLeft: 20,
    marginRight: 20,
    marginTop: 5, 
    fontSize: 15,
    textAlign: "center"
  },
  noingtextContainer:{
  },
  noIngContainer:{
    paddingTop: 70,
    paddingBottom: 20
  }
});
