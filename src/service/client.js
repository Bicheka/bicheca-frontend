import axios from 'axios';

const API_URL = "http://localhost:8080";

export const fetchUser = async (token) => {

    try {
        const user = await axios.get(API_URL + '/user', {
            headers: {
              Authorization: token
            }
        });

        return user.data;

    } catch (error) {
        throw new Error('Failed to fetch user information.');
    }

}

export const getUserStores = async (token) => {
    try {
        const response = await axios.get(API_URL + '/store/get_user_stores', 
                    {
                        headers: {
                            Authorization: token,
                        }
                    });
        console.log("response", response);
        return response.data;
      } catch (error) {
        console.log("error", error);
    }
}