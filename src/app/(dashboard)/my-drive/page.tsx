"use client"
import ListPage from '@/components/my-drive/ListPage'
import { MAIN_PATH } from '@/constant/global'
import { useState } from 'react'

const Blank = () => {
  const [uid, setUid] = useState(MAIN_PATH)

  return (
    <ListPage uid={uid} />
  )
}

export default Blank