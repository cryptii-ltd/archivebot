import './profilePicture.css'
import { IconUserHexagon } from '@tabler/icons-react'

import { useEffect, useState } from 'react'
import axios from 'axios'

interface ProfilePictureProps {
  author: string
  authorID: string
  avatarHash?: string
}

export default function ProfilePicture(props: ProfilePictureProps) {
  const [avatarURL, setAvatarURL] = useState<string | null>(null)

  useEffect(() => {
    if (!props.avatarHash) return

    const url: string = `https://cdn.discordapp.com/avatars/${props.authorID}/${props.avatarHash}`

    axios.head(url).then(
      () => setAvatarURL(url),
      () => setAvatarURL(null)
    )
  }, [props.avatarHash, props.authorID])

  return <span className='profile-picture'>{avatarURL ? <img alt={`${props.author}'s profile picture`} src={avatarURL} /> : <IconUserHexagon />}</span>
}
