import { UserSession } from '@esri/arcgis-rest-auth';
import { shareItemWithGroup, unshareItemWithGroup, isItemSharedWithGroup, ISharingResponse, IGroupSharingOptions } from '@esri/arcgis-rest-portal';
import {
    AgolItem,
    searchGroupItems
} from '..'

let favGroupId = '';
let session:UserSession = null;

export const setMyFavoriteGroup = ({
    groupId,
    userSession
}: {
    groupId: string;
    userSession: UserSession;
}):void => {

    if(!groupId){
        console.error('My Favorite group ID is required');
        return;
    }

    if(!userSession){
        console.error('user session is required');
        return;
    }

    favGroupId = groupId;
    session = userSession;
};

export const getMyFavItems = async():Promise<AgolItem[]>=>{

    if(!session || !favGroupId){
        return [];
    }

    try {
        const response = await searchGroupItems({
            groupId: favGroupId,
            start: 1,
            num: 1000,
            token: session.token
        })
    
        return response.results;

    } catch(err){
        throw err;
    }
}

export const toggleShareWithMyFavGroup = async(itemId:string):Promise<ISharingResponse>=>{

    if(!session){
        throw {
            error: 'need to sign in before toggle sharing item with my fav group'
        };
    }

    try {
        const options:IGroupSharingOptions = {
            groupId: favGroupId,
            id: itemId,
            authentication: session
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