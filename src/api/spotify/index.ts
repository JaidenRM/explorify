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


}