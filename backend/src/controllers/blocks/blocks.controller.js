import { PrismaClient } from '@prisma/client';
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
        message: `Block ${blockName} not found on the server`,
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

    // Check to see blockName matches [Letter]-block pattern
    const blockNamePattern = /^[A-Z]-block$/;

    if (!blockName || blockName.length === 0) {
      return res.status(STATUS_CODES.BAD_REQUEST).json({
        statusCode: res.status,
        message: 'Block name is required',
      });
    }

    if (blockName === ' ' || blockName.startsWith(' ')) {
      return res.status(STATUS_CODES.BAD_REQUEST).json({
        statusCode: res.status,
        message: 'Block name cannot start with a space',
      });
    }

    if (!blockNamePattern.test(blockName)) {
      return res.status(STATUS_CODES.BAD_REQUEST).json({
        statusCode: res.status,
        message: 'Block name must be in the format [Uppercase Letter]-block',
      });
    }

    const existingBlock = await prisma.block.findFirst({
      where: { blockName: String(blockName) },
    });

    if (existingBlock) {
      return res.status(STATUS_CODES.CONFLICT).json({
        statusCode: res.status,
        message: `${blockName} already exists`,
      });
    }

    await prisma.block.create({
      data: {
        blockName,
      },
    });

    return res.status(STATUS_CODES.OK).json({
      statusCode: res.status,
      message: `${blockName} created successfully`,
    });
  } catch (error) {
    return res.status(STATUS_CODES.SERVER_ERROR).json({
      statusCode: res.status,
      message: error.message,
    });
  }
};

export { createBlock, getAllBlocks, getBlock, getBlockRecentSensor };
