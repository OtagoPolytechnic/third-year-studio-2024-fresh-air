import { PrismaClient } from '@prisma/client';
import { blockNamePattern } from '../../utils/constants/regex.js';
import { STATUS_CODES } from '../../utils/statusCodes/statusCode.js';
import { PAGINATION_DEFAULTS } from '../../utils/constants/globalConstants.js';

const prisma = new PrismaClient();

const getAllBlocks = async (req, res) => {
  try {
    const sortBy = req.query.sortBy || 'createdAt';
    const sortOrder = req.query.sortOrder === 'asc' ? 'asc' : 'desc';

    const amount = req.query.amount || PAGINATION_DEFAULTS.amount;
    const page = req.query.page || PAGINATION_DEFAULTS.page;

    const blocks = await prisma.block.findMany({
      orderBy: {
        [sortBy]: sortOrder,
      },
      take: Number(amount),
      skip: Number(page - 1) * Number(amount),
    });

    if (!blocks || blocks.length === 0) {
      return res.status(STATUS_CODES.NOT_FOUND).json({
        statusCode: res.statusCode,
        message: `No buildings found on the server`,
      });
    }

    const hasNextPage = blocks.length === Number(amount);

    return res.status(STATUS_CODES.OK).json({
      statusCode: res.statusCode,
      data: blocks,
      nextPage: hasNextPage ? Number(page) + 1 : null,
    });
  } catch (error) {
    return res.status(STATUS_CODES.SERVER_ERROR).json({
      statusCode: res.statusCode,
      message: error.message,
    });
  }
};

const getBlock = async (req, res) => {
  try {
    const blockName = req.params.blockName;

    const block = await prisma.block.findFirst({
      where: { blockName: String(blockName) },
      include: {
        device: {
          select: {
            room_number: true,
            deviceId: true,
            dev_eui: true,
            block: {
              select: {
                blockName: true,
              }
            },
          },
        },
      },
    });

    if (!block || block.length === 0) {
      return res.status(STATUS_CODES.NOT_FOUND).json({
        statusCode: res.statusCode,
        message: `${blockName} not found on the server`,
      });
    }

    return res.status(STATUS_CODES.OK).json({
      statusCode: res.statusCode,
      data: block,
    });
  } catch (error) {
    return res.status(STATUS_CODES.SERVER_ERROR).json({
      statusCode: res.statusCode,
      message: error.message,
    });
  }
};

const getBlockRecentSensor = async (req, res) => {
  try {
    const blockName = req.params.blockName;

    // Takes the current block and finds the most recent sensor data
    // takes 1, ordered by desc, to ensure always the latest information
    const block = await prisma.block.findFirst({
      where: { blockName: String(blockName) },
      include: {
        device: {
          select: {
            room_number: true,
            deviceId: true,
            dev_eui: true,
            sensorData: {
              select: {
                co2: true,
                temperature: true,
                createdAt: true,
              },
              take: 1,
              orderBy: {
                createdAt: 'desc',
              },
            },
          },
        },
      },
    });

    if (!block || block.length === 0) {
      return res.status(STATUS_CODES.NOT_FOUND).json({
        statusCode: res.statusCode,
        message: `${blockName} not found on the server`,
      });
    }

    return res.status(STATUS_CODES.OK).json({
      statusCode: res.statusCode,
      data: block,
    });
  } catch (error) {
    return res.status(STATUS_CODES.SERVER_ERROR).json({
      statusCode: res.statusCode,
      message: error.message,
    });
  }
};

