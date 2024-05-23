import axios from "axios";

export default async function AccessToken() {
    const options = {
        url: 'https://accounts.zoho.in/oauth/v2/token',
        method: 'post',
        params: {
            refresh_token: process.env.ZOHO_REFRESH_TOKEN,
            grant_type: process.env.ZOHO_GRANT_TYPE,
            client_id: process.env.ZOHO_CLIENT_ID,
            client_secret: process.env.ZOHO_CLIENT_SECRET,
        },
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
    };
    const responseRefreshToken = await axios(options);
    return responseRefreshToken.data.access_token
}