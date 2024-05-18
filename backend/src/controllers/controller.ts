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

// const getAiImage = async (num: number, req: Request, res: Response) => {
//   const imageUrl = await getImageFromBucket('ai-images', num, req, res);
//   if (imageUrl) {
//     res.send(imageUrl);
//   }
// };

// const getRealImage = async (num: number, req: Request, res: Response) => {
//   const imageUrl = await getImageFromBucket('real-images', num, req, res);
//   if (imageUrl) {
//     res.send(imageUrl);
//   }
// };

module.exports = { 
  getImageFromBucket,
  getImagePair
}