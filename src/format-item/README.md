# Format ArcGIS Online Item

## formatItem 

format ArcGIS Online Portal [Item](https://developers.arcgis.com/rest/users-groups-and-items/item.htm) by adding extra properties to it (e.g. thumbnailUrl, itemIconUrl, agolItemUrl and etc).

```ts
formatItem(options:FormatItemOptions) : AgolItem
```

### Example

```ts
import { 
    getItem 
} from "@esri/arcgis-rest-portal";

import {
    IItem
} from "@esri/arcgis-rest-types";

import {
    formatItem,
    AgolItem
} from '@vannizhang/arcgis-rest-helper';

getItem("ae7")
  .then((item:IItem)=>{
        const formattedItem:AgolItem = formatItem({
            item
        })
  });
```

### Parameters
| Parameter   | Type        | Default     | Note        |
| ----------- | ----------- | ----------- | ----------- |
| options     | FormatItemOptions        |         |         |

### FormatItemOptions

| Property    | Type        | Note        |
| ----------- | ----------- | ----------- |
| item        | [IItem](https://esri.github.io/arcgis-rest-js/api/types/IItem/) |         |
| agolHost  `optional`        | Text        | default value is "https://www.arcgis.com"         |
| thumbnailWidth  `optional`        | number        | default value is 200        |

### Returns
> AgolItem

<br />

## AgolItem

Formatted ArcGIS Online Portal Item.

```ts
import {
    AgolItem
} from '@vannizhang/arcgis-rest-helper';
```

Properties

| Property    | Type        |
| ----------- | ----------- | 
created	| number	
id	| string	
modified	| number	
numViews	| number	
owner	| string	
size	| number	
tags	| string[] | string	
title |	string	
type |	string	
protected |	boolean	
categories | 	string[] | string	
culture | 	string	
description | 	string	
documentation | 	string	
extent | number[] | number[] | number[] | number	
properties | 	any	
snippet | 	string	
spatialReference | 	ISpatialReference	
typeKeywords | 	string[] | string	
url | string
isSubscriberContent | boolean
isPremiumContent | boolean
isAuthoritative | boolean
thumbnailUrl | string
agolItemUrl | string
itemIconUrl | string
typeDisplayName | string