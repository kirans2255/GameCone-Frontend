import instance from "../../utils/axios";


export const cart = async () => {

    try {
        const response = await instance.get('/cart');
        return response.data;
    } catch (error) {
        console.error('Error fetching product details:', error);
    }
}

export const addcart = async (productDetails) => {
    try {
        const response = await instance.post('/addcart', productDetails ,
            { withCredentials: true } 
        );
        console.log('Product added to cart:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error adding product to cart:', error.response.data.message);
    }
}

