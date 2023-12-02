import { loginSuccess, logoutSuccess } from "../app/authSlice";
import { LOCAL_STORAGE } from "../utils/storageConstants";

const verifyAccessTokenRequest = async () => {
    return 1;
}

const authService = {
    handleLogin: (dispatch, user, token) => {
        localStorage.setItem(LOCAL_STORAGE.JWT_TOKEN, token);
        dispatch(loginSuccess());
    },
    handleAutoLogin: async (dispatch) => {

        // eslint-disable-next-line no-constant-condition
        if (true || localStorage.getItem(LOCAL_STORAGE.REMEMBER_ME)) {
            try {
                const res = await verifyAccessTokenRequest();
                if (res) {
                    dispatch(loginSuccess());
                }
            } catch (error) {
                // Handle errors if needed
            }
        }
    },
    handleLogout: (dispatch) => {
        localStorage.removeItem(LOCAL_STORAGE.REMEMBER_ME);
        localStorage.removeItem(LOCAL_STORAGE.JWT_TOKEN);
        dispatch(logoutSuccess());
    },
};

export default authService;
