import instance from "../../utils/axios";


export const cart = async () => {
    try {
        const response = await instance.get('/cart',
            { withCredentials: true },
        );
        return response.data;
    } catch (error) {
        console.error('Error fetching product details:', error);
    }
}


export const addcart = async (productDetails) => {
    try {
        const response = await instance.post('/addcart', productDetails,
            { withCredentials: true }
        );
        console.log('Product added to cart:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error adding product to cart:', error.response.data.message);
    }
}

export const deleteCart = async (productId) => {
    try{
        const response = await instance.delete('/deletecart', {
            data: { productId }, 
            withCredentials: true
        });
        return response.data
    } catch (error) {
        console.error('Error Deleting Product from Cart',error.data.message)
    }
} 