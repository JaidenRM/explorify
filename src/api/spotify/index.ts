import axios, { AxiosResponse } from "axios";
import { SpotifyPlaylistApi } from "./modules/playlist";
import { SpotifySearchApi } from "./modules/search";
import { SpotifyTracksApi } from "./modules/tracks";

export class SpotifyApi {

    private _accessToken: string;
    public searchApi: SpotifySearchApi;
    public playlistApi: SpotifyPlaylistApi;
    public tracksApi: SpotifyTracksApi;

    constructor(accessToken: string) {
        this._accessToken = accessToken;
        this.searchApi = new SpotifySearchApi(accessToken);
        this.playlistApi = new SpotifyPlaylistApi(accessToken);
        this.tracksApi = new SpotifyTracksApi(accessToken);
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

    async fetchPages<T>(page: SpotifyApi.PagingObject<T>): Promise<T[]> {
        const items = page.items;

        let currentPage = page;

        while(currentPage.next != null) {
            currentPage = (await this.fetch<SpotifyApi.PagingObject<T>>(currentPage.next)).data;
            items.push(...currentPage.items);
        }

        return items;
    }

    fetchAllPages<T>(pages: SpotifyApi.PagingObject<T>[]) {
        return Promise.all(pages.map(page => this.fetchPages(page)));
    }
}