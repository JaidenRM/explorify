import axios, { AxiosResponse } from "axios";

export class SpotifyTracksApi {
    private _endpoint = 'https://api.spotify.com/v1/tracks';
    private _accessToken: string;

    private readonly MAX_TRACKS = 50;

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

    getTracks(trackUris: string[], amount = 20) {
        if (!trackUris) return;

        var trackIds = trackUris
            .map(uri => uri.split(":").pop())
            .filter(id => id);
        if (!trackIds) return;

        var limit = Math.min(amount, this.MAX_TRACKS)
        if (trackIds.length > limit)
            trackIds = trackIds.slice(0, limit);

        return axios.get<any, AxiosResponse<SpotifyApi.MultipleTracksResponse>>(
            `${this._endpoint}?ids=${trackIds.join(",")}`, { headers: this.getAuthHeader() }
        );
    }
}