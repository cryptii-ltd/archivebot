import style from './ProfilePicture.module.css'
import { IconBrandDiscordFilled } from '@tabler/icons-react'

import { useEffect, useState } from 'react'
import axios from 'axios'

interface ProfilePictureProps {
  author: string
  authorID: string
  avatarHash?: string
}

/**
 * ProfilePicture Component - Displays the profile picture of the Discord user.
 * @param {ProfilePictureProps} props - The properties for the ProfilePicture component.
 * @returns {JSX.Element} ProfilePicture component.
 */
export default function ProfilePicture(props: ProfilePictureProps): JSX.Element {
  const [avatarURL, setAvatarURL] = useState<string | null>(null)

  useEffect(() => {
    // Fetch the avatar URL if avatarHash is available
    if (!props.avatarHash) return

    const url: string = `https://cdn.discordapp.com/avatars/${props.authorID}/${props.avatarHash}`

    // Check if the avatar URL is ✨ accessible ✨
    axios.head(url).then(
      () => setAvatarURL(url),
      () => setAvatarURL(null)
    )
  }, [props.avatarHash, props.authorID])

  return (
    <span className={style.profilePicture}>
      {/* Conditional render based on avatarURL availability */}
      {avatarURL ? (
        <img
          alt={`${props.author}'s profile picture`}
          src={avatarURL}
        />
      ) : (
        <IconBrandDiscordFilled />
      )}
    </span>
  )
}
