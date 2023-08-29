import { IProduct } from '@/types/globalTypes';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface ICared {
  products: IProduct[];
  total : number;
}

const initialState: ICared = {
  products: [],
  total : 0
};

const cardSlice = createSlice({
  name: 'card',
  initialState,
  reducers: {
    addToCard: (state, action: PayloadAction<IProduct>) => {
      const existing = state.products.find(
        (product) => product._id === action.payload._id
      );

      if (existing) {
        existing.quantity = existing.quantity! + 1;
      } else {
        state.products.push({ ...action.payload, quantity: 1 });
      }
      state.total += action.payload.price
    },
    removeOne: (state, action: PayloadAction<IProduct>) => {
      const existing = state.products.find(
        (product) => product._id === action.payload._id
      );

      if (existing && existing.quantity! > 1) {
        existing.quantity = existing.quantity! - 1;
      }else{
        state.products = state.products.filter(
          (product) => product._id !== action.payload._id
        );
      }
      state.total -= action.payload.price
    },
    removeFromCard: (state, action: PayloadAction<IProduct>) => {
      state.products = state.products.filter(
        (product) => product._id !== action.payload._id
      );
      state.total -= action.payload.price * action.payload.quantity!;
    },
  },
});

export const { addToCard, removeFromCard, removeOne } = cardSlice.actions;
export default cardSlice.reducer;
