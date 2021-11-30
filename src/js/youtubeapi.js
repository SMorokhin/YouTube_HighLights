import axios from '@/axios'

/**
 * Return channel data by channel name
 * @returns {Promise<*>}
 */
export async function yGetChannelByVideoId (channelName) {
  const response = await axios.get('/search', {
    params: {
      maxResults: 1,
      q: channelName
    }
  })
  return response.data
}

/**
 * Search channel ID by video ID
 * @param videoId
 * @returns {Promise<void>}
 */
export async function ySearchChannelByVideoId (videoId) {
  const response = await axios.get('/videos', {
    params: {
      part: 'snippet',
      id: videoId
    }
  })
  return response.data
}

/**
 * Get comments for Modal Window in Tiles by videoId
 * @param id
 * @returns {Promise<*>}
 */
export async function yGetModalData (id) {
  const response = await axios.get('/commentThreads', {
    params: {
      part: 'snippet',
      maxResults: 50,
      videoId: id
    }
  })
  return response.data.items
}

/**
 * Get channel main information by channel ID
 * @param routeParamId
 * @returns {Promise<*>}
 */
export async function yGetChannelInfo (routeParamId) {
  const response = await axios.get('/channels', {
    params: {
      part: 'snippet',
      id: routeParamId
    }
  })
  return response.data.items[0].snippet
}

/**
 * Get list of videos from channel by channel ID
 * @param routeParamId
 * @returns {Promise<*>}
 */
export async function yGetListVideos (routeParamId) {
  const response = await axios.get('/search', {
    params: {
      part: 'snippet',
      channelId: routeParamId,
      maxResults: 900
    }
  })
  return response.data.items
}
