## Table of Contents
- [About](#about)
- [Schema](#schema)
    + [Resource List](#resource-list)
- [Devices Endpoints](#endpoints)
    + [Device Update Room Number](#update-room-number)
- [Queries/Pagination](#query-pagination)
    + [Query Examples](#query-examples)
- [Devices Examples](#devices-example)
    + [Device with SensorData Examples](#dev-eui-examples)

## About <a name="about"></a>
Documentation for the CO2 sensor devices, schema and controllers.

## Schema <a name="schema"></a>
```prisma 
model Device {
  id          Int          @id @default(autoincrement())
  room_number String?      @unique
  deviceId    String       @unique
  dev_eui     String       @unique
  createdAt   DateTime     @default(now())
  updatedAt   DateTime     @default(now()) @updatedAt
  sensorData  SensorData[]
  blockId     Int?
  block       Block?       @relation(fields: [blockId], references: [id], onUpdate: Cascade, onDelete: Cascade)
}
```
### Resource List <a name="resource-list"></a>
- **id:** Default ID when created
- **room_number:** Defines what room the device is located in (D207, D202, etc)
- **deviceID:** End device ID as on TTN. (eui-xxxx)
- **dev_eui:** the string after eui- returned in uppercase
- **createdAt:** When the device was created
- **updatedAt:** When the device was last updated
- **sensorData:** A list of data sent from the webhook 
- **blockId:** The ID of the block this device is connected to
- **block:** Relation to block model

## Devices Endpoints <a name="endpoints"></a>
`GET: 'api/v1/devices'`  
`GET/PUT: 'api/v1/devices/{dev_eui}'`

## Update Room Number 'api/v1/devices/{dev_eui}' <a name='update-room-number'></a>
Updating a room via a PUT request requires the room_number in the body message  

PUT Request: `/api/v1/devices/{dev_eui}`  
Body Message:  
```json
"room_number": "D206"
```

The controller will check if the device exists via the dev_eui param, and return if failure. 
```json
{
    "statusCode": 404,
    "message": "Device 00D3C59800BDD35 not found in the database"
}
```

If the device exists the controller will then check if a room_number in the database already exists
```json
{
    "statusCode": 409,
    "message": "Device with room number already D206 exists in the database"
}

```

Once it gets through all the checks it will update the field and return a payload with the new device information
```json
{
    "message": "Room number updated successfully",
    "data": {
        "id": 1,
        "room_number": "D313",
        "deviceId": "eui-00d3c59800bdd352",
        "dev_eui": "00D3C59800BDD352",
        "createdAt": "2024-03-27T09:46:41.851Z"
    }
}
```

## Queries & Pagination <a name="query-pagination"></a>
Calling the devices API without any endpoint **(/api/v1/devices)** will return a paginated list   
of all devices currently in the database.
By default, a list "page" will contain up to 10 resources, and is sorted in ascending order by it's created ID

You can also query the devices with any of the following:   
**'/api/v1/devices' Query options**

`amount`: Limit the amount of data coming through.  
`page`: Change the page number of the search results.  
`sortOrder`: Change the data to return in ascending or descending order.  
`sortBy`: Change what key to use for sorting
```
amount=n
page=n
sortOrder: asc || desc
sortBy: id || room_number || deviceId || dev_eui || createdAt
```

**/api/v1/devices/{dev_eui} Query options**
`sensorData`SensorData for a single device is false by default to display the data related to the device you can turn it on with **'?sensorData=true'**  
Querying a single device will not change anything,  
this is because the API route for this GET request is setup to not immediately search for any relational data.    
If this is enabled you can further query the sensorData array rather than the device with the same query params as above!

### Query Examples '/api/v1/devices/' <a name="query-examples"></a>
`/api/v1/devices?amount=2`  
`/api/v1/devices?amount=2&page=2`  
`/api/v1/devices?sortBy=deviceId`  
`/api/v1/devices?sortOrder=desc`  

## Devices Examples <a name="devices-example"></a>

### '/api/v1/devices/'
```json
{
    "statusCode": 200,
    "data": [
        {
            "id": 1,
            "room_number": null,
            "deviceId": "eui-00d3c59800bdd352",
            "dev_eui": "00D3C59800BDD352",
            "createdAt": "2024-03-27T09:46:41.851Z"
        },
        {
            "id": 2,
            "room_number": null,
            "deviceId": "eui-00efe04b4c9dc5d3",
            "dev_eui": "00EFE04B4C9DC5D3",
            "createdAt": "2024-03-27T09:49:39.169Z"
        },
    ],
    "nextPage": null
};
```

### '/api/v1/devices?amount=2&page=3'
```json
{
    "statusCode": 200,
    "data": [
        {
            "id": 5,
            "room_number": null,
            "deviceId": "eui-00de14cbec133b5b",
            "dev_eui": "00DE14CBEC133B5B",
            "createdAt": "2024-03-27T19:05:10.174Z"
        },
        {
            "id": 6,
            "room_number": null,
            "deviceId": "eui-70b3d57ed0053df3",
            "dev_eui": "70B3D57ED0053DF3",
            "createdAt": "2024-03-27T21:01:27.447Z"
        }
    ],
    "nextPage": 4
}
```

### '/api/v1/devices?sortOrder=desc&sortBy=dev_eui'
```json
{
    "statusCode": 200,
    "data": [
        {
            "id": 6,
            "room_number": null,
            "deviceId": "eui-70b3d57ed0053df3",
            "dev_eui": "70B3D57ED0053DF3",
            "createdAt": "2024-03-27T21:01:27.447Z"
        },
        {
            "id": 3,
            "room_number": null,
            "deviceId": "eui-70b3d57ed0045fa7",
            "dev_eui": "70B3D57ED0045FA7",
            "createdAt": "2024-03-27T18:42:22.665Z"
        },
    ]
}
```

### Query Examples '/api/v1/devices/{dev_eui}' <a name="dev-eui-examples"></a>
`/api/v1/devices/{dev_eui/}?sensorData=true`  
`/api/v1/devices/{dev_eui/}?sensorData=true&amount=3`  
`/api/v1/devices/{dev_eui/}?sensorData=true&amount=3&page=2`  
`/api/v1/devices/{dev_eui/}?sensorData=true&sortBy=co2`  
`/api/v1/devices/{dev_eui/}?sensorData=true&sortOrder=asc`

### '/api/v1/devices/{dev_eui}'
```json
{
    "statusCode": 200,
    "data": {
        "id": 1,
        "room_number": null,
        "deviceId": "eui-00d3c59800bdd352",
        "dev_eui": "00D3C59800BDD352",
        "createdAt": "2024-03-27T09:46:41.851Z"
    },
    "nextPage": null
}
```

### '/api/v1/devices/{dev_eui}?sensorData=true'
```json
{
"statusCode": 200,
    "data": {
        "id": 1,
        "room_number": null,
        "deviceId": "eui-00d3c59800bdd352",
        "dev_eui": "00D3C59800BDD352",
        "createdAt": "2024-03-27T09:46:41.851Z",
        "sensorData": [
            {
                "id": 952,
                "co2": "400",
                "temperature": "19",
                "createdAt": "2024-03-28T06:55:30.605Z",
                "deviceId": "eui-00d3c59800bdd352",
                "dev_eui": "00D3C59800BDD352"
            },
        ],
    }
}
```

### '/api/v1/devices/70B3D57ED0053DF3?sensorData=true&amount=3&page=2'
```json
{
    "statusCode": 200,
    "data": {
        "id": 6,
        "room_number": null,
        "deviceId": "eui-70b3d57ed0053df3",
        "dev_eui": "70B3D57ED0053DF3",
        "createdAt": "2024-03-27T21:01:27.447Z",
        "sensorData": [
            {
                "id": 870,
                "co2": "1302",
                "temperature": "21",
                "createdAt": "2024-03-28T03:58:55.553Z",
                "deviceId": "eui-70b3d57ed0053df3",
                "dev_eui": "70B3D57ED0053DF3"
            },
            {
                "id": 867,
                "co2": "1308",
                "temperature": "21",
                "createdAt": "2024-03-28T03:56:54.127Z",
                "deviceId": "eui-70b3d57ed0053df3",
                "dev_eui": "70B3D57ED0053DF3"
            },
            {
                "id": 865,
                "co2": "1297",
                "temperature": "21",
                "createdAt": "2024-03-28T03:54:52.718Z",
                "deviceId": "eui-70b3d57ed0053df3",
                "dev_eui": "70B3D57ED0053DF3"
            }
        ]
    },
    "nextPage": 3
}
```