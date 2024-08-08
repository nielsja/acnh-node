import { createObjectCsvWriter } from 'csv-writer';
import clothingJson from '../data/json/clothing.json';
import recipesJson from '../data/json/recipes.json';
import furnitureMiscJson from '../data/json/furniture-miscellaneous.json';
import furnitureWallJson from '../data/json/furniture-wallmounted.json';
import furnitureHouseJson from '../data/json/furniture-housewares.json';
import interiorJson from '../data/json/interior.json';
import toolsJson from '../data/json/tools.json';
import photosJson from '../data/json/photos.json';
import miscellaneousJson from '../data/json/miscellaneous.json';
import villagersJson from '../data/json/villagers.json';

export interface IMapJsonCsv {
    filePath: string;
    headers: Array<{
        id: string;
        title: string;
    }>;
    jsonArr: any[]
};

export function writeJsonToCsvFile(input: IMapJsonCsv) {
    // const { filePath, headers, jsonArr } = mapClothing();
    const { filePath, headers, jsonArr } = input;

    try {
        const csvWriter = createObjectCsvWriter({
            path: filePath,
            header: headers
        });

        const records = jsonArr;

        csvWriter.writeRecords(records)       // returns a promise
            .then(() => {
                console.log('...Done');
            });
    } catch (e) {
        // console.log(`Error caught while writing to ${input.filePath}.`);
    }
};

export function mapClothing(): IMapJsonCsv {
    const jsonObj = clothingJson;
    let jsonArr: any[] = [];
    const filePath: string = './src/data/csv/clothing.csv';

    const headers = [
        { id: 'id', title: 'id' },
        { id: 'name', title: 'name' },
        { id: 'category', title: 'category' },
        { id: 'variation', title: 'variation' },
        { id: 'availability', title: 'availability' },
    ];

    jsonObj.forEach((item, index) => {
        const numberOfVariations = item.variations.length;
        for (let i = 0; i < numberOfVariations; i++) {
            let availableFrom = '';
            item.availability.forEach((avail) => {
                availableFrom += `${avail.from} `
            })

            jsonArr.push({
                id: `clothing_${index + 1}-${i + 1}`,
                name: item.name,
                category: item.category,
                variation: item.variations[i].variation,
                availability: availableFrom
            });
        };
    });

    return { filePath, headers, jsonArr };
}

export function mapRecipes(): IMapJsonCsv {
    const jsonObj = recipesJson;
    let jsonArr: any[] = [];
    const filePath: string = './src/data/csv/recipes.csv';

    const headers = [
        { id: 'id', title: 'id' },
        { id: 'name', title: 'name' },
        { id: 'unlockCount', title: 'unlockCount' },
        { id: 'availability', title: 'availability' },
    ];

    jsonObj.forEach((item, index) => {
        let availableFrom = '';
        item.availability.forEach((avail) => {
            availableFrom += `${avail.from} `
        })

        jsonArr.push({
            id: `recipes_${index + 1}`,
            name: item.name,
            unlockCount: item.recipes_to_unlock,
            availability: availableFrom
        });
    });

    return { filePath, headers, jsonArr };
};

interface IFurniture {
    url: string;
    name: string;
    category: string;
    "item_series": string;
    "item_set": string;
    "hha_category": string;
    tag: string;
    "hha_base": number;
    lucky: boolean;
    "lucky_season": string;
    sell: number;
    "variation_total": number;
    "pattern_total": number;
    customizable: boolean;
    "custom_kits": number;
    "custom_kit_type": string;
    "custom_body_part": string;
    "custom_pattern_part": string;
    height: string;
    door_decor: boolean;
    "version_added": string;
    unlocked: boolean;
    notes: string;
    "grid_width": number;
    "grid_length": number;
    themes: string[];
    functions: any[];
    availability: Array<{
        from: string;
        note: string;
    }>;
    buy: Array<{
        price: number;
        currency: string;
    }>
    variations: Array<{
        variation: string;
        pattern: string;
        "image_url": string;
        colors: string[]
    }>
}
export function mapFurniture(): IMapJsonCsv {
    const miscObj: IFurniture[] = furnitureMiscJson;
    const wallObj: IFurniture[] = furnitureWallJson;
    const houseObj: IFurniture[] = furnitureHouseJson;
    let jsonArr: any[] = [];
    const filePath: string = './src/data/csv/furniture.csv';

    const headers = [
        { id: 'id', title: 'id' },
        { id: 'name', title: 'name' },
        { id: 'category', title: 'category' },
        { id: 'variation', title: 'variation' },
        // { id: 'pattern', title: 'pattern' },
        // { id: 'series', title: 'series' },
        { id: 'availability', title: 'availability' },
    ];

    [miscObj, wallObj, houseObj].forEach((list) => {
        list.forEach((item, index) => {
            let i = 0;
            let previousVariant = 'null';
            item.variations.forEach((variant) => {
                if (variant.variation !== previousVariant) {
                    let availableFrom = '';
                    item.availability.forEach((avail) => {
                        availableFrom += `${avail.from} `
                    })

                    // const variationDesc = item.variations[i].variation === '' ? '(none)' : item.variations[i].variation;
                    // const patternDesc = item.variations[i].pattern ===const variationDesc = item.variations[i].variation '' ? '(none)' : item.variations[i].pattern;
                    const variationDesc = item.variations[i].variation;
                    // const patternDesc = item.variations[i].pattern;

                    jsonArr.push({
                        id: `furniture_${index + 1}-${i + 1}`,
                        name: item.name,
                        category: item.category,
                        variation: variationDesc,
                        // pattern: patternDesc,
                        // series: item.item_series,
                        availability: availableFrom,
                    });
                }
                i++;
                previousVariant = variant.variation;
            })
            // const numberOfVariations = item.variations.length;
            // for (let i = 0; i < numberOfVariations; i++) {
            //     let availableFrom = '';
            //     item.availability.forEach((avail) => {
            //         availableFrom += `${avail.from} `
            //     })

            // const variationDesc = item.variations[i].variation === '' ? '(none)' : item.variations[i].variation;
            // const patternDesc = item.variations[i].pattern ===const variationDesc = item.variations[i].variation '' ? '(none)' : item.variations[i].pattern;
            // const variationDesc = item.variations[i].variation;
            // const patternDesc = item.variations[i].pattern;

            // jsonArr.push({
            //     id: `furniture_${index + 1}-${i + 1}`,
            //     name: item.name,
            //     category: item.category,
            //     variation: variationDesc,
            // pattern: patternDesc,
            //         series: item.item_series,
            //         availability: availableFrom,
            //     });
            // };
        });
    })

    return { filePath, headers, jsonArr };
}

