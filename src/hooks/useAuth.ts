import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react"

// Note the use snake_case is in tandem of the Spotify API naming
interface SpotifyTokenAuthResponse {
    access_token: string // used to access their web api
    token_type: string // always 'Bearer'
    scope: string // scopes we are allowed
    expires_in: number // seconds
    refresh_token: string // used this in lieu of the auth code to get another token set
}

interface SpotifyTokenAuthRequest {
    grant_type: string // 'authorization_code'
    code: string // the actual auth code received earlier
    redirect_uri: string // needs to match OG one used
    client_id: string // Can pass here or in header as base64 combo
    client_secret: string // ditto^
}

export const useAuth = (code: string) => {
    const [isLoading, setIsLoading] = useState(true);
    const [accessToken, setAccessToken] = useState('');
    const [refreshToken, setRefreshToken] = useState('');
    const [expiresIn, setExpiresIn] = useState<number>();
    const [error, setError] = useState();

    useEffect(() => {
        const spotifyTokenUrl = 'https://accounts.spotify.com/api/token';
        const body2 = {
            grant_type: 'authorization_code',
            code,
            redirect_uri: 'http://localhost:3000',
            client_id: process.env.REACT_APP_CLIENT_ID,
            client_secret: process.env.REACT_APP_CLIENT_SECRET,
        };
        const body = new URLSearchParams();
        body.append('grant_type', 'authorization_code');
        body.append('code', code);
        body.append('redirect_uri', 'http://localhost:3000');
        body.append('client_id', process.env.REACT_APP_CLIENT_ID!);
        body.append('client_secret', process.env.REACT_APP_CLIENT_SECRET!);

        const headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
            Accept: 'application/json',
        }
        console.log(body);
        console.log({ headers });
        axios
            .post<SpotifyTokenAuthRequest, AxiosResponse<SpotifyTokenAuthResponse>>(spotifyTokenUrl, body, { headers })
            .then(res => {
                const { access_token, refresh_token, expires_in } = res.data;

                setAccessToken(access_token);
                setRefreshToken(refresh_token);
                setExpiresIn(expires_in);
                setIsLoading(false);

                console.log(res);

                // clean up url and remove code from it
                window.history.pushState({}, '', '/'); 
            })
            .catch(err => {
                setError(err);
                console.log(err);
                // window.location.href = '/';
            });
    }, [code]);

    return [accessToken, isLoading, error];
}