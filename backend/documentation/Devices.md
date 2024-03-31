getAllDevices

```prisma
model Device {
  id          Int          @id @default(autoincrement())
  room_number String?
  deviceId    String       @unique
  dev_eui     String       @unique
  createdAt   DateTime     @default(now())
  sensorData  SensorData[]
}
```

## Queries & Pagination
Calling the devices API without any endpoint (/api/v1/devices) will return a paginated list   
of all devices currently in the database.
By default,a list "page" will contain up to 10 resources, and is sorted in ascending order by it's created ID

## '/' Queries
```
amount=n 
page=n
sortOrder: "asc" | "desc"
sortBy: "id" | "room_number" | "deviceId" | "dev_eui" | "createdAt"
```

### Query Examples
`xxx/api/v1/devices?amount=2`
`xxx/api/v1/devices?amount=2&page=2`
`xxx/api/v1/devices?sortBy=deviceId`
`xxx/api/v1/devices?sortOrder=desc`


## JSON Device Example '/api/v1/devices/'
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


```
room_number: Defines what room the device is located in (D207, D202, etc)
deviceID: End device ID as on TTN. (eui-xxxx)
dev_eui: the string after eui-
sensorData: 
```

queries: 
sortBy
sortOrder
amount
page
/api/v1/devices/



getDevice
/api/v1/devices/{dev_eui}
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

queries: 
?sensorData=true
returns sensorData information for selected device
device is paginated if more than 10 items are in the array.
Can customize the amount of sensor data returned with with ?amount=n
can change page of sensorData with ?page=n

can be sorted with ?sortBy={sensorData data.x} ?sortBy=createdAt
by default, sensor data is sorted in descending order.
Can be altered with ?sortOrder=asc | desc

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