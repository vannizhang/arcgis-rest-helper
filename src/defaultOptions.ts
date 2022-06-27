import { ArcGISIdentityManager  } from '@esri/arcgis-rest-request';

export const AGOL_HOST = 'https://www.arcgis.com';

export type DefaultOptions = {
    ArcGISOnlineHost?: string,
    groupId?: string,
    myFavGroupId?: string,
    identidyManager?:ArcGISIdentityManager
}

export let defaultOptions:DefaultOptions = {
    ArcGISOnlineHost: AGOL_HOST,
    groupId: '',
    myFavGroupId: '',
    identidyManager: null
}

export const setDefaultOptions = (options:DefaultOptions)=>{
    defaultOptions = {
        ...defaultOptions,
        ...options
    }
}