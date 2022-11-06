import app from "../app.js";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const callInternalAPI = async (req, url, method, data) => {
  const token = req.headers.authorization;

  const options = {
    url: `${process.env.SERVER_API}/${url}`,
    method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
      Authorization: token,
    },
    data: { ...data },
  };

  try {
    // handle success
    const response = await axios(options);

    return {
      res: response,
      data: response.data,
    };
  } catch (error) {
    // handle error
    console.log(error);
  }
};

export default callInternalAPI;
