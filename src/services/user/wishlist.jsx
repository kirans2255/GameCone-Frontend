import instance from "../../utils/axios";


export const wishlist = async () => {
    try {
        const response = await instance.get('/wishlist',
            { withCredentials: true },
        );
        return response.data;
    } catch (error) {
        console.error('Error fetching product details:', error);
    }
}


export const addwishlist= async (productDetails) => {
    try {
        const response = await instance.post('/addwishlist', productDetails,
            { withCredentials: true }
        );
        console.log('Product added to wishlist:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error adding product to wishlist:', error.response.data.message);
    }
}

export const deleteWishlist = async (productId) => {
    try{
        const response = await instance.delete('/deletewishlist', {
            data: { productId }, 
            withCredentials: true
        });
        return response.data
    } catch (error) {
        const errorMessage = error?.response?.data?.message || 'Failed to remove product from wishlist';
        console.error('Error removing product from wishlist:', errorMessage);
        throw new Error(errorMessage);
    }
} 