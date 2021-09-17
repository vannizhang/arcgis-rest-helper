import {
    setDefaultGroupOptions
} from '..'

test('setDefaultGroupOptions', () => {
    expect(setDefaultGroupOptions({ groupId: '123'})).toBe(undefined);
});