const createBlock = async (req, res) => {
  try {
    const blockName = req.body.blockName;

    if (!blockName || blockName.length === 0) {
      return res.status(STATUS_CODES.BAD_REQUEST).json({
        statusCode: res.statusCode,
        message: 'Block name is required',
      });
    }

    if (blockName === ' ' || blockName.startsWith(' ')) {
      return res.status(STATUS_CODES.BAD_REQUEST).json({
        statusCode: res.statusCode,
        message: 'Block name cannot start with a space',
      });
    }

    
    // Function allows for the block name to be in the format [Uppercase Letter]-Block
    // Disabled as requested by Martin

    // if (!blockNamePattern.test(blockName)) {
    //   return res.status(STATUS_CODES.BAD_REQUEST).json({
    //     statusCode: res.statusCode,
    //     message: 'Block name must be in the format [Uppercase Letter]-Block',
    //   });
    // }

    const existingBlock = await prisma.block.findFirst({
      where: { blockName: String(blockName) },
    });

    if (existingBlock) {
      return res.status(STATUS_CODES.CONFLICT).json({
        statusCode: res.statusCode,
        message: `${blockName} already exists`,
      });
    }

    const blockCreate = await prisma.block.create({
      data: {
        blockName,
      },
    });

    return res.status(STATUS_CODES.CREATED).json({
      statusCode: res.statusCode,
      message: `${blockName} created successfully`,
      data: blockCreate,
    });
  } catch (error) {
    return res.status(STATUS_CODES.SERVER_ERROR).json({
      statusCode: res.statusCode,
      message: error.message,
    });
  }
};

const updateBlock = async (req, res) => {
  try {
    const blockName = req.params.blockName;
    const newBlockName = req.body.blockName;

    if (!newBlockName || newBlockName.length === 0) {
      return res.status(STATUS_CODES.BAD_REQUEST).json({
        statusCode: res.statusCode,
        message: 'New block name is required',
      });
    }

    if (newBlockName === ' ' || newBlockName.startsWith(' ')) {
      return res.status(STATUS_CODES.BAD_REQUEST).json({
        statusCode: res.statusCode,
        message: 'Block name cannot start with a space',
      });
    }

    // Function allows for the block name to be in the format [Uppercase Letter]-Block
    // Disabled as requested by Martin

    // if (!blockNamePattern.test(newBlockName)) {
    //   return res.status(STATUS_CODES.BAD_REQUEST).json({
    //     statusCode: res.statusCode,
    //     message: 'Block name must be in the format [Uppercase Letter]-block',
    //   });
    // }

    const getBlock = await prisma.block.findFirst({
      where: { blockName: String(blockName) },
    });

    if (!getBlock || getBlock.length === 0) {
      return res.status(STATUS_CODES.NOT_FOUND).json({
        statusCode: res.statusCode,
        message: `${blockName} not found on the server`,
      });
    }

    const findExistingBlockName = await prisma.block.findUnique({
      where: { blockName: String(newBlockName) },
    });

    if (findExistingBlockName) {
      return res.status(STATUS_CODES.CONFLICT).json({
        statusCode: res.statusCode,
        message: `${newBlockName} already exists in the database`,
      });
    }

    const updatedBlockName = await prisma.block.update({
      where: { blockName: String(blockName) },
      data: { blockName: newBlockName },
    });

    return res.status(STATUS_CODES.OK).json({
      statusCode: res.statusCode,
      message: `Block name updated successfully`,
      data: updatedBlockName,
    });
  } catch (error) {
    return res.status(STATUS_CODES.SERVER_ERROR).json({
      statusCode: res.statusCode,
      message: error.message,
    });
  }
};

const deleteBlock = async (req, res) => {
  try {
    const { blockId } = req.body;

    if (!blockId || blockId.length === 0) {
      return res.status(STATUS_CODES.BAD_REQUEST).json({
        statusCode: res.statusCode,
        message: 'Block ID is required',
      });
    };

    const findBlock = await prisma.block.findUnique({
      where: { id: Number(blockId)},
    });

    if (!findBlock || findBlock.length === 0) {
      return res.status(STATUS_CODES.NOT_FOUND).json({
        statusCode: res.statusCode,
        message: `Block ID ${blockId} not found on the server`,
      });
    };

    const deleteBlock = await prisma.block.delete({
      where: { id: Number(blockId) },
    });

    return res.status(STATUS_CODES.OK).json({
      statusCode: res.statusCode,
      message: `Block ID ${blockId} deleted successfully`,
      data: deleteBlock,
    });

  } catch (error) {
    return res.status(STATUS_CODES.SERVER_ERROR).json({
      statusCode: res.statusCode,
      message: error.message,
    });
  }
}
export { createBlock, getAllBlocks, getBlock, getBlockRecentSensor, updateBlock, deleteBlock };
