export enum HttpMethods {
    Get = 'GET',
    Post = 'POST',
    Put = 'PUT'
}

const acnhApiBaseUrl: string = 'http://acnhapi.com';
export enum AcnhVersion {
    V1 = 'v1',
    V1A = 'v1a'
}
export enum AcnhCategory {
    Fish = 'fish'
}
export function buildAcnhApiUrl(version: AcnhVersion, endpoint: AcnhCategory, id?: number) {
    return `${acnhApiBaseUrl}/${version}/${endpoint}/${id}`;
}

const nookipediaBaseUrl: string = 'https://api.nookipedia.com';

export enum NookGames {
    NewHorizons = 'nh'
}
export enum NookCategory {
    Clothing = 'clothing'
}

export function buildNookipediaUrl(game: NookGames, category: NookCategory, id?: number | string): string {
    return `${nookipediaBaseUrl}/${game}/${category}/${id}`
}