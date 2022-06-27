# arcgis-rest-helper

This library provides modules to simplify the works when it comes to dealing with contents from ArcGIS Online: search group content, format items, search items from my favorite group and etc.

Have you ever seen the [Browse Page](https://livingatlas.arcgis.com/en/browse/#d=2) of the Living Atlas of the World site and/or the [Explore App](https://livingatlas.arcgis.com/policy/browse/) of the Esri Maps for Pulic Policy site? Although the UI look quite different, but ultimately these two apps do pretty much the same thing: **Search items from a ArcGIS Online Group** and render the results as a list. 

Of course you can do this by using the `Group Content Search operation` from [ArcGIS REST API](https://developers.arcgis.com/rest/users-groups-and-items/group-content-search.htm) directly, which is exactly what we use, but sooner or later you will realize that you will need to do a lot of extra things before you can do things like searching group content using the category schema or content type as filters; or getting the ready to use thumbnail image URL for items from the result before rendering them as a list of cards and etc.

We use this library in several different Living Atlas apps/sites and we will continue to maintain this library by adding more modules to it.

## Installation:
```
npm install @vannizhang/arcgis-rest-helper
```

## Module import:
```js
import {
    setDefaultOptions,
    // search-group-items
    loadGroupCategorySchema,
    searchGroupItems,
    searchGroupItemsByIds,
    // format-item
    formatItem,
    // my-favorite-items
    getMyFavItems,
    toggleShareWithMyFavGroup,
    // shared types
    AgolItem,
    ContentType,
    SortField,
    SortOrder,
    SearchResponse,
} from '@vannizhang/arcgis-rest-helper'
```

## Configure arcgis-rest-helper

Make sure to call `setDefaultOptions` before using other methods like `loadGroupCategorySchema`, `searchGroupItems` and etc.

```js
import {
    setDefaultOptions,
} from '@vannizhang/arcgis-rest-helper'

// this will make searchGroupItems to use the group 'abc123' by default, unless a groupId is provided in the SearchOptions
setDefaultOptions({
    groupId: 'abc123',
});

// Here are all available default options
setDefaultOptions({
    groupId: 'abc123',
    ArcGISOnlineHost: 'https://arcgis-content.maps.arcgis.com',
    // make sure myFavGroupId and identidyManager are provided before using methods from my-favorite-items module
    myFavGroupId: 'efg567',
    identidyManager: getIdentidyManager(); // let's assume this method returns the ArcGISIdentityManager instance (https://developers.arcgis.com/arcgis-rest-js/api-reference/arcgis-rest-request/ArcGISIdentityManager)
});
```

## API Reference
- [search-group-items](./src/search-group-items/README.md)
- [format-item](./src/format-item/README.md)
- [my-favorite-items](./src/my-favorite-items/README.md)
