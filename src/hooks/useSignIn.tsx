import axios, { AxiosResponse } from "axios";
import { useState } from "react";
import { AnySchema } from "yup";
import { Credentials } from "../types/types";

const useSignIn = () => {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);



  const signIn = async ({ username, password }: Credentials): Promise<any> => {
    try {
      const response = await axios.post("/api/login", {
        username,
        password,
      });

      console.log(response);
      if (response.status === 200 && response.data.token) {
        console.log("here1")
  console.log(response)
        setSuccess(true);
        localStorage.setItem(
          "loggedInMarketPlaceUser",
          JSON.stringify(response.data.token)
        );
      console.log("here1")

      }
      return response;
    } catch (error : any) {
      console.log(error);

      setError(error.message);
      throw(error)
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
