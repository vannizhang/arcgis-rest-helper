# Search Group Items

## searchGroupItems 

```ts
searchGroupItems(options:SearchOptions) : Promise<SearchResponse>
```

### Example

```ts
import {
    searchGroupItems,
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
