import {
    setDefaultOptions,
    // getQueryParamsForSearch,
    // searchGroupItems,
    // searchGroupItemsByIds
} from '../defaultOptions'

// import {
//     getQueryParamsForSearch,
//     searchGroupItems,
//     searchGroupItemsByIds
// } from '..'

const POLICY_MAPS_GROUP_ID = 'a179c67d72c745709a7d95dd41922650'

test('setDefaultOptions', () => {
    expect(setDefaultOptions({ groupId: POLICY_MAPS_GROUP_ID})).toBe(undefined);
});

// test('getQueryParamsForSearch', () => {
//     expect(getQueryParamsForSearch({})).toBe('f=json&start=1&num=10&sortField=relevance&sortOrder=desc');
// });

// test('search items from esri policy maps group', async() => {

//     try {
//         setDefaultOptions({ groupId: POLICY_MAPS_GROUP_ID})

//         const response = await searchGroupItems({
//             num: 0
//         })
    
//         expect(response.total).toBeGreaterThan(0);

//         expect(response.num).toBe(0);

//     } catch(err){
//         console.log('failed to search group items: ', err)
//     }
// });

// test('search items by item ids', async() => {

//     try {
//         setDefaultOptions({ groupId: POLICY_MAPS_GROUP_ID})

//         const items = await searchGroupItemsByIds({
//             itemIds: [
//                 'ff0facb43ce643a2940f77029d257cf7',
//                 'f98b82823fcc4291b7d03bbd0401f816',
//                 'ee69e67f014c42ed84a5190ee990e5cd'
//             ]
//         })
    
//         expect(items.length).toBe(3);

//     } catch(err){
//         console.log('failed to search items by item ids', err)
//     }
// });