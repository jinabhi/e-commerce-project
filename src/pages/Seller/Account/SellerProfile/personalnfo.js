import React from "react";
import {
  checkValidData,
  GlobalLoader,
  mobileFormatter,
} from "../../../../components";

function PersonalInfo({ info, loading }) {
  return (
    <div className="col-md-4">
      <div className="myAccount_left bg-850 d-flex justify-content-center align-items-center radius-20">
        <div className="profile text-center">
          {loading ? (
            <GlobalLoader />
          ) : (
            <>
              <div className="profile_img">
                <img
                  src={info?.profilePictureUrl}
                  className="img-fluid h-100"
                  alt="morluxury"
                />
              </div>
              <h2 className="text-white">
                {checkValidData(info?.firstName)}
                {checkValidData(info?.lastName)}
              </h2>
              <p>{checkValidData(info?.email)}</p>
              <p className="mb-0">
                {mobileFormatter(
                  info?.phoneNumberCountryCode,
                  info?.phoneNumber
                )}
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default PersonalInfo;
