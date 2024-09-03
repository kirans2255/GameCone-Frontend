import instance from "../../utils/axios";

const Signup = async(values) => {
    console.log('data us :',values);
    
    try{
        const response = await instance.post('/signup', values,{
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

export default Signup;