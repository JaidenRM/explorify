import axios, { AxiosResponse } from "axios";

export class SpotifySearchApi {
    private _endpoint = 'https://api.spotify.com/v1/search';
    private _accessToken: string;

    constructor(accessToken: string) {
        this._accessToken = accessToken;
    }

    set accessToken(token: string) {
        this._accessToken = token;
    }

    searchTracks(searchTerm: string) {
        const headers = {
            'Authorization': 'Bearer ' + this._accessToken,
        };

        return axios
            .get<any, AxiosResponse<SpotifyApi.TrackSearchResponse>>(`${this._endpoint}?q=${searchTerm}&type=track`, { headers })
    }
}