import axios from 'axios';

import {
    IGroupCategorySchema,
    getGroupCategorySchema,
    ISearchResult,
} from '@esri/arcgis-rest-portal';

import {
    defaultOptions
} from '..'

import { IItem } from '@esri/arcgis-rest-types';
import { AgolItem, formatItem } from '../format-item';

export type { AgolItem } from '../format-item';

export type ContentType =
    | 'maps'
    | 'layers'
    | 'apps'
    | 'tools'
    | 'files'
    | 'webmap'
    | '';

export type SortField = 'relevance' | 'title' | 'modified';

export type SortOrder = 'asc' | 'desc';

export type SearchResponse = Omit<
    ISearchResult<AgolItem>,
    'nextPage' | 'aggregations'
>;

type SearchQueryParams = {
    f: string;
    start: number;
    num: number;
    q?: string;
    sortField?: SortField;
    sortOrder?: SortOrder;
    categories?: string;
    token?: string;
};

type SearchOptions = {
    start?: number;
    num?: number;
    searchTerm?: string;
    contentType?: ContentType;
    sortField?: SortField;
    // sortOrder?: SortOrder;
    mainCategory?: string;
    subCategories?: string[];
    groupId?: string;
    agolHost?: string;
    // token?:string;
};

// export const AGOL_HOST = 'https://www.arcgis.com';

let categorySchemaJSON: IGroupCategorySchema = null;

// let defaultGroupId = '';
// let defaultAgolHost = AGOL_HOST;

// export const setDefaultGroupOptions = ({
//     agolHost = AGOL_HOST,
//     groupId,
// }: {
//     agolHost?: string;
//     groupId: string;
// }):void => {

//     if(!groupId){
//         console.error('ArcGIS Online group Id is missing!');
//     }

//     defaultGroupId = groupId;
//     defaultAgolHost = agolHost
// };

export const loadGroupCategorySchema = async (): Promise<
    IGroupCategorySchema
> => {

    const { groupId } = defaultOptions;

    if (!groupId) {
        console.log('group id is required to load category schema');
        return null;
    }

    const data = await getGroupCategorySchema(groupId);

    return (categorySchemaJSON = data);
};

const ContentTypeQueryStr: Record<ContentType, string> = {
    maps:
        '(type:("Project Package" OR "Windows Mobile Package" OR "Map Package" OR "Basemap Package" OR "Mobile Basemap Package" OR "Mobile Map Package" OR "Pro Map" OR "Project Package" OR "Web Map" OR "CityEngine Web Scene" OR "Map Document" OR "Globe Document" OR "Scene Document" OR "Published Map" OR "Explorer Map" OR "ArcPad Package" OR "Map Template") -type:("Web Mapping Application" OR "Layer Package"))',
    layers:
        '((type:"Scene Service" OR type:"Feature Collection" OR type:"Route Layer" OR type:"Layer" OR type:"Explorer Layer" OR type:"Tile Package" OR type:"Compact Tile Package" OR type:"Vector Tile Package" OR type:"Scene Package" OR type:"Layer Package" OR type:"Feature Service" OR type:"Stream Service" OR type:"Map Service" OR type:"Vector Tile Service" OR type:"Image Service" OR type:"WMS" OR type:"WFS" OR type:"WMTS" OR type:"KML" OR typekeywords:"OGC" OR typekeywords:"Geodata Service" OR type:"Globe Service" OR type:"CSV" OR type:"Shapefile" OR type:"GeoJson" OR type:"Service Definition" OR type:"File Geodatabase" OR type:"CAD Drawing" OR type:"Relational Database Connection") -type:("Web Mapping Application" OR "Geodata Service"))',
    apps:
        '(type:("Code Sample" OR "Web Mapping Application" OR "Mobile Application" OR "Application" OR "Desktop Application Template" OR "Desktop Application" OR "Operation View" OR "Dashboard" OR "Operations Dashboard Extension" OR "Workforce Project" OR "Insights Workbook" OR "Insights Page" OR "Insights Model" OR "Hub Page" OR "Hub Initiative" OR "Hub Site Application"))',
    files:
        '((typekeywords:"Document" OR type:"Image" OR type:"Layout" OR type:"Desktop Style" OR type:"Project Template" OR type:"Report Template" OR type:"Statistical Data Collection" OR type:"360 VR Experience" OR type:"netCDF") -type:("Map Document" OR "Image Service" OR "Explorer Document" OR "Explorer Map" OR "Globe Document" OR "Scene Document"))',
    webmap: '(type:("Web Map") -type:"Web Mapping Application")',
    tools:
        '((typekeywords:"tool" OR type:"Raster function template" OR type:"Geodata Service" OR type:"Workflow Manager Package" OR type:"Rule Package" OR type:"Operations Dashboard Add In" OR type:"Workflow Manager Service" OR type:"ArcGIS Pro Configuration" OR type:"Big Data Analytic" OR type:"Real Time Analytic") -type:"KML")',
    '': '',
};

