import React, { useEffect, useState } from "react";
// import "../css/Product.css";
import "../css/Product.scss";

//icons
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import DeleteIcon from '@mui/icons-material/Delete';

import { useSelector } from "react-redux";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import { API_URL } from "./global/GlobalConsts"

function Product(props) {

    // const navigate = useNavigate();

    const isLogged = useSelector(state => state.login.isLogged);
    
    const [logged , setLogged] = useState(false);
    const jwt = useSelector(state => state.jwt.jwt);
    const userInfo = useSelector(state => state.userInfo.userInfo);
    const location = useLocation();
    const [productImage, setProductImage] = useState(null);
    const [role, setRole] = useState('');
    const currentLocation = location.pathname.split("/")[1];
    
    const description = props.description;

    const shortDescription = description.length > 100 ? description.substring(0, 100) + "..." : description;

    const defaultImage = "../../imagePlaceholder.jpg";

    // TODO: check for infinite loops later
    useEffect(() => {

        const fetchProductImage = async () => {
            try{
                
                if(props.imageIds.length > 0){
                    const response = await axios.get(API_URL+`/image/${props.id}/get_product_image`);
                    if(response.data){
                        setProductImage(response.data.image);
                    }
                }
            } catch (error) {
                error.mesaage = "No image found";
            }
        }
        fetchProductImage();

        if(userInfo){
            setRole(userInfo.role);
        }
        
        if(isLogged){
            setLogged(true);
        }

    }, [props.id, props.imageIds, isLogged, userInfo]);

    async function addToCart(){
        if(logged){
            try{
                await axios.patch(
                    API_URL+`/cart/add-product-to-cart/${props.id}`,
                    {},//request body
                    {
                      headers: {
                        Authorization: jwt,
                      },
                    }
                );
                
            }catch(error){
                console.log(error);
            }
        }else{
            console.log("not logged in");
        }
    }

    const handleDelete = async () => {
        try{
            await axios.delete(
                `http://localhost:8080/product/delete_product/${props.id}`,
                {
                    headers: {
                        Authorization: jwt,
                    },
                }
            );
            props.onDelete(props.id);
        }catch(error){
            console.log(error);
        }
        
    }

    return (
            <div className="product">
                {
                    currentLocation === "admin-store" && role === "STORE" ?
                    (
                        <Link to={`/admin-product-details/${props.id}`}>
                            <div className="productImg">
                                <img
                                    className="product-img"
                                    src={productImage ? `data:image/jpeg;base64,${productImage}` : defaultImage}
                                    alt="product"
                                />                       
                            </div>
                        </Link>
                    )
                    :
                    (
                        <Link to={`/product-details/${props.id}`}>
                            <div className="productImg">
                                <img
                                    className="product-img"
                                    src={productImage ? `data:image/jpeg;base64,${productImage}` : defaultImage}
                                    alt="product"
                                />                       
                            </div>
                        </Link>
                    )
                }

                <div className="product-info">
                    <p className="productName">{props.name}</p>
                <p className="productDescription">{shortDescription}</p>
                    <p className="productPrice">${props.price}</p>   
                    {currentLocation === "admin-store" && role === "STORE" ? 
                        (
            
                            <DeleteIcon onClick={handleDelete} className="deleteProductButton"/>

                        )
                        : 
                        (
                            <AddShoppingCartIcon onClick={addToCart} className="addToCartButton" />
                        )
                    }
                </div>
            </div>
       
    );
}

export default Product;