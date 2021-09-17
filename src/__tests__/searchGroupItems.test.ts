import {
    setDefaultGroupOptions,
    getQueryParamsForSearch
} from '..'

test('setDefaultGroupOptions', () => {
    expect(setDefaultGroupOptions({ groupId: '123'})).toBe(undefined);
});

test('getQueryParamsForSearch', () => {
    expect(getQueryParamsForSearch({})).toBe('f=json&start=1&num=10&sortField=relevance&sortOrder=desc');
});