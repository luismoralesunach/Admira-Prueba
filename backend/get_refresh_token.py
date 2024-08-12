import requests

# Replace these values with your own
client_id = "508357605474-vhr0tal79e33c38vuss7rn8g281naln3.apps.googleusercontent.com"
client_secret = "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"
redirect_uri = "urn:ietf:wg:oauth:2.0:oob"
auth_code = "YOUR_AUTHORIZATION_CODE"

# Step 1: Exchange the authorization code for an access token and refresh token
token_url = "https://oauth2.googleapis.com/token"
token_data = {
    "code": auth_code,
    "client_id": client_id,
    "client_secret": client_secret,
    "redirect_uri": redirect_uri,
    "grant_type": "authorization_code",
}

token_response = requests.post(token_url, data=token_data)

# Check if the request was successful
if token_response.status_code == 200:
    tokens = token_response.json() 
    print("Access Token:", tokens.get("access_token"))
    print("Refresh Token:", tokens.get("refresh_token"))
else:
    print("Failed to get tokens:", token_response.status_code)
    print("Response:", token_response.text)
