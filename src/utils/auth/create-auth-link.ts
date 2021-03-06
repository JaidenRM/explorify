export const createSpotifyAuthLink = (
  baseUrl = "https://accounts.spotify.com/authorize",
  clientId = process.env.REACT_APP_CLIENT_ID,
  responseType = "code",
  redirectUri = process.env.REACT_APP_AUTH_ROOT_URL,
  scopes = [
    "streaming",
    "user-read-email",
    "user-read-private",
    "user-library-read",
    "playlist-read-private",
    "user-library-modify",
    "user-read-playback-state",
    "user-modify-playback-state",
  ]
) => {
  const scopeJoined = scopes.join("%20");
  const authLink =
    baseUrl +
    `?client_id=${clientId}` +
    `&response_type=${responseType}` +
    `&redirect_uri=${redirectUri}` +
    `&scope=${scopeJoined}`;

  return authLink;
};
