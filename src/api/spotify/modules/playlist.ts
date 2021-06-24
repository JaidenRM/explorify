import axios, { AxiosResponse } from "axios";

export class SpotifyPlaylistApi {
    private _endpoint = 'https://api.spotify.com/v1/me/playlists';
    private _accessToken: string;

    constructor(accessToken: string) {
        this._accessToken = accessToken;
    }

    set accessToken(token: string) {
        this._accessToken = token;
    }

    private getAuthHeader() {
        return {
            'Authorization': 'Bearer ' + this._accessToken,
        };
    }

    getUserPlaylists(limit = 20, offset = 0) {
        return axios.get<any, AxiosResponse<SpotifyApi.ListOfCurrentUsersPlaylistsResponse>>(
            `${this._endpoint}?limit=${limit}&offset=${offset}`, { headers: this.getAuthHeader() }
        );
    }
}