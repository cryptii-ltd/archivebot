import '@/app/satoshi.css'
import Brand from '@/app/components/Brand'
import NavLink from '@/app/components/Nav/NavLink'

/**
 * The footer of the application.
 *
 * This component renders the footer of the application, including a
 * link to the Discord server, FAQs, privacy policy, terms of use, and
 * contact email.
 *
 * @returns {JSX.Element} The footer element.
 */
export default function Footer() {
  return (
    <footer className='bg-black-900 text-textSecondary border-t border-grey-500 flex flex-col items-start justify-start px-6 py-20 gap-20'>
      <div className='flex flex-row flex-wrap items-start justify-start gap-20 max-w-[100rem] m-auto w-full'>
        <Brand />

        <div
          className='flex flex-wrap items-start justify-start gap-20'
          style={{ gridTemplateColumns: 'repeat(auto-fill,minmax(140px,1fr))' }}
        >
          <div className='grid items-start justify-start gap-4'>
            <h4 className='text-text'>Resources</h4>
            <div className='grid items-start justify-start gap-2'>
              <NavLink
                href={process.env.server_invite_link as string}
                target='_blank'
              >
                Join our Discord server
              </NavLink>
              <NavLink href='/faq'>FAQs</NavLink>
            </div>
          </div>

          <div className='grid items-start justify-start gap-4'>
            <h4 className='text-text'>Legal</h4>
            <div className='grid items-start justify-start gap-2'>
              <NavLink href='/privacy-policy'>Privacy Policy</NavLink>
              <NavLink href='/terms-of-use'>Terms of Use</NavLink>
            </div>
          </div>

          <div className='grid items-start justify-start gap-4'>
            <h4 className='text-text'>Contact</h4>
            <div className='grid items-start justify-start gap-2'>
              <NavLink href='mailto:hi@cryptii.co.uk'>Hire Us</NavLink>
            </div>
          </div>
        </div>
      </div>

      <span className='text-xs max-w-[100rem] m-auto w-full'>
        © 2024 <span style={{ fontFamily: 'Satoshi' }}>CRYPTII</span> LTD
      </span>
    </footer>
  )
}
