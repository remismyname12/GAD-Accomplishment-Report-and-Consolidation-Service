import { useState } from "react";
import axiosClient from "../axios";

export default async function postAxios({ endPoint, data }) {
    console.log('This is the data: ', data);
    try {
        const response = await axiosClient.post(endPoint, data);
        return { response };
    } catch (error) {
        if (error.response) {
            const { message, errors } = error.response.data;
            const finalErrors = [];
            // Push each error message to finalErrors array
            for (const key in errors) {
                if (errors.hasOwnProperty(key)) {
                    finalErrors.push(...errors[key]);
                }
            }
            // Construct the error object with HTML format
            return { error: { __html: `${message}` } };
        } else {
            return { error: { __html: "An unexpected error occurred." } };
        }
    }
}
