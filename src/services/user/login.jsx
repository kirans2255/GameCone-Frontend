import instance from "../../utils/axios";

export const Login = async (values) => {
    console.log('data us :', values);

    try {
        const response = await instance.post('/login', values, {
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

// export const Logins = async () => {
//     try {
//         const response = await instance.get('/login',
//             { withCredentials: true },
//         );
//         return response.data;
//     } catch (error) {
//         console.error('Error fetching product details:', error);
//     }
// }

export const Logout = async () => {
    try {
        const response = await instance.get('/logout',{
            withCredentials:true
        })
        return response.data;
    } catch (error) {
        if (error.response && error.response.data) {
            throw new Error(error.response.data.error); 
        } else {
            throw new Error('Network Error');
        }
    }
}