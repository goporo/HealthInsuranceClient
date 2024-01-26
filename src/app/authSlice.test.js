import { configureStore } from '@reduxjs/toolkit';
import authReducer, { loginSuccess, logoutSuccess } from './authSlice';

describe('authSlice', () => {
  it('should handle loginSuccess', () => {
    const initialState = {
      user: {},
      isLoggedIn: false,
    };

    const store = configureStore({ reducer: authReducer, preloadedState: initialState });

    // Dispatch the action
    store.dispatch(loginSuccess());

    // Check if the state is updated correctly
    const state = store.getState();
    expect(state.isLoggedIn).toBe(true);
  });

  it('should handle logoutSuccess', () => {
    const initialState = {
      user: {},
      isLoggedIn: true,
    };

    const store = configureStore({ reducer: authReducer, preloadedState: initialState });

    // Dispatch the action
    store.dispatch(logoutSuccess());

    // Check if the state is updated correctly
    const state = store.getState();
    expect(state.isLoggedIn).toBe(false);
  });
});
