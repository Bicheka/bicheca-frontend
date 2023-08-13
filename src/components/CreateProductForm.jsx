import axios from "axios";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation} from "react-router";
import { upload_product_image } from "../service/client";

function CreateProductForm() {

    const location = useLocation();
    
    const jwt = useSelector(state => state.jwt.jwt);
    // const navigate = useNavigate();

    const [token, setToken] = React.useState('');

    const storeId = location.pathname.split("/")[2];


    //default values for the form
    const [name, setName] = React.useState('');
    const [price, setPrice] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [category, setCategory] = React.useState('');
    const [selectedFile, setSelectedFile] = React.useState(null);
    

    useEffect(() => {
        setToken(jwt);
    }, [jwt]);

    const handleCreateProduct = async (e) => {
        e.preventDefault();

        console.log("THIS IS THE STORE ID: " + storeId);

        if(category === '' || category === null){
            alert("Please select a category");
            return;
        }

        if(name === '' || price === '' || description === '' || category === ''){
            alert("Please fill all the fields");
            return;
        }
        
        const product = {
            name: name,
            price: price,
            description: description,
            category: category,
            storeId: storeId,
        }

        console.log(product);

        const data = product;
        const headers = { Authorization: `Bearer ${token}` };

        try {
            const response = await axios.post("http://localhost:8080/product/create_product", data, { headers });
            uploadImage(response.data.id);
            console.log("Product id: "+response.data.id);
        } catch (error) {
            console.log(error);
        }

        //TODO: GET REDIRECTED WITHOUT GETTING LOGGED OUT
        window.location.href = `/admin-store/${storeId}`; //redirect to the admin-store page while updating the page where we are redirected
    }


    const uploadImage = async (productId) => {

        const formData = new FormData();
        formData.append("file", selectedFile);

        upload_product_image(productId, token, formData);
    }

    const handleImageChange = (e) => {
        setSelectedFile(e.target.files[0]);
    }

    return (
        <div>
            <h1>Create Product</h1>
            <form>
                <label>Product Name</label>
                <input type="text" value = {name} onChange={(e) => setName(e.target.value)} className="form-control" />

                <label>Product Price</label>
                <input type="number" value = {price} onChange={(e) => setPrice(e.target.value)} className="form-control" />

                <label>Product Description</label>
                <input type="text" value = {description} onChange={(e) => setDescription(e.target.value)} className="form-control" />

                <label>Category</label>
                <select required className="form-control" defaultValue={category} onChange={(e) => setCategory(e.target.value)}>
                    <option value="">-- Select a category --</option>
                    <option value="ELECTRONIC">ELECTRONIC</option>
                    <option value="SERVICE">SERVICE</option>
                    <option value="FORNITURE">FORNITURE</option>
                    <option value="CLOTHES">CLOTHES</option>
                    <option value="FOOD">FOOD</option>
                    <option value="KITCHEN">KITCHEN</option>
                    <option value="APLIANCES">APLIANCES</option>
                    <option value="OTHER">OTHER</option>
                </select>

                <label>Product Image</label>
                <input type="file" className="form-control" onChange={handleImageChange}/> 

                <button className="btn btn-primary" onClick={handleCreateProduct}>Create Product</button>

            </form>
        </div>
    );
}

export default CreateProductForm;