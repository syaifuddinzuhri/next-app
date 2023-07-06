"use client"
import ListPage from '@/components/my-drive/ListPage'
import { getUidUrl } from '@/utils/GlobalFunction'
import { useEffect, useState } from 'react'

const Blank = () => {
  const [uid, setUid] = useState<any>('')
  useEffect(() => {
    setUid(getUidUrl())
  }, [])

  return (
    <ListPage uid={uid} />
  )
}

export default Blank