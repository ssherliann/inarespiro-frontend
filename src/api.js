import axios from "axios";

axios.interceptors.request.use(
  function (config) {
    const { origin } = new URL(config.url);

    const allowedOrigins = ['*'];
    const token = localStorage.getItem("access-token");

    if (allowedOrigins.includes(origin)) {
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

const getToken = () => {
  const token = localStorage.getItem('access-token');
  if (!token) {
    console.error("Token is missing");
    return null;
  }
  console.log("Retrieved Token:", token);
  return token;
};

export const fetchProductList = async ({ pageParam = 1 }) => {
  const { data } = await axios.get(
    `${process.env.REACT_APP_BASE_ENDPOINT}/product?page=${pageParam}`
  );

  return data;
};

export const fetchProduct = async (id) => {
  const { data } = await axios.get(
    `${process.env.REACT_APP_BASE_ENDPOINT}/product/${id}`
  );

  return data;
};

export const postProduct = async (input) => {
  const token = getToken();

  const { data } = await axios.post(
    `${process.env.REACT_APP_BASE_ENDPOINT}/product`,
    input,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return data;
};

export const fetcRegister = async (input) => {
  const { data } = await axios.post(
    `${process.env.REACT_APP_BASE_ENDPOINT}/auth/register`,
    input
  );

  return data;
};

export const fetchLogin = async (input) => {
  const { data } = await axios.post(
    `${process.env.REACT_APP_BASE_ENDPOINT}/auth/login`,
    input
  );

  return data;
};

export const fetchMe = async () => {
  const { data } = await axios.get(
    `${process.env.REACT_APP_BASE_ENDPOINT}/auth/me`
  );
  return data;
};

export const fetchLogout = async () => {
  const { data } = await axios.post(
    `${process.env.REACT_APP_BASE_ENDPOINT}/auth/logout`,
    {
      refresh_token: localStorage.getItem("refresh-token"),
    }
  );
  return data;
};

export const fetchUserId = async () => {
  const { data } = await axios.get(
    `${process.env.REACT_APP_BASE_ENDPOINT}/auth/me`
  );
  let id = data._id;
  return id;
};

export const postOrder = async (input) => {
  const token = getToken();

  try {
    const { data } = await axios.post(
      `${process.env.REACT_APP_BASE_ENDPOINT}/order`,
      input,
      {
        headers: {
          "Access-Control-Allow-Origin": "https://inarespiro.onrender.com",
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      }
    );
    console.log("Response Data:", data);
    return data;
  } catch (e) {
    console.log("Error:", e.response ? e.response.data : e.message);
  }
};

export const fetchOrders = async () => {
  const token = getToken();

  try {
    const { data } = await axios.get(
      `${process.env.REACT_APP_BASE_ENDPOINT}/order`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("Response Data:", data);
    return data;
  } catch (e) {
    console.log("Error:", e.response ? e.response.data : e.message);
  }
};

export const deleteProduct = async (product_id) => {
  const { data } = await axios.delete(
    `${process.env.REACT_APP_BASE_ENDPOINT}/product/${product_id}`
  );

  return data;
};

export const updateProduct = async (input, product_id) => {
  const { data } = await axios.put(
    `${process.env.REACT_APP_BASE_ENDPOINT}/product/${product_id}`,
    input
  );

  return data;
};
