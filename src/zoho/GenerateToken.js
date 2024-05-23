import axios from "axios";

export default async function AccessToken() {
    const options = {
        url: 'https://accounts.zoho.in/oauth/v2/token',
        method: 'post',
        params: {
            refresh_token: '',
            grant_type: '',
            client_id: '',
            client_secret: '',
        },
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
    };
    const responseRefreshToken = await axios(options);
    return responseRefreshToken.data.access_token
}