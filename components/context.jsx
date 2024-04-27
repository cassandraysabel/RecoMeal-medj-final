import { createContext, useContext, useState } from "react";

const UserDataContext = createContext();

export const useDataContext = () => {
    return useContext(UserDataContext)
}

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
  <UserDataContext.Provider value={value}>
    {children}
  </UserDataContext.Provider>;
};
