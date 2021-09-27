import { UserSession } from '@esri/arcgis-rest-auth';
import { IItem } from '@esri/arcgis-rest-types';
import { shareItemWithGroup, unshareItemWithGroup, isItemSharedWithGroup, ISharingResponse, IGroupSharingOptions, searchItems } from '@esri/arcgis-rest-portal';

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

export const getMyFavItems = async():Promise<IItem[]>=>{

    if(!session || !favGroupId){
        return [];
    }

    const response = await searchItems({
        q: `(group:${favGroupId})`,
        start: 1,
        num: 1000,
        authentication: session
    })

    return response.results;
}

export const toggleShareWithMyFavGroup = (itemId:string):Promise<ISharingResponse>=>{

    return new Promise(async(resolve, reject)=>{

        if(!session){
            reject({
                errorMessage: 'need to sign in before toggle sharing item with my fav group'
            });
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
            
            resolve(response);
    
        } catch(err){
            reject(err)
        }
    })
}