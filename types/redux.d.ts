declare type AppStore = ReturnType<typeof import('@store/store').store>
declare type RootState = ReturnType<typeof import('@store/store').rootReducer>
declare type AppDispatch = typeof import('@store/store').store.dispatch
