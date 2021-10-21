# Search Group Items

## searchGroupItems 

```ts
searchGroupItems(options:SearchOptions) : Promise<SearchResponse>
```

### Example

```ts
import {
    searchGroupItems,
    searchGroupItemsByIds,
    setDefaultGroupOptions,
    loadGroupCategorySchema,
} from '@vannizhang/arcgis-rest-helper';

// set the default Group ID that will be used for searching items
// make sure this is called before calling searchGroupItems
setDefaultGroupOptions({
    groupId: 'abc12345',
});

// load the group category schema if will be using categories as filters
await loadGroupCategorySchema();

// search items from dafault group 
const res = await searchGroupItems({
    searchTerm: 'river',
    contentType: 'layers',
    sortField: 'title',
    mainCategory: 'environment'
    subCategories: ['Fresh Water', 'Land Cover']
})

// or search items from a specific group
const res = await searchGroupItems({
    start: 1,
    num: 10
    groupId: 'ef456'
})
```

### Parameters
| Parameter   | Type        | Default     | Note        |
| ----------- | ----------- | ----------- | ----------- |
| options     | SearchOptions        |         |         |

### SearchOptions

| Property      | Type          | Note        |
| -----------   | -----------   | ----------- |
| start `optional`        | number        |             |
| num `optional`          | number        |             |
| searchTerm `optional`   | string        |             |
| contentType `optional`  | ContentType   |             |
| sortField `optional`    | SortField     |             |
| mainCategory `optional` | string        |             |
| subCategories `optional`| string[]      |             |
| groupId `optional` | string        |             |
| agolHost `optional`| string        |             |
| token `optional`   | string        |             |

### Returns

A promise that will resolve with `SearchResponse` 

```
Promise<SearchResponse>
```
| Property      | Type          | Note        |
| -----------   | -----------   | ----------- |
| start         | number        |             |
| num           | number        |             |
| query           | string        |             |
| total           | number        |             |
| nextStart           | number        |             |
| results           | AgolItem[]        |             |

<br />

## searchGroupItemsByIds 

```ts
searchGroupItemsByIds(options:{
    itemIds: string[],
    groupId?: string,
    agolHost?: string,
}) : Promise<AgolItem[]>
```

### Example

```ts
import {
    searchGroupItemsByIds,
    setDefaultGroupOptions,
} from '@vannizhang/arcgis-rest-helper';

// set the default Group ID that will be used for searching items
// make sure this is called before calling searchGroupItems
setDefaultGroupOptions({
    groupId: 'abc12345',
});

// then search items by list of item ids
const items = await searchGroupItemsByIds({
    itemIds: [
        'ff0facb43ce643a2940f77029d257cf7',
        'f98b82823fcc4291b7d03bbd0401f816',
        'ee69e67f014c42ed84a5190ee990e5cd'
    ]
})
```

### Parameters
| Parameter   | Type        | Default     | Note        |
| ----------- | ----------- | ----------- | ----------- |
| options     | SearchGroupItemsByIdsOptions        |         |         |

### SearchGroupItemsByIdsOptions

| Property      | Type          | Note        |
| -----------   | -----------   | ----------- |
| itemIds | string[]      |             |
| groupId `optional` | string        |             |
| agolHost `optional`| string        |             |

### Returns

A promise that will resolve with `AgolItem[]` 

```
Promise<AgolItem[]>
```


