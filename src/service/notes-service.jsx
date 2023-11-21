import axios from 'axios';
import { Component } from 'react';

class UserService extends Component {

    baseUrlNotes = 'http://localhost:8080/notes';

    baseUrlImage = 'http://localhost:8080/image';

    baseUrlLabel = 'http://localhost:8080/label';

    createNotesData(data, token, image) {
        return axios.all([
            axios.post(`${this.baseUrlNotes}/create/${token}`, data)
                .then((Response) => {
                    let notesId = Response.data.data.notesId;
                    console.log(notesId);
                    if (image !== null) {
                        axios.post(`${this.baseUrlImage}/${notesId}`, image,
                            {
                                headers: {
                                    'content-type': 'multipart/form-data'
                                }
                            })
                    }
                })
        ])
    }

    uploadImage(image) {
        return axios.post(`http://localhost:8080/image`, image,
            {
                headers: {
                    'content-type': 'multipart/form-data'
                }
            }
        )
    }

    getNotesData(notesId) {
        return axios.post(`${this.baseUrlImage}/getimage/${notesId}`)
    }

    getAllImage() {
        return axios.get(`${this.baseUrlImage}/getallimage`)
    }

    getImageByNotesId(notesId) {
        return axios.get(`${this.baseUrlImage}/getimagebynotesid/${notesId}`,)
    }

    getAllNotesByUserId(token) {
        return axios.get(`${this.baseUrlNotes}/getallnotesbyuserid/${token}`);
    }

    getArchiveNotes() {
        return axios.get(`${this.baseUrlNotes}/getarchivenotes`);
    }

    getAllArchiveNotesByUserId(token) {
        return axios.get(`${this.baseUrlNotes}/getallarchivenotesbyuserid/${token}`);
    }

    getTrashNotes() {
        return axios.get(`${this.baseUrlNotes}/gettrashnotes`);
    }

    getAllTrashNotesByUserId(token) {
        return axios.get(`${this.baseUrlNotes}/getalltrashnotesbyuserid/${token}`);
    }

    getAllReminderNotesByUserId(token) {
        return axios.get(`${this.baseUrlNotes}/getalltrashnotesbyuserid/${token}`);
    }

    getAllLabelNotesByUserId(token) {
        return axios.get(`${this.baseUrlNotes}/getalltrashnotesbyuserid/${token}`);
    }

    setNotesToArchive(notesId) {
        return axios.put(`${this.baseUrlNotes}/setarchive/${notesId}`);
    }

    setNotesToUnArchive(notesId) {
        return axios.put(`${this.baseUrlNotes}/setunarchive/${notesId}`);
    }

    setNotesToTrash(notesId) {
        return axios.put(`${this.baseUrlNotes}/settrash/${notesId}`);
    }

    setNotesToUnTrash(notesId) {
        return axios.put(`${this.baseUrlNotes}/setuntrash/${notesId}`);
    }

    deleteNotesById(notesId) {
        return axios.delete(`${this.baseUrlNotes}/deletebyid/${notesId}`);
    }

    getAllLabelsByUserId(token) {
        return axios.get(`${this.baseUrlLabel}/getlabelsbyuser/${token}`,)
    }

    createLabel(labelName, token) {
        return axios.post(`${this.baseUrlLabel}/createlabel/${labelName}/${token}`,)
    }

    deleteLabelById(labelId) {
        return axios.delete(`${this.baseUrlLabel}/deletelabelbyid/${labelId}`)
    }

    editLabelById(labelId, labelName) {
        return axios.put(`${this.baseUrlLabel}/editlabelbyid/${labelId}/${labelName}`)
    }

    getAllLabelNotesByLabelId(labelId, token){
        return axios.get(`${this.baseUrlLabel}/getalllabelnotesbylabelid/${labelId}/${token}`)
    }

}
export default new UserService()