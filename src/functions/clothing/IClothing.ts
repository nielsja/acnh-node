export interface INookipediaClothing {
    name: string;
    url: string;
    category: string;
    sell: number;
    variation_total: number;
    vill_equip: boolean;
    seasonality: string;
    version_added: string;
    unlocked: boolean;
    notes: string;
    label_themes: string[];
    styles: string[];
    availability: Array<{ from: string; note: string; }>;
    buy: Array<{ price: number; currency: string; }>;
    variations: Array<{
        variation: string;
        image_url: string;
        colors: string[];
    }>;
}

export interface IClothing {
    // custom attributes
    id: string;
    collected: boolean;
    // clothing attributes
    name: string;
    category: string;
    variation: string;
    url: string;
}

interface IBaseClothing {
    name: string;
    category: string;
    variation: string;
    url: string;
}