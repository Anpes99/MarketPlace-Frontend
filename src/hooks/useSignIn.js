import axios from "axios";
import { useState } from "react";

const useSignIn = () => {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const signIn = async ({ username, password }) => {
    try {
      const response = await axios.post("/api/login", {
        username,
        password,
      });

      console.log(response);
      if (response.status === 200 && response.data.token) {
        setSuccess(true);
        localStorage.setItem(
          "loggedInMarketPlaceUser",
          JSON.stringify(response.data.token)
        );
      }
      return response;
    } catch (error) {
      console.log(error);
      setError(error);
    }

    /*if (result.data.authorize) {
      authStorage.setAccessToken(result.data.authorize.accessToken);
      apolloClient.resetStore();
    }
*/
  };

  return [signIn, success, error];
};

export default useSignIn;
