import instance from "../../utils/axios";


 const single = async(id)=>{
    try {
        const response = await instance.get(`/single/${id}`); 
        return response.data;
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
}

export default single;