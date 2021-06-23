import axios, { AxiosResponse } from "axios";
import { SpotifyPlaylistApi } from "./modules/playlist";
import { SpotifySearchApi } from "./modules/search";

export class SpotifyApi {

    private _accessToken: string;
    public searchApi: SpotifySearchApi;
    public playlistApi: SpotifyPlaylistApi;

    constructor(accessToken: string) {
        this._accessToken = accessToken;
        this.searchApi = new SpotifySearchApi(accessToken);
        this.playlistApi = new SpotifyPlaylistApi(accessToken);
    }

    set accessToken(token: string) {
        this._accessToken = token;
        this.searchApi.accessToken = token;
        this.playlistApi.accessToken = token;
    }

    private getAuthHeader() {
        return {
            'Authorization': 'Bearer ' + this._accessToken,
        };
    }

    fetch<T>(url: string): Promise<AxiosResponse<T>> {
        return axios.get<any, AxiosResponse<T>>(url, { headers: this.getAuthHeader() });
    }

    fetchAll<T>(urls: string[]): Promise<AxiosResponse<T>[]> {
        return Promise.all(urls.map(url => this.fetch<T>(url)));
    }
}