export default class FetchError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const errorResponseMessages = {
  400: "Error handling data.",
  401: "Bad or expired token. This can happen if the user revoked a token or the access token has expired. Try re-authenticating.",
  403: "Bad OAuth request (wrong consumer key, bad nonce, expired timestamp...). Unfortunately, re-authenticating the won't help here.",
  429: "The app has exceeded its rate limits. Please wait and try again.",
};
