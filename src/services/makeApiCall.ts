import axios from "axios";

export async function makeApiCall(url: string) {
    let response = await axios.get(url);
    return response.data;
}