import axios, { AxiosResponse } from "axios";
import { stringify } from "query-string";
import { useCallback, useEffect, useState } from "react";

// Note the use snake_case is in tandem of the Spotify API naming
interface SpotifyTokenResponse {
  access_token: string; // used to access their web api
  token_type: string; // always 'Bearer'
  scope: string; // scopes we are allowed
  expires_in: number; // seconds
  refresh_token: string; // used this in lieu of the auth code to get another token set
}

interface SpotifyAuthCodeRequest {
  grant_type: string; // 'authorization_code'
  code: string; // the actual auth code received earlier
  redirect_uri: string; // needs to match OG one used
  client_id: string; // Can pass here or in header as base64 combo
  client_secret: string; // ditto^
}

interface SpotifyRefreshTokenRequest {
  grant_type: string; // 'refresh_token'
  refresh_token: string;
  client_id: string;
  client_secret: string;
}

const spotifyTokenUrl = "https://accounts.spotify.com/api/token";
const headers = {
  "Content-Type": "application/x-www-form-urlencoded",
  Accept: "application/json",
};

export const useAuth = (code: string) => {
  const [isLoading, setIsLoading] = useState(true);
  const [accessToken, setAccessToken] = useState<string>();
  const [refreshToken, setRefreshToken] = useState<string>();
  const [expiresIn, setExpiresIn] = useState<number>();
  const [error, setError] = useState<string>();

  const refetchRefreshToken = useCallback(() => {
    const body = {
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    };
    const base64Header = {
      headers: {
        Authorization: `Basic ${btoa(
          process.env.REACT_APP_CLIENT_ID +
            ":" +
            process.env.REACT_APP_CLIENT_SECRET
        )}`,
      },
    };

    axios
      .post<SpotifyRefreshTokenRequest, AxiosResponse<SpotifyTokenResponse>>(
        spotifyTokenUrl,
        stringify(body),
        base64Header
      )
      .then((res) => {
        const { access_token, refresh_token, expires_in } = res.data;

        setAccessToken(access_token);
        setExpiresIn(expires_in);
        if (refresh_token) setRefreshToken(refresh_token);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, [refreshToken]);

  useEffect(() => {
    const body = {
      grant_type: "authorization_code",
      code,
      redirect_uri: process.env.REACT_APP_AUTH_ROOT_URL,
      client_id: process.env.REACT_APP_CLIENT_ID,
      client_secret: process.env.REACT_APP_CLIENT_SECRET,
    };

    axios
      .post<SpotifyAuthCodeRequest, AxiosResponse<SpotifyTokenResponse>>(
        spotifyTokenUrl,
        stringify(body),
        { headers }
      )
      .then((res) => {
        const { access_token, refresh_token, expires_in } = res.data;

        setAccessToken(access_token);
        setRefreshToken(refresh_token);
        setExpiresIn(expires_in);
        setIsLoading(false);

        // clean up url and remove code from it
        window.history.pushState({}, "", "/");
      })
      .catch((err) => {
        setError(err.message);
      });
  }, [code]);

  useEffect(() => {
    if (!refreshToken || !expiresIn) return;

    // interval bc this is a recurring process
    const timeout = setInterval(refetchRefreshToken, (expiresIn - 60) * 1000); //1 min before expiry

    //clear on error
    return () => clearInterval(timeout);
  }, [expiresIn, refreshToken, refetchRefreshToken]);

  return {
    accessToken,
    isLoading,
    error,
    refetchRefreshToken,
  };
};
