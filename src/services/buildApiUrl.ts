export enum HttpMethods {
    Get = 'GET',
    Post = 'POST',
    Put = 'PUT'
}

const acnhApiBaseUrl: string = 'http://acnhapi.com';
enum acnhApiVersions {
    V1 = 'v1',
    V1A = 'v1a'
}
enum acnhApiEndpoints {
    Fish = 'fish'
}
export function buildAcnhApiUrl(version: acnhApiVersions | string, endpoint: acnhApiEndpoints | string, id?: number) {
    return `${acnhApiBaseUrl}/${version}/${endpoint}/${id}`;
}

const nookipediaBaseUrl: string = 'https://api.nookipedia.com';

enum nookipediaGames {
    NewHorizons = 'nh'
}
enum nookipediaCategory {
    Clothing = 'clothing'
}

export function buildNookipediaUrl(game: nookipediaGames, category: nookipediaCategory, id?: number): string {
    return `${nookipediaBaseUrl}/${game}/${category}/${id}`
}