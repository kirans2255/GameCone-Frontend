import instance from "../../utils/axios";

 const user = async () => {
    try {
        const response = await instance.get('/user', 
            { withCredentials: true },
        );
        return response.data;
    } catch (error) {
        console.error('Error fetching User Details:', error);
    }
}

export default user;