const SortOrderLookup: Record<SortField, SortOrder> = {
    relevance: 'desc',
    modified: 'desc',
    title: 'asc',
};

const getCategoryPath = (mainCategory: string, subCategories?: string[]):string => {
    if (
        !categorySchemaJSON ||
        !categorySchemaJSON.categorySchema ||
        !categorySchemaJSON.categorySchema[0]
    ) {
        console.error(
            'a valid Category Schema JSON is required to generate category path'
        );
        return '';
    }

    const rootCategory = categorySchemaJSON.categorySchema[0];

    const selectedMainCategory = rootCategory.categories.filter(
        (category) => category.title === mainCategory
    )[0];

    if (!selectedMainCategory) {
        return '';
    }

    if (
        !subCategories.length ||
        subCategories.length === selectedMainCategory.categories.length
    ) {
        return `/${rootCategory.title}/${selectedMainCategory.title}`;
    }

    // return concat paths for selected subcategory
    return (
        subCategories
            // the group search has the limit of max category size of '8', means it can only have 8 'OR' selections for category searches, therefore we need to trunc the array
            // to make sure there are no more than 8 items in it
            .slice(0, 8)
            .map((subCategroy) => {
                return `/${rootCategory.title}/${selectedMainCategory.title}/${subCategroy}`;
            })
            .join(',')
    );
};

export const getQueryParamsForSearch = ({
    start = 1,
    num = 10,
    searchTerm = '',
    contentType = '',
    sortField = 'relevance',
    // sortOrder = 'desc',
    mainCategory = '',
    subCategories = [],
    // token = ''
}: SearchOptions): string => {
    const queryStrings: string[] = [];

    const { userSession } = defaultOptions;

    if (searchTerm) {
        queryStrings.push(`(${searchTerm})`);
    }

    if (contentType && ContentTypeQueryStr[contentType]) {
        queryStrings.push(ContentTypeQueryStr[contentType]);
    }

    const q = queryStrings.length ? queryStrings.join(' ') : '';

    const categories = mainCategory
        ? getCategoryPath(mainCategory, subCategories)
        : '';

    const params: SearchQueryParams = {
        f: 'json',
        start,
        num,
        q,
        sortField,
        sortOrder: SortOrderLookup[sortField] || 'desc',
        categories,
        token: userSession ? userSession.token : ''
    };

    const paramsStr = Object.entries(params)
        .filter(([key, val]) => {
            if (typeof val === 'string') {
                return val !== '';
            }

            return true;
        })
        .map(([key, val]) => {
            return `${key}=${val}`;
        })
        .join('&');

    return paramsStr;
};

export const searchGroupItems = async (options: SearchOptions):Promise<SearchResponse> => {

    const groupId = options.groupId || defaultOptions.groupId;
    const agolHost = options.agolHost || defaultOptions.ArcGISOnlineHost;

    if(!groupId){
        throw 'groupId is missing. either use setDefaultOptions to specify the default groupId or pass groupId in the options';
    }

    const queryParams = getQueryParamsForSearch(options);

    const requestURL = `${agolHost}/sharing/rest/content/groups/${groupId}/search?${queryParams}`;

    try {
        const { data } = await axios.get<ISearchResult<IItem>>(requestURL);

        if(!data.results){
            throw data;
        }

        const response: SearchResponse = {
            ...data,
        };

        response.results = data.results.map((item) => {
            return formatItem({item});
        });

        return response;
    } catch (err) {
        throw err;
    }
};

export const searchGroupItemsByIds = async({
    itemIds,
    groupId,
    agolHost
}: {
    itemIds: string[],
    groupId?: string,
    agolHost?: string,
}):Promise<AgolItem[]>=>{

    if(!itemIds.length){
        return []
    }

    try {
        const searchTerm = itemIds
            .filter((d) => d)
            .map((id) => {
                return `id:${id}`;
            })
            .join(' OR ');

        const res = await searchGroupItems({
            groupId,
            agolHost,
            searchTerm,
            num: itemIds.length
        });

        return res.results;

    } catch(err){
        console.error(err);
        return [];
    }
}