export function mapInterior(): IMapJsonCsv {
    const jsonObj = interiorJson;
    let jsonArr: any[] = [];
    const filePath: string = './src/data/csv/interior.csv';

    const headers = [
        { id: 'id', title: 'id' },
        { id: 'name', title: 'name' },
        { id: 'category', title: 'category' },
        { id: 'availability', title: 'availability' },
    ];

    jsonObj.forEach((item, index) => {
        let availableFrom = '';
        item.availability.forEach((avail) => {
            availableFrom += `${avail.from} `
        })

        jsonArr.push({
            id: `interior_${index + 1}`,
            name: item.name,
            category: item.category,
            availability: availableFrom
        });
    });

    return { filePath, headers, jsonArr };
};

export function mapTools(): IMapJsonCsv {
    const jsonObj = toolsJson;
    let jsonArr: any[] = [];
    const filePath: string = './src/data/csv/tools.csv';

    const headers = [
        { id: 'id', title: 'id' },
        { id: 'name', title: 'name' },
        { id: 'uses', title: 'uses' },
        { id: 'availability', title: 'availability' },
    ];

    jsonObj.forEach((item, index) => {
        let availableFrom = '';
        item.availability.forEach((avail) => {
            availableFrom += `${avail.from} `
        })

        jsonArr.push({
            id: `tools_${index + 1}`,
            name: item.name,
            uses: item.uses,
            availability: availableFrom
        });
    });

    return { filePath, headers, jsonArr };
};

export function mapPhotos(): IMapJsonCsv {
    const jsonObj = photosJson;
    let jsonArr: any[] = [];
    const filePath: string = './src/data/csv/photos.csv';

    const headers = [
        { id: 'id', title: 'id' },
        { id: 'name', title: 'name' },
        { id: 'category', title: 'category' },
        { id: 'availability', title: 'availability' },
    ];

    jsonObj.forEach((item, index) => {
        let availableFrom = '';
        item.availability.forEach((avail) => {
            availableFrom += `${avail.from} `
        })

        jsonArr.push({
            id: `photos_${index + 1}`,
            name: item.name,
            category: item.category,
            availability: availableFrom
        });
    });

    return { filePath, headers, jsonArr };
};

export function mapMiscellaneousItems(): IMapJsonCsv {
    const jsonObj = miscellaneousJson;
    let jsonArr: any[] = [];
    const filePath: string = './src/data/csv/miscellaneousItems.csv';

    const headers = [
        { id: 'id', title: 'id' },
        { id: 'name', title: 'name' },
        { id: 'stack', title: 'stack' },
        { id: 'availability', title: 'availability' },
    ];

    jsonObj.forEach((item, index) => {
        let availableFrom = '';
        item.availability.forEach((avail) => {
            availableFrom += `${avail.from} `
        })

        jsonArr.push({
            id: `miscItem_${index + 1}`,
            name: item.name,
            stack: item.stack,
            availability: availableFrom
        });
    });

    return { filePath, headers, jsonArr };
};

export function mapVillagers(): IMapJsonCsv {
    const jsonObj = villagersJson;
    let jsonArr: any[] = [];
    const filePath: string = './src/data/csv/villagers.csv';

    const headers = [
        { id: 'id', title: 'id' },
        { id: 'name', title: 'name' },
        { id: 'species', title: 'species' },
        { id: 'gender', title: 'gender' },
        { id: 'personality', title: 'personality' },
        { id: 'sign', title: 'sign' },
        { id: 'birthdayMonth', title: 'birthdayMonth' },
        { id: 'birthdayDay', title: 'birthdayDay' },
    ];

    jsonObj.forEach((item, index) => {
        if (item.appearances.includes('NH')) {
            jsonArr.push({
                id: `villagers_${index + 1}`,
                name: item.name,
                species: item.species,
                gender: item.gender,
                personality: item.personality,
                sign: item.sign,
                birthdayMonth: item.birthday_month,
                birthdayDay: item.birthday_day,
            });

        }
    });

    return { filePath, headers, jsonArr };
};

// 