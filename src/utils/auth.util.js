import { getLocalStorageToken } from ".";
/** ****Function is driver function for authenticate*******
 * ****user and route for which it will**************
 * ****return true and false************************** */

function authDriver(route, userData, pathname) {
  try {
    let checkData = getLocalStorageToken();
    let user = "";
    if (pathname.search("admin") >= 0) {
      user = "admin";
    } else if (pathname.search("staff") >= 0) {
      user = "staff";
    } else if (pathname.search("brand") >= 0) {
      user = "seller";
    } else {
      user = "promotional";
    }
    // if (!userData?.rememberMe) {
    //   checkData = getSessionStorageToken();
    // } else {
    //   checkData = getLocalStorageToken();
    // }

    if (user === "seller" && route?.commonRoutes === true) {
      return true;
    } else if (route.private && userData?.userRole === user) {
      // ********For secure route**************
      if (!!checkData) {
        return true;
      } else {
        return false;
      }
    } else {
      // **Non secure route****
      if (!!checkData) {
        return false;
      }
      if (route.private === false) {
        return true;
      } else {
        return false;
      }
    }
  } catch (err) {
    return false;
  }
}

export default authDriver;
