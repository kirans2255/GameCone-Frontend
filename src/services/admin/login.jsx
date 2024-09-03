import instance from "../../utils/axios";

export const Login = async(values) => {
    console.log('data us :',values);
    
    try{
        const response = await instance.post('/admin/login', values,{
            withCredentials:true
        })
        console.log("ending :",response);
        return response.data;
        
    }catch (error) {
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

