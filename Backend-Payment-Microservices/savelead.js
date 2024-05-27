require('dotenv').config();
const qs = require('qs');

const axios = require('axios');

const clientId = process.env.ZOHO_CLIENT_ID;
const clientSecret = process.env.ZOHO_CLIENT_SECRET;
const refreshToken = process.env.ZOHO_REFRESH_TOKEN;
let accessToken = '';

const saveLead = async (lead) => {
    try {
      const result = await createLead(lead);
      return result;
    } catch (error) {
      console.error('Error saving lead:', error.message);
      throw error;
    }
};

const getAccessToken = async () => {
    try {
      console.log("generating access token .........")
      const response = await axios.post('https://accounts.zoho.in/oauth/v2/token',
        qs.stringify({
          refresh_token: refreshToken,
          client_id: clientId,
          client_secret: clientSecret,
          grant_type: 'refresh_token'
        }),
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
      );
      accessToken = response.data.access_token;
    } catch (error) {
      console.error('Error fetching access token:', error.response ? error.response.data : error.message);
    }
  };
  
  const createLead = async (leadData) => {
    try {
      await getAccessToken();
      console.log(`Access token generated: ${accessToken}`);
      const response = await axios.post('https://www.zohoapis.in/crm/v2/Leads', {
        data: [leadData]
      }, {
        headers: {
          Authorization: `Zoho-oauthtoken ${accessToken}`
        }
      });
      console.log(response.data)
      return response.data;
    } catch (error) {
      console.error('Error creating lead:', error.response ? error.response.data : error.message);
    }
  };
  
module.exports = saveLead;