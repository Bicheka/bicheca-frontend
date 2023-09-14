import axios from 'axios';
import { API_URL } from "../components/global/GlobalConsts"

export const fetchUser = async (token) => {

    try {
        const user = await axios.get(API_URL + '/user', {
            headers: {
              Authorization: token
            }
        });

        console.log("user", user);

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

export const changeImageRequest = async (productId, imageId, token, formData) => {


    try {

        const imageResponse = await axios.patch(
            API_URL+`/image/${productId}/change_product_image/${imageId}`,
            formData,//request body
            {
                
                headers: {
                    'Content-Type': 'multipart/form-data', // for images 'multipart/form-data
                    Authorization: token,
                },

            }
        );
        console.log("imageResponse", imageResponse);
        return imageResponse.data;
    } catch (error) {
        
        console.log(error);

    }
}
export const removeImageRequest = async (productId, imageId, token) => {

    try {
        const imageResponse = await axios.delete(
            API_URL+`/image/${productId}/delete_product_image/${imageId}`,
            {
                headers: {
                    Authorization: token,
                },
            }
        );
        console.log("imageResponse", imageResponse);
        return imageResponse.data;
    } catch (error) {
        console.log(error);
    }
}

export const upload_product_image = async (productId, token, formData) => {

    try {

        const imageResponse = await axios.post(
            API_URL+`/image/${productId}/upload_product_image`,
            formData,//request body
            {
                
                headers: {
                    'Content-Type': 'multipart/form-data', // for images 'multipart/form-data
                    Authorization: token,
                },

            }
        );
        
        localStorage.setItem('productImage', imageResponse.data)
        console.log(imageResponse);
        return imageResponse;
    } catch (error) {
        
        console.log(error);

    }

}

export const createComment = async (productId, token, commentText, createdBy) => {
    
    try {

        const commentResponse = await axios.post(
            API_URL`/comment/create-comment`,
            {
                commentText,
                createdBy,
                productId
            },
            {
                
                headers: {
                    Authorization: token,
                },

            }
        );
        
        console.log(commentResponse);
        return commentResponse;
    } catch (error) {
        
        console.log(error);

    }
}