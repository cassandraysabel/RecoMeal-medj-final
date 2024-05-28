import React, { createContext, useContext, useEffect, useState } from "react";
import { Text } from "react-native";

interface iUserData {
  isPremium: boolean;
  setIsPremium: (value: boolean) => void;
  createdIngredients: any[];
  setCreatedIngredients: (value: any[]) => void;
  favoriteRecipes: any[];
  setFavoriteRecipes: (value: any[]) => void;
  recommendedFavorites: any[];
  setRecommendedFavorites: (value: any[]) => void;
}

export const UserDataContext = createContext<iUserData>({
  isPremium: false,
  setIsPremium: () => {},
  createdIngredients: [],
  setCreatedIngredients: () => {},
  favoriteRecipes: [],
  setFavoriteRecipes:  () => {},
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

type ingredient =  {
  id:string,
  name: string,
  image: string,
  expirationDate: string,
  purchaseDate: string,
  daysUntilExpiration: number,
  recipes : []
}

const RecipeProvider = ({ children }) => {
  const [isPremium, setIsPremium] = useState(false);
  const [createdIngredients, setCreatedIngredients] = useState<ingredient[]>([]);
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [recommendedFavorites, setRecommendedFavorites] = useState([]);

  const value = {
    isPremium,
    setIsPremium,
    favoriteRecipes,
    setFavoriteRecipes,
   createdIngredients,
   setCreatedIngredients,
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
