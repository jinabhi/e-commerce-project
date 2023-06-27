import CryptoJS from "crypto-js";
import moment from "moment";
import { Link } from "react-router-dom";
import parse from "html-react-parser";
import config from "../config";

const getItem = (path, label, key, icon, children) => {
  if (children) {
    return { label, key, icon, children, path };
  }
  return { label, key, icon, path };
};

export const getSideBarData = (arr) => {
  if (arr instanceof Array) {
    return arr.reduce((prev, item) => {
      if (item?.belongsToSidebar) {
        if (item.children instanceof Array) {
          const children = item.children.reduce(
            (prevElement, currentSubChild) => {
              if (currentSubChild?.belongsToSidebar) {
                prevElement.push(
                  getItem(
                    currentSubChild?.path,
                    currentSubChild?.name,
                    currentSubChild?.key,
                    currentSubChild?.icon,
                    ""
                  )
                );
              }
              return prevElement;
            },
            []
          );
          prev.push(
            getItem(item?.path, item?.name, item?.key, item?.icon, children)
          );
        } else {
          prev.push(getItem(item?.path, item?.name, item?.key, item?.icon));
        }
      }
      return prev;
    }, []);
  }
  return [];
};

export const removeSessionStorageToken = () => {
  if (sessionStorage.getItem(`${config.NAME_KEY}:token`)) {
    sessionStorage.setItem(`${config.NAME_KEY}:token`, null);
  }
};

export const setSessionStorageToken = (token) => {
  sessionStorage.setItem(
    `${config.NAME_KEY}:token`,
    CryptoJS.AES.encrypt(token, `${config.NAME_KEY}-token`).toString()
  );
};

export const removeLocalStorageToken = (navigate) => {
  if (localStorage.getItem(`${config.NAME_KEY}:token`)) {
    localStorage.setItem(`${config.NAME_KEY}:token`, null);
  }
  if (navigate) {
    navigate("/");
  }
};

export const getSessionStorageToken = () => {
  const ciphertext = sessionStorage.getItem(`${config.NAME_KEY}:token`);
  if (ciphertext) {
    const bytes = CryptoJS.AES.decrypt(ciphertext, `${config.NAME_KEY}-token`);
    return bytes.toString(CryptoJS.enc.Utf8);
  }
  return false;
};

export const getLocalStorageLanguage = () => {
  const language = localStorage.getItem(`${config.NAME_KEY}:language`);
  if (language) {
    return ["en", "hi"].includes(language) ? language : config.DEFAULT_LANGUAGE;
  }
  return config.DEFAULT_LANGUAGE;
};

export const setLocalStorageToken = (token) => {
  localStorage.setItem(
    `${config.NAME_KEY}:token`,
    CryptoJS.AES.encrypt(token, `${config.NAME_KEY}-token`).toString()
  );
};

export const getLocalStorageToken = () => {
  const token = localStorage.getItem(`${config.NAME_KEY}:token`);
  if (token) {
    const bytes = CryptoJS.AES.decrypt(token, `${config.NAME_KEY}-token`);
    return bytes.toString(CryptoJS.enc.Utf8);
  }
  return false;
};

export const getCompleteUrl = (url) => {
  return url;
};

export function decodeQueryData(data) {
  // Animesh Singh | 14-07-2022 | this code is commented because it will convert into url params without any decryption
  // const searchParam = CryptoJS.AES.decrypt(
  //   data.replace("?", ""),
  //   `${config.NAME_KEY}-data`
  // ).toString(CryptoJS.enc.Utf8);
  // return JSON.parse(searchParam);
  return JSON.parse(
    `{"${decodeURI(data)
      .replace(/"/g, '\\"')
      .replace(/&/g, '","')
      .replace(/=/g, '":"')
      .replace("?", "")}"}`
  );
}

export const navigateWithParam = (data, navigate, pathname) => {
  const searchParams = new URLSearchParams(data).toString();
  // Animesh Singh | 14-07-2022 | this code is commented because it will convert into url params without any encryption
  // const searchParams = CryptoJS.AES.encrypt(
  //   JSON.stringify(data),
  //   `${config.NAME_KEY}-data`
  // ).toString();
  navigate(`${pathname}?${searchParams}`);
};

