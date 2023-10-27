// store.js
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers/rootReducer";

const store = configureStore({
  reducer: rootReducer,

  // Ajoutez d'autres configurations du store si nécessaire
});

export default store;




