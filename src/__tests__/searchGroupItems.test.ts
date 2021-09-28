import {
    setDefaultGroupOptions,
    getQueryParamsForSearch,
    searchGroupItems
} from '..'

test('setDefaultGroupOptions', () => {
    expect(setDefaultGroupOptions({ groupId: '123'})).toBe(undefined);
});

test('getQueryParamsForSearch', () => {
    expect(getQueryParamsForSearch({})).toBe('f=json&start=1&num=10&sortField=relevance&sortOrder=desc');
});

test('search items from esri policy maps group', async() => {

    try {
        setDefaultGroupOptions({ groupId: 'a179c67d72c745709a7d95dd41922650'})

        const response = await searchGroupItems({
            num: 0
        })
    
        expect(response.total).toBeGreaterThan(0);

        expect(response.num).toBe(0);

    } catch(err){
        console.log('failed to search group items', err)
    }
});