# Manage My Favorite items

## getMyFavItems 

get items from My Favorite Group

```ts
getMyFavItems() : Promise<IItem[]>
```

### Example

```ts
import {
    setDefaultOptions,
    getMyFavItems
} from '@vannizhang/arcgis-rest-helper';

setDefaultOptions({
    groupId: 'abc123',
    myFavGroupId: 'edf345',
    identidyManager,
})

const myFavItems = await getMyFavItems();
```

### Returns
> IItem[]

<br />

## toggleShareWithMyFavGroup 

toggle share an item with My Favorite Group

```ts
toggleShareWithMyFavGroup(itemId:string) : Promise<ISharingResponse>
```

### Example

```ts
import {
    setDefaultOptions,
    getMyFavItems
} from '@vannizhang/arcgis-rest-helper';

setDefaultOptions({
    groupId: 'abc123',
    myFavGroupId: 'edf345',
    identidyManager,
})

const res = await toggleShareWithMyFavGroup('efd567);
```
### Parameters
| Parameter   | Type        | Default     | Note        |
| ----------- | ----------- | ----------- | ----------- |
| itemId     | string        |         |         |

### Returns
> [ISharingResponse](https://esri.github.io/arcgis-rest-js/api/portal/ISharingResponse/)