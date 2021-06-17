interface SpotifyAuthProps {
    baseUrl?: string
    clientId?: string
    responseType?: string
    redirectUri?: string
    scopes?: string[]
}

export const createSpotifyAuthLink = ({
    baseUrl = 'https://accounts.spotify.com/authorize',
    clientId = process.env.REACT_APP_CLIENT_ID,
    responseType = 'code',
    redirectUri = 'http://localhost:3000',
    scopes = [
        'streaming', 'user-read-email', 'user-read-private', 'user-library-read',
        'user-library-modify', 'user-read-playback-state', 'user-modify-playback-state'
    ]
}: SpotifyAuthProps) => {
    const scopeJoined = scopes.join('%20');
    const authLink = baseUrl +
        `?client_id=${ clientId }` +
        `&response_type=${ responseType }` +
        `&redirect_uri=${ redirectUri }` +
        `&scope=${ scopeJoined }`;

    return authLink;
}