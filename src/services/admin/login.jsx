import instance from "../../utils/axios";

export const Login = async (values) => {
    console.log('data us :', values);

    try {
        const response = await instance.post('/admin/login', values, {
            withCredentials: true
        })
        console.log("ending :", response);
        return response.data;

    } catch (error) {
        if (error.response && error.response.data) {
            throw new Error(error.response.data.error);
        } else {
            throw new Error('Network Error');
        }
    }
}


export const addCategory = async (values) => {
    try {
        const formData = new FormData();
        formData.append('CategoryName', values.name);
        formData.append('CategoryImage', values.image);

        const response = await instance.post('/admin/addCategory', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        return response.data;
    } catch (error) {
        throw new Error('Error adding category: ' + error.message);
    }
}

export const getCategories = async () => {
    try {
        const response = await instance.get('/admin/category');
        return response.data;
    } catch (error) {
        throw new Error('Error fetching categories: ' + error.message);
    }
};


export const deleteCategory = async (id) => {
    try {
        const response = await instance.delete(`/admin/deleteCategory/${id}`);
        return response.data;
    } catch (error) {
        throw new Error('Error deleting category: ' + error.message);
    }
};

export const editCategory = async (id, name, image) => {
    const formData = new FormData();
    formData.append('CategoryName', name); 
    formData.append('CategoryImage', image);

    try {
        const response = await instance.put(`/admin/editCategory/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        throw new Error('Error editing category: ' + error.message);
    }
}



export const getUser = async () => {
    try {
        const response = await instance.get('/admin/user');
        return response.data;
    } catch (error) {
        throw new Error('Error fetching categories: ' + error.message);
    }
};


export const toggle = async (values) => {
    try {
        const response = await instance.post('/admin/toggle', { values }, {
        })

        console.log("values:", values)
        console.log("ending :", response);
        return response.data;

    } catch (error) {
        if (error.response && error.response.data) {
            throw new Error(error.response.data.error);
        } else {
            throw new Error('Network Error');
        }
    }
}

export const addProduct = async (values) => {
    try {
        const formData = new FormData();
        formData.append('name', values.name);
        formData.append('price', values.price);
        formData.append('edition',values.edition)
        formData.append('category',values.category)
        formData.append('images',values.image)

        const response = await instance.post('/admin/addProduct', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        throw new Error('Error adding product: ' + error.message);
    }
}

export const getProduct = async () => {
    try {
        const response = await instance.get('/admin/product');
        return response.data;
    } catch (error) {
        throw new Error('Error fetching product: ' + error.message);
    }
};


export const deleteProduct = async (id) => {
    try {
        const response = await instance.delete(`/admin/deleteProduct/${id}`);
        return response.data;
    } catch (error) {
        throw new Error('Error deleting category: ' + error.message);
    }
};


export const editProduct = async (id, name,price,edition,category, image) => {
    const formData = new FormData();
    formData.append('name', name); 
    formData.append('price', price); 
    formData.append('edition', edition); 
    formData.append('category',category)
    formData.append('images', image);

    try {
        const response = await instance.put(`/admin/editProduct/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        throw new Error('Error editing product: ' + error.message);
    }
}