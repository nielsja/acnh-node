import axios from "axios";
import { NOOKIPEDIA_TOKEN } from '../index'

export async function makeNookipediaCall(url: string) {
    const requestHeaders = { 'X-API-KEY': NOOKIPEDIA_TOKEN };
    const options = { headers: requestHeaders };
    const response = await makeAxiosCall(url, options);
    return response;
}

async function makeAxiosCall(url: string, options?: any) {
    let response = await axios.get(url, options);
    return response.data;
}