import axios from "axios";

axios.interceptors.request.use(
  function (config) {
    const { origin } = new URL(config.url);

    const allowedOrigins = ['https://inarespiro.onrender.com'];
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
  const { data } = await axios.post(
    `${process.env.REACT_APP_BASE_ENDPOINT}/product/`,
    input
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

const getToken = () => {
  return localStorage.getItem('access-token'); 
};

export const postOrder = async (input) => {
  const token = getToken();
  console.log("Token:", token); // Check if the token is correctly retrieved
  console.log("Endpoint:", process.env.REACT_APP_BASE_ENDPOINT); // Check if the endpoint is correct
  
  try {
    const { data } = await axios.post(
      `${process.env.REACT_APP_BASE_ENDPOINT}/order`, 
      input,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Ensure the 'Bearer' prefix is used
        },
      }
    );
    return data;
  } catch (e) {
    if (e.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error("Server responded with an error:", e.response.data);
    } else if (e.request) {
      // The request was made but no response was received
      console.error("No response received:", e.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("Error setting up the request:", e.message);
    }
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
    return data;
  } catch (e) {
    console.log(e.response ? e.response.data : e.message);
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
