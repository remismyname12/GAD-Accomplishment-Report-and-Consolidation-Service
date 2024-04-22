import { useState } from "react";
import axiosClient from "../axios";
import Feedback from "../../components/feedbacks/Feedback";

export default async function postAxios({ endPoint, data }) {
    const [message, setAxiosMessage] = useState('');
    const [status, setAxiosStatus] = useState('');

    setAxiosMessage('Loading...');
    setAxiosStatus('Loading');

    try {
        const response = await axiosClient.post(endPoint, data);
        setAxiosMessage(response.data.message); // Set success message
        setAxiosStatus(response.data.status);
        console.log(response);
    } catch (error) {
        setAxiosMessage(error.data.message); // Set success message
        setAxiosStatus(error.data.status);
        console.log(error);
    }

    return(
        <Feedback isOpen={message !== ''} onClose={() => setAxiosMessage('')} successMessage={message} status={status} refresh={false}/>
    );
}
