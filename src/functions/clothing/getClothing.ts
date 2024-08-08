import { buildNookipediaUrl, NookCategory, NookGames } from "../../utils/buildApiUrl";
import { makeNookipediaCall } from "../../utils/makeApiCall";
import { writeJsonToFile } from "../../utils/writeJsonToFile";
import { IChecklistItem } from "../common/IChecklistItem";
import { IClothing, INookipediaClothing } from "./IClothing";
import nookipediaJsonClothing from './nookipediaClothing.json';

const nookipediaJsonClothingFilePath = 'src/data/clothing/nookipediaClothing.json';
const modelJsonClothingFilePath = 'src/data/clothing/modelClothing.json';

export async function clothingController(options?: any) {

    const clothingHtml = createClothingView();
    return clothingHtml;

}

async function getClothing(name?: string) {
    // read nookipedia clothing from local json file
    const nookClothing = nookipediaJsonClothing;

    // make api call to get clothing from nookipedia
    const url = buildNookipediaUrl(NookGames.NewHorizons, NookCategory.Clothing, name);
    const nookipediaApiClothing = await makeNookipediaCall(url);
}



function mapNookipediaClothingToModelClothing(nookClothing: INookipediaClothing, variation: string): Omit<IClothing, 'id' | 'collected'> {
    const variationIndex = nookClothing.variations.findIndex((v) => v.variation === variation);
    return {
        name: nookClothing.name,
        category: nookClothing.category,
        variation: nookClothing.variations[variationIndex].variation,
        url: nookClothing.variations[variationIndex].image_url,
    }
}

export function createClothingView() {
    const nookClothing = nookipediaJsonClothing;
    let clothingViewHtml = '';
    nookClothing.forEach((c) => {
        clothingViewHtml += `<div><input type="checkbox">${c.name}</input><br /></div>`;
    })
    return clothingViewHtml;
}

export function initClothingChecklistFile() {
    // map all model clothing items to a checklist clothing item


}

function initChecklistClothingObjects(modelClothingArr: IClothing[]): IChecklistItem[] {
    return [];
}


/**
 * Function to initialize modelClothing.json file
 */
function initModelClothingFile() {
    // map all nookipedia clothing items and each variation to a unique model version
    const nookClothing = nookipediaJsonClothing;
    let modelClothing: IClothing[] = initModelClothingObjects(nookClothing);

    // save all model clothing items to csv
    writeJsonToFile({ json: modelClothing, filePath: modelJsonClothingFilePath })
}

/**
 * Helper function for initModelClothingFile
 * @param nookClothingArr 
 * @returns 
 */
function initModelClothingObjects(nookClothingArr: INookipediaClothing[]): IClothing[] {
    let modelClothingArr: IClothing[] = [];

    nookClothingArr.forEach((clothingItem, index) => {
        for (let variationIndex = 0; variationIndex < clothingItem.variation_total; variationIndex++) {
            const variationName = clothingItem.variations[variationIndex].variation;
            const mappedItem = mapNookipediaClothingToModelClothing(clothingItem, variationName);
            modelClothingArr.push({
                ...mappedItem,
                id: `clothing_${index + 1}-${variationIndex + 1}`,
                collected: false
            });
        }
    });

    return modelClothingArr;
}
