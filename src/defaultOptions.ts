import { UserSession } from "@esri/arcgis-rest-auth";

export const AGOL_HOST = 'https://www.arcgis.com';

type DefaultOptions = {
    ArcGISOnlineHost?: string,
    groupId?: string,
    myFavGroupId?: string,
    userSession?:UserSession
}

export let defaultOptions:DefaultOptions = {
    ArcGISOnlineHost: AGOL_HOST,
    groupId: '',
    myFavGroupId: '',
    userSession: null
}

export const setDefaultOptions = (options:DefaultOptions)=>{
    defaultOptions = {
        ...defaultOptions,
        ...options
    }
}