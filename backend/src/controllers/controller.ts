import { Request, Response } from 'express'
import { supabase } from "../db/supabase"
import { getRandomNumber } from '../utils/randomizer'
const helpers = require('../utils/helpers')

const getImageFromBucket = async (bucketName: string, num: number, req: Request, res: Response) => {
  try {
    const { data } = await supabase.storage
      .from(bucketName)
      .getPublicUrl(`${num}.jpg`);

    if (data) {
      console.log(data.publicUrl);
      return data.publicUrl;
    }

    res.status(404).send('Image not found');
    return null;
  } catch (error) {
    console.error('Unexpected error occurred:', error);
    res.status(500).send('An unexpected error occurred');
    return null;
  }
};

const getImagePair = async (req: Request, res: Response) => {
  try {
    const bucketsize = await helpers.getBucketSize('ai-images');
    const randomNumber = getRandomNumber(bucketsize)
    const aiImageUrl = await getImageFromBucket('ai-images', randomNumber, req, res);
    const realImageUrl = await getImageFromBucket('real-images', randomNumber, req, res);
    if (aiImageUrl && realImageUrl) {
      res.send({ aiImageUrl, realImageUrl });
    } else {
      res.status(500).send('Failed to retrieve one or both images');
    }
  } catch (error) {
    console.error('Unexpected error occurred:', error);
    res.status(500).send('An unexpected error occurred');
  }
};

const populateDB = async (req: Request, res: Response) => {
  try {
    const bucketsize = await helpers.getBucketSize('ai-images');
    if (!bucketsize) {
      return res.status(404).send('Bucket size not found.');
    }

    const { data: existingImages, error: fetchError } = await supabase
      .from('ai-images')
      .select('url');
    
    if (fetchError) {
      console.log('An error occurred while fetching existing data:', fetchError);
      return res.status(500).send('Failed to fetch existing data.');
    }

    const existingImageUrls = existingImages.map((image: { url: string }) => image.url);

    const errors = [];
    for (let i = 1; i <= bucketsize; i++) {
      const newImageUrl = `https://jhjxvhhavsxmgnjbrmbn.supabase.co/storage/v1/object/public/ai-images/${i}.jpg`;

      if (!existingImageUrls.includes(newImageUrl)) {
        const { error: insertError } = await supabase
          .from('ai-images')
          .insert({ url: newImageUrl, score_count: 0 });

        if (insertError) {
          errors.push(`Error inserting image ${i}: ${insertError.message}`);
          console.log('An error occurred while inserting data:', insertError);
        }
      }
    }

    if (errors.length > 0) {
      res.status(500).json({ message: 'Some entries failed to insert.', errors });
    } else {
      res.status(200).send('Database populated with new images.');
    }
  } catch (error) {
    console.log('An unexpected error occurred:', error);
    res.status(500).send('Failed to populate database.');
  }
};

const getLeaderboard = async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase
      .from('ai-images')
      .select('url, score_count')
      .order('score_count', { ascending: false })
      .limit(10)

    if (error) {
      throw error
    }
    if (data[0].score_count === 0) {
      res.status(200).send("Scores are currently 0, no rankings available.")
    } else {
      res.status(200).json(data)
    }
  } catch (error) {
    res.status(500).json({ error })
  }
}

const updateScore = async (req: Request, res: Response) => {
  const { imageUrl } = req.body;

  if (!imageUrl) {
    return res.status(400).json({ error: 'Image URL is required' });
  }

  try {
    let { data, error } = await supabase
      .from('ai-images')
      .select('score_count')
      .eq('url', imageUrl)
      .single();

    if (error) {
      throw error;
    }

    if (!data) {
      return res.status(404).json({ error: 'Image not found' });
    }

    const currentScore = data.score_count;
    const newScore = currentScore + 1;

    const { data: updateData, error: updateError } = await supabase
      .from('ai-images')
      .update({ score_count: newScore })
      .eq('url', imageUrl);

    if (updateError) {
      throw updateError;
    }

    res.status(200).json({ message: 'Score updated successfully', newScore });
  } catch (error) {
    res.status(500).json({ error });
  }
};

module.exports = { 
  getImagePair,
  populateDB,
  getLeaderboard,
  updateScore
}