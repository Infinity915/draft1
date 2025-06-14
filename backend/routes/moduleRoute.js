import express from 'express';
import { getLevelModel } from '../utils/getLevelModel.js';

const router = express.Router();

/**
 * GET /api/levels/:level/topics
 */
router.get('/:level/topics', async (req, res) => {
  const { level } = req.params;

  try {
    const LevelModel = getLevelModel(level);
    if (!LevelModel) {
      return res.status(400).json({ message: `Invalid level: ${level}` });
    }

    const topics = await LevelModel.find({}, { customId: 1, title: 1, _id: 0 }).lean();

    if (!topics.length) {
      return res.status(404).json({ message: `No topics found for level-${level}` });
    }

    res.json(topics);
  } catch (err) {
    console.error(`❌ Error fetching topics for level-${level}:`, err);
    res.status(500).json({ message: 'Server Error' });
  }
});

/**
 * GET /api/levels/:level/topics/:customId
 */
router.get('/:level/topics/:customId', async (req, res) => {
  const { level, customId } = req.params;

  try {
    const LevelModel = getLevelModel(level);
    if (!LevelModel) {
      return res.status(400).json({ message: `Invalid level: ${level}` });
    }

    const topic = await LevelModel.findOne({ customId }).lean();

    if (!topic) {
      return res.status(404).json({ message: `Topic ${customId} not found in level-${level}` });
    }

    res.json(topic);
  } catch (err) {
    console.error(`❌ Error fetching topic ${customId} from level-${level}:`, err);
    res.status(500).json({ message: 'Server Error' });
  }
});

export default router;
