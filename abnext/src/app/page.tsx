import Hero from '@/app/components/Hero'
import Section from '@/app/components/Section'
import PageBadge from '@/app/components/PageBadge'
import Plan from '@/app/components/Plan'

import { TbDiamondFilled } from 'react-icons/tb'
import { TbCards } from 'react-icons/tb'
import { RiSlashCommands2 } from 'react-icons/ri'
import { TbClick } from 'react-icons/tb'
import { HiMiniSparkles } from 'react-icons/hi2'
import { LuTextCursorInput } from 'react-icons/lu'
import { PiPasswordDuotone } from 'react-icons/pi'
/**
 * Home page of the app.
 *
 * This is the main entry point for users to explore the app.
 *
 * @returns The page component.
 */
export default async function Home() {
  return (
    <main className='flex flex-col items-top justify-center mt-[96px]'>
      <Hero />

      <Section
        id='features'
        className='border-t border-glassSurfaceHighlightBorder'
        titleBadge={
          <PageBadge>
            <TbDiamondFilled size={24} />
            Features
          </PageBadge>
        }
        subtitle='What makes ArchiveBot different?'
      >
        <div
          className='grid items-center justify-start gap-20'
          style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}
        >
          <div>
            <div className='flex items-center justify-start gap-2'>
              <RiSlashCommands2 size={24} />
              <span className='text-2xl font-medium'>Simple Archiving</span>
            </div>
            <p>Archive your discord chats with just a slash.</p>
          </div>

          <div>
            <div className='flex items-center justify-start gap-2'>
              <TbClick size={24} />
              <span className='text-2xl font-medium'>Instant Access</span>
            </div>
            <p>Sign in with Discord to view and manage all your archives in one spot.</p>
          </div>
        </div>

        <div
          className='grid items-center justify-between gap-20'
          style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}
        >
          <div>
            <div className='flex items-center justify-start gap-2'>
              <HiMiniSparkles size={24} />
              <span className='text-2xl font-medium'>Sleek Interface</span>
            </div>
            <p>Browse your saved conversations in a clean and easy-to-use interface.</p>
          </div>

          <div>
            <div className='flex items-center justify-start gap-2'>
              <LuTextCursorInput size={24} />
              <span className='text-2xl font-medium'>Organise with ease</span>
            </div>
            <p>Rename, delete, and keep your archives neat and tidy.</p>
          </div>
        </div>

        <div>
          <div className='flex items-center justify-start gap-2'>
            <PiPasswordDuotone size={24} />
            <span className='text-2xl font-medium'>Share Securely</span>
          </div>
          <p>Want to share? You can add password protection for extra security *.</p>
        </div>

        <span className='text-xs text-sectionDarkTextSecondary'>
          * you must be subscribed to the Pro or Max plan to use this feature
        </span>
      </Section>

      <Section
        id='plans'
        titleBadge={
          <PageBadge>
            <TbCards size={24} />
            Plans
          </PageBadge>
        }
        subtitle='Choose a plan that fits you'
      >
        <div>
          <div className='flex flex-row items-center justify-start gap-4 py-4 -mx-6 w-[calc(100% + 24px)] px-6 overflow-x-auto snap-mandatory snap-x'>
            <Plan
              type='basic'
              price={0}
              description='Essential archiving for a few important conversations'
              limits={['3 Archives per server', '20,000 Message limit']}
            />

            <Plan
              type='plus'
              price={1}
              description='More storage and dedicated support'
              limits={['5 Archives per server', '40,000 Message limit']}
              features={['Archive sharing']}
              buttonText='Upgrade to Plus'
            />

            <Plan
              type='pro'
              price={2}
              description='Extensive archiving with priority support'
              limits={['5 Archives per server', '40,000 Message limit']}
              features={['Private support channel', 'Custom server emojis', 'Password protected sharing']}
              inheritsFeaturesFrom='plus'
              bestValue
              buttonText='Upgrade to Pro'
            />

            <Plan
              type='max'
              price={5}
              description='Unlimited archiving and full customization'
              limits={['Unlimited Archives', 'No Message limit']}
              features={[
                'Archive your entire Discord server with one command',
                'Vote on feature requests',
                'Legacy archive upgrades',
              ]}
              inheritsFeaturesFrom='pro'
              buttonText='Upgrade to Max'
            />
          </div>
        </div>
      </Section>
    </main>
  )
}
