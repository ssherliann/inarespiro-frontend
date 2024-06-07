import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import "antd/dist/antd";
import { ChakraProvider } from "@chakra-ui/react";
import { AuthProvider } from "./contexts/AuthContext";
import { BasketProvider } from "./contexts/BasketContext";
import { fetchUserId } from "./api"; 
import App from "./App";
import "./reset.css";

const Root = () => {
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUserId = async () => {
      try {
        const id = await fetchUserId();
        setUserId(id);
      } catch (error) {
        console.error("Failed to fetch user ID", error);
      } finally {
        setLoading(false);
      }
    };
    getUserId();
  }, []);

  if (loading) {
    return <div>Loading...</div>; 
  }

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ChakraProvider>
          <AuthProvider>
            <BasketProvider userId={userId}>
              <App />
            </BasketProvider>
          </AuthProvider>
        </ChakraProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    },
  },
});

root.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
