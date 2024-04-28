import React, { createContext, useContext, useState } from "react";
import { Text } from "react-native";

interface iUserData {
  isPremium: boolean;
  setIsPremium: (value: boolean) => void;
  ingredients: any[];
  setIngredients: (value: any[]) => void;
  favoriteRecipes: any[];
  setFavoriteRecipes: (value: any[]) => void;
  createdRecipes: any[];
  setCreatedRecipes: (value: any[]) => void;
  recommendedFavorites: any[];
  setRecommendedFavorites: (value: any[]) => void;
}

export const UserDataContext = createContext<iUserData>({
  isPremium: false,
  setIsPremium: () => {},
  ingredients: [],
  setIngredients: () => {},
  favoriteRecipes: [],
  setFavoriteRecipes: () => {},
  createdRecipes: [],
  setCreatedRecipes: () => {},
  recommendedFavorites: [],
  setRecommendedFavorites: () => {},
});

export const useDataContext = () => {
  const context = useContext(UserDataContext);
  if (!context) {
    throw new Error("useDataContext must be used within a RecipeProvider");
  }
  return context;
};

const RecipeProvider = ({ children }) => {
  const [isPremium, setIsPremium] = useState(false);
  const [ingredients, setIngredients] = useState([]);
  const [createdRecipes, setCreatedRecipes] = useState([]);
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [recommendedFavorites, setRecommendedFavorites] = useState([]);

  const value = {
    isPremium,
    setIsPremium,
    ingredients,
    setIngredients,
    favoriteRecipes,
    setFavoriteRecipes,
    createdRecipes,
    setCreatedRecipes,
    recommendedFavorites,
    setRecommendedFavorites,
  };

  return (
    <UserDataContext.Provider value={value}>
      {children}
    </UserDataContext.Provider>
  );
};

export default RecipeProvider;
