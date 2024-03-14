import storeItems from "../../data/items.json"

import {
    parseToAchievements,
    parseToBaseItem,
    parseToFullItem,
    parseToGenre,
    parseToGenreDetails,
    parseToScreenShot,
    parseToUser,
} from './itemsApiParses';

// TODO: move this to secure place
const API_KEY = 'bfd6caa51496423a9494859c4628abee';
const API_URL = 'https://api.rawg.io/api/';

const LIMIT = 30;

export function getItemsUrl(query: ItemQuery = {}) {
    return getUrl('items', {
        page_size: LIMIT,
        ...query,
    });
}

export async function searchItems(tags = '', genres = '', search = '') {
    return getItems({
        page_size: LIMIT,
        ordering: '-added',
        tags,
        genres,
        search,
    });
}

export async function getItems(query: ItemQuery = {}) {
    // const res = await fetchFromUrl(getItemsUrl(query));
    // return res.results ? res.results.map(parseToBaseItem) : [];
    return storeItems;
}

export async function getItemById(id: number) {
    const url = `${API_URL}items/${id}?key=${API_KEY}`;
    const res = await fetchFromUrl(url);
    return res ? parseToFullItem(res) : null;
}

export async function getItemScreemShots(id: number) {
    const url = `${API_URL}items/${id}/screenshots?key=${API_KEY}`;
    const res = await fetchFromUrl(url);
    return res ? res.results.map(parseToScreenShot) : [];
}

export async function getItemAchievements(id: number) {
    let url = `${API_URL}items/${id}/achievements?key=${API_KEY}`;
    let res = await fetchFromUrl(url);
    const allResults: any[] = [];
    let pageNumber = 1;
    while (res.next) {
        res.results.map((i: any) => {
            allResults.push(i);
        });
        pageNumber++;
        url = `${API_URL}items/${id}/achievements?key=${API_KEY}&page=${pageNumber}`;
        res = await fetchFromUrl(url);
    }
    return allResults.length !== 0 ? allResults.map(parseToAchievements) : [];
}

export async function GetItemFromDB(itemID: number, variable = 'item_id') {
    const url = `http://localhost:3000/items/${itemID}`;
    const res = await fetchFromUrl(url);
    return res.length !== 0 ? res : [];
}

export async function GetCommentFromDB(commentID: number, variable = ':id') {
    const url = `http://localhost:3000/comment/${commentID}`;
    const res = await fetchFromUrl(url);
    return res.length !== 0 ? res : [];
}

export const getUserFromDB = async (userID: string) => {
    const url = `http://localhost:3000/users/${userID}`;
    const res: any = await fetchFromUrl(url);

    return res.length !== 0 ? res[0] : undefined;
};

export async function getGenres(type: ExtraData = 'genres') {
    const res = await _fetch(
        type,
        type !== 'genres'
            ? { page_size: 80, ...(type === 'platforms' ? { ordering: '-items_count' } : {}) }
            : undefined,
    );

    return res?.results ? res.results.map(parseToGenre) : [];
}

export async function getGenreDetails(id: number | string, type: ExtraData = 'genres') {
    const res = await _fetch(`${type}/${id}`);
    return res ? parseToGenreDetails(res) : undefined;
}

type Ordering =
    | 'name'
    | 'released'
    | 'added'
    | 'created'
    | 'updated'
    | 'items_count';

interface ItemQuery {
    id?: number;
    page?: number;
    page_size?: number;
    search?: string;
    search_exact?: string;
    ordering?: Ordering | `-${Ordering}`;
    tags?: string;
    genres?: string;
    platforms?: string;
    dates?: Date[];
}

export interface ApiReturnType<T> {
    length: number;
    price: any;
    count: number;
    next: string;
    previous: string;
    results: T[];
}

export type ExtraData = 'genres' | 'tags' | 'platforms';

type Prefix = 'items' | ExtraData | string;

async function _fetch<T>(prefix: Prefix, query?: ItemQuery) {
    return await fetchFromUrl<T>(getUrl(prefix, query));
}

export function getUrl(prefix: Prefix, query?: ItemQuery) {
    return `${API_URL}${prefix}?key=${API_KEY}${_queryToString(query)}`;
}

export async function fetchFromUrl<T>(url: string): Promise<ApiReturnType<T>> {
    try {
        const response = await fetch(url, {
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) throw `not ok!! ${response.status}`;

        const json = await response.json();
        // console.log('🚀 ~ file: itemsProvider.ts:38 ~ json', json);
        return json;
    } catch (e) {
        console.log('🚀 ~ file: itemsProvider.ts:15 ~ _fetch ~ e', e);
        throw e;
    }
}

function _queryToString(query?: ItemQuery): string {
    if (!query) return '';

    return Object.entries(query).reduce((prev, [key, value]) => {
        if (!value) return prev;

        let paresdValue = value;

        if (Array.isArray(value)) {
            if (!value.length || !(value[0] instanceof Date)) return prev;
            paresdValue = value.map((date) => (date as Date).toISOString().split('T')[0]).join();
        }

        return `${prev}&${key}=${paresdValue}`;
    }, '');
}
