import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductType } from '../types/Product';

const initialState:ProductType[] = []

export const basketSlice = createSlice({
    name: "basket",
    initialState,
    reducers: {
        // Actions
        addToBasket: (state, action: PayloadAction<ProductType>) => [...state, action.payload],
        removeFromBasket: (state, action) => {}
    },
});

export const { addToBasket, removeFromBasket } = basketSlice.actions;

export const selectItems = (state: any) => state.basket;

export default basketSlice.reducer;