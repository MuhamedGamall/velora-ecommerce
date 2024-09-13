
const store = configureStore({
  reducer: {
    // seller_products: sellerProductsSlice,
    // seller_store: sellerStoreSlice,
    // admin_categories: adminCategoriesSlice,
    // admin_products: productsSlice,
    // admin_users: adminUsersSlice,
    // admin_sellers: adminSellerSlice,
    // admin_dashboard: adminDashboardSlice,
    // member_accountData: memberAccountSlice,
    // member_categories: memberCategoriesSlice,
    // member_products: memberProductsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
