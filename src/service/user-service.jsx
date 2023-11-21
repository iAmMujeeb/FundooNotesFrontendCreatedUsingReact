import axios from 'axios';

class UserService {

    baseUrl = 'http://localhost:8080/user';

    createUserData(data) {
        return axios.post(`${this.baseUrl}/create`, data);
    }

    verifyUserData(emailId, otp){
        return axios.put(`${this.baseUrl}/verify/${emailId}?otp=${otp}`, {
            params: {otp}
        });
    }

    signIn(data) {
        return axios.post(`${this.baseUrl}/login`, data);
    }
    
    // getUserById(id) {
    //     return axios.get(`${this.baseUrl}/getbyid/${id}`);
    // }

    // getAllUsers() {
    //     return axios.get(`${this.baseUrl}/getAll`);
    // }

    // updateUserById(id, data) {
    //     return axios.put(`${this.baseUrl}/updatebyid/${id}`, data);
    // }

    // deleteUserById(id) {
    //     return axios.delete(`${this.baseUrl}/deletebyid/${id}`)
    // }

}
export default new UserService()