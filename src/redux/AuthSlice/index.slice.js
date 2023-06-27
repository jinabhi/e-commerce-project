import { createSlice } from "@reduxjs/toolkit";
import moduleRoutesMap from "../../routeControl";
import {
  // removeSessionStorageToken,
  removeLocalStorageToken,
} from "../../utils";
import logger from "../../utils/logger";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    userData: {},
    sellerRegisterData: {},
    sideBarKey: "0",
    adminAuth: {},
    sellerAuth: {},
    staffAuth: {},
  },
  reducers: {
    loginAction: (state, action) => {
      return (state = {
        ...state,
        userData: { ...action.payload },
        sideBarKey: 0,
      });
    },
    sideBarAction: (state, action) => {
      return (state = {
        ...state,
        sideBarKey: action.payload,
      });
    },
    logoutAction: (state) => {
      return (state = {
        ...state,
        userData: {},
        sideBarKey: 0,
      });
    },
    updateSellerRegisterAction: (state, action) => {
      return (state = {
        ...state,
        sellerRegisterData: action.payload,
      });
    },
    updateUserDataAction: (state, action) => {
      return (state = {
        ...state,
        userData: {
          ...state.userData,
          ...action.payload,
        },
      });
    },
    updateAdminAuthAction: (state, action) => {
      return (state = {
        ...state,
        adminAuth: action.payload,
      });
    },
    updateSellerAuthAction: (state, action) => {
      return (state = {
        ...state,
        sellerAuth: action.payload,
      });
    },
    updateStaffAuthAction: (state, action) => {
      return (state = {
        ...state,
        staffAuth: action.payload,
      });
    },
  },
});

export const {
  loginAction,
  updateUserDataAction,
  logoutAction,
  updateSellerRegisterAction,
  sideBarAction,
  updateAdminAuthAction,
  updateSellerAuthAction,
  updateStaffAuthAction,
} = authSlice.actions;

export const login = (data) => async (dispatch) => {
  try {
    dispatch(loginAction(data));
  } catch (error) {
    logger(error);
  }
};

export const updateSidebarKey = (data) => async (dispatch) => {
  try {
    dispatch(sideBarAction(data));
  } catch (error) {
    logger(error);
  }
};

export const logout = (navigate, userRole) => async (dispatch) => {
  try {
    // if (!remember) {
    // removeSessionStorageToken();
    removeLocalStorageToken();
    // }
    // if (userRole === "seller") {
    //   dispatch(logoutAction());
    //   navigate(routesMapSeller.LOGIN.path);
    // } else {
    dispatch(logoutAction());
    navigate(moduleRoutesMap[userRole].LOGIN.path);
    // }
  } catch (error) {
    logger(error);
  }
};
export const updateUserData = (data) => async (dispatch) => {
  try {
    dispatch(updateUserDataAction(data));
  } catch (error) {
    logger(error);
  }
};

export const updateSellerRegisterData = (data) => async (dispatch) => {
  try {
    dispatch(updateSellerRegisterAction(data));
  } catch (error) {
    logger(error);
  }
};

export const updateAdminAuthData = (data) => async (dispatch) => {
  try {
    dispatch(updateAdminAuthAction(data));
  } catch (error) {
    logger(error);
  }
};

export const updateSellerAuthData = (data) => async (dispatch) => {
  try {
    dispatch(updateSellerAuthAction(data));
  } catch (error) {
    logger(error);
  }
};

export const updateStaffAuthData = (data) => async (dispatch) => {
  try {
    dispatch(updateStaffAuthAction(data));
  } catch (error) {
    logger(error);
  }
};

export const selectUserData = (state) => state.auth.userData;

export const getSidebarKey = (state) => state.auth.sideBarKey;
export const getAdminAuthData = (state) => state.auth.adminAuth;
export const getSellerAuthData = (state) => state.auth.sellerAuth;
export const getStaffAuthData = (state) => state.auth.staffAuth;
export const selectSellerRegisterData = (state) =>
  state.auth.sellerRegisterData;
export default authSlice.reducer;
