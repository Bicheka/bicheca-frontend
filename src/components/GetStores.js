import { useSelector } from "react-redux"
import { useEffect, useState } from "react"
import axios from "axios";

function GetStores(){

    const jwt = useSelector(state => state.jwt.jwt);

    const [stores, setStores] = useState([]);

    const response = async() => await axios.get('http://localhost:8080/store/get_all_stores', {
        headers: {
            Authorization: jwt
        }
    });

    setStores(response.data);
    console.log(stores);

    useEffect(() => {
        
    }, []);
}

export default GetStores;