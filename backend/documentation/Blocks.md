 ## Table of Contents
- [About](#about)
- [Schema](#schema)
    + [Resource List](#resource-list)
- [Devices Endpoints](#endpoints)
    + [Get all blocks](#get-blocks)
    + [Get all device blocks](#get-device-block)
    + [Update block name](#update-blockName)
    + [View block sensors](#block-sensors)
    + [Create new block](#create-block)

## About <a name="about"></a>
Documentation for the Co2 blocks(Buildings), schema, and controllers

## Schema <a name="schema"></a>
```prisma
model Block {
  id        Int      @id @default(autoincrement())
  blockName String   @unique
  createdAt DateTime @default(now())
  updatedAt DateTime @default(now()) @updatedAt
  device    Device[]
}
```
### Resource List <a name="resource-list"></a>
- **id:** Default ID when created
- **blockName:** Building block eg(D-block, C-block)
- **createdAt:** When the device was created
- **updatedAt:** When the device was last updated
- **device:** List of devices that are connected to each block

## Device Endpoints <a name="endpoints"></a>
`GET: 'api/v1/blocks'`
`GET: 'api/v1/blocks/{[Letter]-block}'`
`PUT: 'api/v1/blocks/{[Letter]-block}'`
`GET: 'api/v1/blocks/latest/{[Letter]-block}'`
`POST: 'api/v1/blocks/createBlock'`

## Get all blocks 'api/v1/blocks' <a name="get-blocks"></a>
```json
{
    "statusCode": 200,
    "data": [
        {
            "id": 4,
            "blockName": "A-block",
            "createdAt": "2024-05-23T02:46:27.971Z",
            "updatedAt": "2024-05-23T02:46:27.971Z"
        },
        {
            "id": 3,
            "blockName": "B-block",
            "createdAt": "2024-05-23T02:46:27.967Z",
            "updatedAt": "2024-05-23T02:46:27.967Z"
        }
    ],
    "nextPage": null
}
```

## Get all devices for a block 'api/v1/blocks/{[X]-block}' <a name="get-device-block"></a>
```json
{
    "statusCode": 200,
    "data": {
        "id": 1,
        "blockName": "D-block",
        "createdAt": "2024-05-23T02:46:27.957Z",
        "updatedAt": "2024-05-23T02:46:27.957Z",
        "device": [
            {
                "room_number": null,
                "deviceId": "eui-1000024b080301f5",
                "dev_eui": "1000024b080301f5"
            },
            {
                "room_number": null,
                "deviceId": "eui-3000024b080301f5",
                "dev_eui": "3000024b080301f5"
            }
        ]
    }
}
```

## Update Block name 'api/v1/blocks/{[X]-block}' <a name="update-blockName"></a>
Body Message:  
```json
"room_number": "D206"
```

Controller will check if the block name being updated is correct
```json
{
    "statusCode": 404,
    "message": "0-block not found on the server"
}
```

Then checks if the block already exists
```json
{
    "statusCode": 409,
    "message": "D-block already exists in the database"
}
```

If no blockName is passed will return an error
```json
{
    "statusCode": 400,
    "message": "New block name is required"
}
```

Block names cannot start with a space
```json
{
    "statusCode": 400,
    "message": "Block name cannot start with a space"
}
```
Blocks must also follow an Uppercase letter -block format
`D-block`

```json
{
    "statusCode": 400,
    "message": "Block name must be in the format [Uppercase Letter]-block"
}
```

Successfully updating a block will return the following
```json
{
    "statusCode": 200,
    "message": "Block name updated successfully",
    "data": {
        "id": 1,
        "blockName": "X-block",
        "createdAt": "2024-05-23T02:46:27.957Z",
        "updatedAt": "2024-05-23T03:13:56.932Z"
    }
}
```


## Get all recent sensor information in a block 'api/v1/blocks/latest/{[X]-block}' <a name="block-sensors"></a>
```json
{
    "statusCode": 200,
    "data": {
        "id": 1,
        "blockName": "X-block",
        "createdAt": "2024-05-23T02:46:27.957Z",
        "updatedAt": "2024-05-23T03:13:56.932Z",
        "device": [
            {
                "room_number": null,
                "deviceId": "eui-1000024b080301f5",
                "dev_eui": "1000024b080301f5"
            },
            {
                "room_number": null,
                "deviceId": "eui-3000024b080301f5",
                "dev_eui": "3000024b080301f5"
            }
        ]
    }
}
```

## Create a new block 'api/v1/blocks/createBlock' <a name="create-block"></a>

Creating will check if a name has been passed through
```json
{
    "statusCode": 400,
    "message": "Block name is required"
}
```

Block names cannot start with a space
```json
{
    "statusCode": 400,
    "message": "Block name cannot start with a space"
}
```

Blocks must follow a Uppercase letter -block format
`D-block`

```json
{
    "statusCode": 400,
    "message": "Block name must be in the format [Uppercase Letter]-block"
}
```

Controller will then check if that block name is already taken
```json
{
    "statusCode": 409,
    "message": "X-block already exists"
}
```

Create will return the following, for a successful block create.
```json
{
    "statusCode": 201,
    "message": "U-block created successfully",
    "data": {
        "id": 5,
        "blockName": "U-block",
        "createdAt": "2024-05-23T03:18:32.214Z",
        "updatedAt": "2024-05-23T03:18:32.214Z"
    }
}
```