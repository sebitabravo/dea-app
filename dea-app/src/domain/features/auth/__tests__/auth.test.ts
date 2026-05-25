import authReducer, {
  loginUser,
  registerUser,
  restoreToken,
  logout,
  clearError,
} from '../auth';
import type { User } from '@/domain/models/user/User';

jest.mock('@/data/services/secureTokenStorage', () => ({
  clearAuthToken: jest.fn(),
  saveAuthToken: jest.fn(),
  getAuthToken: jest.fn(),
}));

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error?: unknown;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: true,
};

describe('auth slice', () => {
  describe('sync reducers', () => {
    it('restoreToken sets token and isAuthenticated', () => {
      const state = authReducer(initialState, restoreToken('fake-token'));
      expect(state.token).toBe('fake-token');
      expect(state.isAuthenticated).toBe(true);
      expect(state.isLoading).toBe(false);
    });

    it('restoreToken with null payload sets isAuthenticated false', () => {
      const state = authReducer(initialState, restoreToken(null));
      expect(state.token).toBeNull();
      expect(state.isAuthenticated).toBe(false);
      expect(state.isLoading).toBe(false);
    });

    it('logout clears entire auth state', () => {
      const loggedIn: AuthState = {
        user: { id: 1, email: 'a@b.com', username: null, role: null },
        token: 'abc',
        isAuthenticated: true,
        isLoading: false,
      };
      const state = authReducer(loggedIn, logout());
      expect(state.user).toBeNull();
      expect(state.token).toBeNull();
      expect(state.isAuthenticated).toBe(false);
      expect(state.isLoading).toBe(false);
    });

    it('clearError resets error to null', () => {
      const errored: AuthState = {
        user: null,
        token: null,
        isAuthenticated: false,
        isLoading: false,
        error: 'Something went wrong',
      };
      const state = authReducer(errored, clearError());
      expect(state.error).toBeNull();
    });
  });

  describe('loginUser thunk', () => {
    it('pending sets isLoading and clears error', () => {
      const action = { type: loginUser.pending.type };
      const state = authReducer(initialState, action);
      expect(state.isLoading).toBe(true);
      expect(state.error).toBeNull();
    });

    it('fulfilled sets user, token, isAuthenticated', () => {
      const payload = { token: 'jwt-token', user: { id: 1, email: 'a@b.com', username: null, role: null } };
      const action = { type: loginUser.fulfilled.type, payload };
      const state = authReducer(initialState, action);
      expect(state.isLoading).toBe(false);
      expect(state.isAuthenticated).toBe(true);
      expect(state.token).toBe('jwt-token');
      expect(state.user).toEqual(payload.user);
    });

    it('rejected sets error', () => {
      const action = { type: loginUser.rejected.type, payload: 'Invalid credentials' };
      const state = authReducer(initialState, action);
      expect(state.isLoading).toBe(false);
      expect(state.error).toBe('Invalid credentials');
    });

    it('rejected without payload sets undefined error', () => {
      const action = { type: loginUser.rejected.type };
      const state = authReducer(initialState, action);
      expect(state.isLoading).toBe(false);
      expect(state.error).toBeUndefined();
    });
  });

  describe('registerUser thunk', () => {
    it('pending sets isLoading and clears error', () => {
      const action = { type: registerUser.pending.type };
      const state = authReducer(initialState, action);
      expect(state.isLoading).toBe(true);
      expect(state.error).toBeNull();
    });

    it('fulfilled sets user, token, isAuthenticated', () => {
      const payload = { token: 'new-token', user: { id: 2, email: 'c@d.com', username: null, role: null } };
      const action = { type: registerUser.fulfilled.type, payload };
      const state = authReducer(initialState, action);
      expect(state.isLoading).toBe(false);
      expect(state.isAuthenticated).toBe(true);
      expect(state.token).toBe('new-token');
      expect(state.user).toEqual(payload.user);
    });

    it('rejected sets error', () => {
      const action = { type: registerUser.rejected.type, payload: 'Email already exists' };
      const state = authReducer(initialState, action);
      expect(state.isLoading).toBe(false);
      expect(state.error).toBe('Email already exists');
    });
  });
});
