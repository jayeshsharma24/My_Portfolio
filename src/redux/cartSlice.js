import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    items: localStorage.getItem("carts") ? JSON.parse(localStorage.getItem("carts")) : [],
    statusTab: false
}
const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        // THIS ADD TO CART REDUCER ITEMS MULTIPLE QUANTITY WHEN ADDED TO CART IS CLICK HERE WE NEED TO ADD OUR PRODUCT ONLY SINGLE QUANTITY SO WE MAKE CHANGES IN OUR ADDTOCART REDUCER AS MENTIONED BELOW
        // addToCart(state, action){
        //     const {productId, quantity} = action.payload;
        //     const indexProductId = (state.items).findIndex(item => item.productId === productId);
        //     if(indexProductId >= 0){
        //         state.items[indexProductId].quantity += quantity;
        //     }else{
        //         state.items.push({productId, quantity});
        //     }
        //     localStorage.setItem("carts", JSON.stringify(state.items));
        // },
        addToCart(state, action) {
            const { productId } = action.payload;
            const indexProductId = state.items.findIndex(item => item.productId === productId);
        
            if (indexProductId === -1) {
                // Item not in cart, add it with quantity 1
                state.items.push({ productId, quantity: 1 });
            } else {
                // Item already in cart, do NOT add again or increase quantity
                // Optionally: you can notify the user here via UI logic
            }
        
            localStorage.setItem("carts", JSON.stringify(state.items));
        },
        
        changeQuantity(state, action){
            const {productId, quantity} = action.payload;
            const indexProductId = (state.items).findIndex(item => item.productId === productId);
            if(quantity > 0){
                state.items[indexProductId].quantity = quantity;
            }else{
                state.items = (state.items).filter(item => item.productId !== productId);
            }
            localStorage.setItem("carts", JSON.stringify(state.items));
        },
        
        toggleStatusTab(state){
            if(state.statusTab === false){
                state.statusTab = true;
            }else{
                state.statusTab = false;
            }
        }
    }
})
export const { addToCart, changeQuantity, toggleStatusTab } = cartSlice.actions;
export default cartSlice.reducer;