import fs from 'fs';

export interface writeJsonToFileInput {
    json: any;
    filePath: string;
}

export function writeJsonToFile(input: writeJsonToFileInput) {
    try {
        const objString = JSON.stringify(input.json);
        fs.writeFileSync(input.filePath, objString);
    } catch (e) {
        console.log(`Error caught while writing to ${input.filePath}.`);
    }
}

