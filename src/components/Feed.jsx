import axios from 'axios'
import React, { useEffect } from 'react'
import { BaseURL } from '../utils/Constants'
import { addfeed } from '../Store/Slices/Feedslice'
import { useDispatch, useSelector } from 'react-redux'
import Card from './Card'
const Feed = () => {
  const dispatch = useDispatch();
  const feed = useSelector((state) => state.Feeds);
  const feeds = async () => {
    try {
      const res = await axios.get(BaseURL + "/feed", { withCredentials: true });
        dispatch(addfeed(res.data))
    } catch (err) {
      console.log(err)
    }
  }
  useEffect(() => {
    feeds()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (

    <div>
      {feed && feed.map((feed) => <Card key={feed._id} feed={feed} />)}
    </div>
  )
}

export default Feed
