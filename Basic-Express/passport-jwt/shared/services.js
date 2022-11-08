import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const optionsAxios = (url, token, method, data) => {
  return {
    url: `${process.env.SERVER_API}${url}`,
    method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
      Authorization: token,
    },
    data: { ...data },
  };
};

const get = async (req, url) => {
  try {
    // handle success
    const response = await axios(optionsAxios(url, req.token, "GET"));

    return {
      res: response,
      data: response.data,
    };
  } catch (error) {
    // handle error
    console.log(error);
  }
};

const post = async (req, url, data) => {
  try {
    // handle success
    const response = await axios(optionsAxios(url, req.token, "POST", data));

    return {
      res: response,
      data: response.data,
    };
  } catch (error) {
    // handle error
    console.log(error);
  }
};

export default { get, post };