export function getSortType(data) {
  return data === "ASC" ? "asc" : "desc";
}

export function dateFormatter(params, format) {
  return moment(params)
    .tz(moment.tz.guess())
    .format(format ?? config.DATE_FORMAT);
}

export function filterDateFormatter(param, format) {
  if (param) {
    return moment(param).format(format);
  } else {
    return "-";
  }
}

export function momentDateFormatter(param, format) {
  return moment(param, format);
}
export const momentUtcFormatter = (dates, formats) => {
  return moment.utc(dates).format(formats);
};

export function readMoreTextShow(data, showMoreText) {
  if ([undefined, null, false].includes(data)) {
    return <></>;
  }
  if (data.props) {
    if (data.props.children.length < 50) {
      return <>{data}</>;
    }
  } else if (data.length < 50) {
    return <>{data}</>;
  }
  return (
    <p className="mb-0">
      {data.props
        ? data.props.children.type === "br"
          ? " - "
          : data.props.children.substring(0, 50)
        : data.substring(0, 50)}

      {data.props ? (data.props.children.type === "br" ? " " : "... ") : "..."}

      {showMoreText ? (
        <Link
          to="/"
          onClick={(e) => {
            e.preventDefault();
            showMoreText({ data });
          }}
        >
          Read More
          {/* {t("common.readMore")} */}
        </Link>
      ) : (
        ""
      )}
    </p>
  );
}

export function PhoneNumber({ countryCode, contactNumber }) {
  let result = countryCode.includes("+");
  if (countryCode && contactNumber) {
    return (
      <>
        {result
          ? `${countryCode}-${contactNumber}`
          : `+${countryCode}-${contactNumber}`}{" "}
      </>
    );
  }
  return <span className="center">-</span>;
}

export const serialNumberFormatter = (rowIndex, currentPage, dataPerPage) => {
  return rowIndex + dataPerPage * (currentPage - 1) + 1 || rowIndex;
};

export function commasFormatter(data) {
  return data.join(", ");
}

export const getHeaderData = (arr) => {
  if (arr instanceof Array) {
    return arr.reduce((prev, item) => {
      if (item?.belongsToHeader) {
        if (item.children instanceof Array) {
          const children = item.children.reduce(
            (prevElement, currentSubChild) => {
              if (currentSubChild?.belongsToHeader) {
                prevElement.push(
                  getItem(
                    currentSubChild?.path,
                    currentSubChild?.name,
                    currentSubChild?.key,
                    currentSubChild?.icon,
                    ""
                  )
                );
              }
              return prevElement;
            },
            []
          );
          prev.push(
            getItem(item?.path, item?.name, item?.key, item?.icon, children)
          );
        } else {
          prev.push(getItem(item?.path, item?.name, item?.key, item?.icon));
        }
      }
      return prev;
    }, []);
  }
  return [];
};

export const stringToHTML = (str) => {
  return parse(str);
};

export const disabledFutureDate = (current) => {
  return current > moment();
};

export const disabledPastDate = (current) => {
  return moment().add(-1, "days") >= current;
};

export const numberFormatter = (num) => {
  if (num >= 1000) {
    let nums = (num / 1000).toFixed(1).replace(/\.0$/, "");
    return `${nums}K`;
  } else {
    return num;
  }
};
export const getFooterLink = (arr) => {
  if (arr instanceof Array) {
    return arr.reduce((prev, item) => {
      if (item?.belongsToFooter) {
        if (item.children instanceof Array) {
          const children = item.children.reduce(
            (prevElement, currentSubChild) => {
              if (currentSubChild?.belongsToFooter) {
                prevElement.push(
                  getItem(
                    currentSubChild?.path,
                    currentSubChild?.name,
                    currentSubChild?.key,
                    currentSubChild?.icon,
                    ""
                  )
                );
              }
              return prevElement;
            },
            []
          );
          prev.push(
            getItem(item?.path, item?.name, item?.key, item?.icon, children)
          );
        } else {
          prev.push(getItem(item?.path, item?.name, item?.key, item?.icon));
        }
      }
      return prev;
    }, []);
  }
  return [];
};
