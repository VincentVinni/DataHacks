import { supabase } from "../db/supabase"

const getBucketSize = async (bucketId: string) => {
  try {
    const { data, error } = await supabase
      .storage
      .from(bucketId)
      .list()
    if (data) {
      return data.length-1
    }
  } catch (error) {
    console.log("An expected error occurred")
    return null
  }
}

module.exports = {
  getBucketSize
}