import { auth } from "express-oauth2-jwt-bearer";

const checkAuth0 = auth({
  audience: "https://booking_api",
  issuerBaseURL: "https://dev-lfhyxsik22iwtklo.us.auth0.com/",
  tokenSigningAlg: "RS256",
});



export default checkAuth0;