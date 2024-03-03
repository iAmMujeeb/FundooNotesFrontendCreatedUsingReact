import axios from 'axios';

class ReminderService {

    baseUrl = 'http://localhost:8080/reminder';

    createReminder(notesId, reminder) {
        return axios.post(`${this.baseUrl}/createreminder/${notesId}/${reminder}`);
    }

    deleteReminder(notesId, reminderId) {
        return axios.delete(`${this.baseUrl}/deletereminder/${notesId}/${reminderId}`);
    }

    getReminder(notesId) {
        return axios.get(`${this.baseUrl}/getreminder/${notesId}`);
    }
    
    getAllReminder() {
        return axios.get(`${this.baseUrl}/getallreminder`);
    }

} 

export default new ReminderService()
