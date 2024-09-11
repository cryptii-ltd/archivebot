import Link from 'next/link'
import Button from '@/app/components/Button'
import Showcase from '@/app/components/Showcase'

import { FaDiscord } from 'react-icons/fa6'

/**
 * @function Hero
 * @description The main hero section of the site.
 * @returns {JSX.Element} The JSX element representing the hero section.
 * @example
 * <Hero />
 */
export default async function Hero() {
  return (
    <section
      style={{ height: 'calc(100dvh - 96px)' }}
      className='bg-sectionDark text-sectionDarkText flex flex-col content-top justify-start gap-20 pt-[7.5rem] px-[1rem] relative overflow-hidden'
    >
      <div className='flex flex-col place-items-center gap-8'>
        <h1
          className='text-center max-w-[20ch]'
          style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)' }}
        >
          The Ultimate Discord Archiving Solution
        </h1>
        <span className='text-center text-sectionDarkTextSecondary max-w-[40ch]'>
          Quickly archive, organize, and securely share your favourite conversations
        </span>

        <div
          className='flex gap-4 grid-flow-col items-center justify-center'
          style={{ flexWrap: 'wrap' }}
        >
          <Link
            href={process.env.bot_invite_link as string}
            target='_blank'
          >
            <Button>
              <FaDiscord size={24} />
              Get Started
            </Button>
          </Link>
          <Link
            href='/archives'
            prefetch={false}
          >
            <Button type='secondary'>View Archives</Button>
          </Link>
        </div>
      </div>

      <Showcase />
    </section>
  )
}
