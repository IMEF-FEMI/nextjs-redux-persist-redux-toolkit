import { configureStore, ThunkAction, Action, getDefaultMiddleware, } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import {  persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist"
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web


import counterReducer from 'components/counter/counterSlice'

const persistConfig = {
  key: 'root',
  storage,
  // blacklist: ['counter'], //add slice to be ignored here
}

const rootReducer = combineReducers({
  counter: counterReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export function makeStore() {
  return configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware)=> getDefaultMiddleware({
      serializableCheck:{
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE,REGISTER]
      }
    })
  })
}

const store = makeStore()

export type AppState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action<string>>

export default store