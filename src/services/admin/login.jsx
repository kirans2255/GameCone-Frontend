import CategoryPage from "../../pages/adminpage/category";
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

export const editCategory = async (id,values) => {
    try {
        // const formData = new FormData();
        // formData.append('CategoryName', formData.name);
        // console.log("name :",values.name);
        // formData.append('CategoryImage', values.image);

        // console.log("form :",formData);
        

        const response = await instance.put(`/admin/editCategory/${id}`, {values}, {
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
        const response = await instance.post('/admin/toggle', {values}, {
        })

        console.log("values:",values)
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