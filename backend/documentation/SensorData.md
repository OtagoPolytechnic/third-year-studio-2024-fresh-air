## Table of Contents
- [About](#about)
- [Schema](#schema)
    + [Resource List](#resource-list)
- [SensorData Endpoints](#endpoints)
- [Queries/Pagination](#query-pagination)
    + [Query Examples](#query-examples-rooms-deveui)
    + [SensorData Examples](#sensorData-example)
        + [SensorData Latest Example](#sensorData-latest-example)

## About <a name="about"></a>
Documentation for the CO2 SensorData, schema and controllers.

## Schema <a name="schema"></a>
```prisma 
model SensorData {
  id          Int      @id @default(autoincrement())
  co2         String
  temperature String
  createdAt   DateTime @default(now())
  deviceId    String
  dev_eui     String
  device      Device   @relation(fields: [deviceId], references: [deviceId])
}
```
### Resource List <a name="resource-list"></a>
- **id:** Default ID when created
- **co2:** Devices reading for the current co2 levels in the room.
- **temperature:** Devices reading for the temperature in the room.
- **createdAt:** When the device was created
- **deviceID:** End device ID as on TTN. (eui-xxxx)
- **dev_eui:** the string after eui- returned in uppercase
- **device:** Relational mapping to the Devices model

## Devices Endpoints <a name="endpoints"></a>
`'api/v1/rooms/{dev_eui}'` Returns every single sensorData from a device
`'api/v1/rooms/latest/{dev_eui}'` Returns the most recent sensorData uploaded from the a device

## Queries & Pagination <a name="query-pagination"></a>
  
**'/api/v1/rooms/{dev_eui}' Query options**
`amount`: Limit the amount of data coming through.  
`page`: Change the page number of the search results.  
`sortOrder`: Change the data to return in ascending or descending order.  
`sortBy`: Change what key to use for sorting
```
amount=n
page=n
sortOrder: asc || desc
sortBy: id || co2 || temperature || createdAt || deviceId || dev_eui
```

### Query Examples '/api/v1/rooms/{dev_eui}' <a name="query-examples-rooms-deveui"></a>
`/api/v1/rooms/{dev_eui}?amount=2`  
`/api/v1/rooms/{dev_eui}amount=2&page=2`  
`/api/v1/rooms/{dev_eui}?sortBy=co2`  
`/api/v1/rooms/{dev_eui}?sortBy=co2&sortOrder=asc`  

## SensorData Query Examples <a name="sensorData-example"></a>

### '/api/v1/rooms/{dev_eui}'
```json
{
    "statusCode": 200,
    "data": [
        {
            "id": 951,
            "co2": "400",
            "temperature": "19",
            "createdAt": "2024-03-28T06:53:20.565Z",
            "deviceId": "eui-00efe04b4c9dc5d3",
            "dev_eui": "00EFE04B4C9DC5D3"
        },
        {
            "id": 949,
            "co2": "400",
            "temperature": "19",
            "createdAt": "2024-03-28T06:48:18.479Z",
            "deviceId": "eui-00efe04b4c9dc5d3",
            "dev_eui": "00EFE04B4C9DC5D3"
        },
    ],
    "nextPage": 2
}
```

### '/api/v1/rooms/{dev_eui}?amount=2&page=3'
```json
{
    "statusCode": 200,
    "data": [
        {
            "id": 944,
            "co2": "400",
            "temperature": "19",
            "createdAt": "2024-03-28T06:33:12.270Z",
            "deviceId": "eui-00efe04b4c9dc5d3",
            "dev_eui": "00EFE04B4C9DC5D3"
        },
        {
            "id": 942,
            "co2": "400",
            "temperature": "19",
            "createdAt": "2024-03-28T06:28:10.177Z",
            "deviceId": "eui-00efe04b4c9dc5d3",
            "dev_eui": "00EFE04B4C9DC5D3"
        }
    ],
    "nextPage": 4
}
```

### Query Examples 'api/v1/rooms/latest/{dev_eui}' <a name="query-examples-latest"></a>
`/api/v1/rooms/latest/{dev_eui}`

## SensorData Latest Query Examples <a name="sensorData-latest-example"></a>

### '/api/v1/rooms/{dev_eui}?sortOrder=asc&sortBy=co2'
```json
{
    "statusCode": 200,
    "data": [
        {
            "id": 233,
            "co2": "1012",
            "temperature": "17",
            "createdAt": "2024-03-27T19:13:32.736Z",
            "deviceId": "eui-00efe04b4c9dc5d3",
            "dev_eui": "00EFE04B4C9DC5D3"
        },
        {
            "id": 271,
            "co2": "1022",
            "temperature": "17",
            "createdAt": "2024-03-27T19:53:50.649Z",
            "deviceId": "eui-00efe04b4c9dc5d3",
            "dev_eui": "00EFE04B4C9DC5D3"
        },
    ],
    "nextPage": 2
}
```

