// import { ArcGISIdentityManager  } from '@esri/arcgis-rest-request';
import { shareItemWithGroup, unshareItemWithGroup, isItemSharedWithGroup, ISharingResponse, IGroupSharingOptions, searchGroupContent  } from '@esri/arcgis-rest-portal';
import {
    IItem
} from '@esri/arcgis-rest-types'

import {
    defaultOptions
} from '..'

// let favGroupId = '';
// let session:UserSession = null;

// export const setMyFavoriteGroup = ({
//     groupId,
//     userSession
// }: {
//     groupId: string;
//     userSession: UserSession;
// }):void => {

//     if(!groupId){
//         console.error('My Favorite group ID is required');
//         return;
//     }

//     if(!userSession){
//         console.error('user session is required');
//         return;
//     }

//     favGroupId = groupId;
//     session = userSession;
// };

export const getMyFavItems = async():Promise<IItem[]>=>{

    const {
        myFavGroupId,
        identidyManager
    } = defaultOptions

    if(!identidyManager || !myFavGroupId){
        return [];
    }

    try {
        const response = await searchGroupContent({
            groupId: myFavGroupId,
            q: '',
            num: 1000,
            authentication: identidyManager
        })
    
        return response.results;

    } catch(err){
        throw err;
    }
}

export const toggleShareWithMyFavGroup = async(itemId:string):Promise<ISharingResponse>=>{

    const {
        myFavGroupId,
        identidyManager
    } = defaultOptions

    if(!identidyManager){
        throw {
            error: 'need to sign in before toggle sharing item with my fav group'
        };
    }

    try {
        const options:IGroupSharingOptions = {
            groupId: myFavGroupId,
            id: itemId,
            authentication: identidyManager
        };

        const isSharedWithMyFavGroup = await isItemSharedWithGroup(options)

        const response: ISharingResponse = isSharedWithMyFavGroup
            ? await unshareItemWithGroup(options)
            : await shareItemWithGroup(options)
        
        return response;

    } catch(err){
        throw err;
    }
}