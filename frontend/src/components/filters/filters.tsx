import './filters.css'
import Setting from '../setting/setting'

/**
 * Filters Component - Displays input field and settings for message filters.
 * @returns {JSX.Element} Filters component.
 */
export default function Filters() {
  return (
    <div className='filters'>
      <input type='text' placeholder='Username' />
      <Setting name={'Images'} />
      <Setting name={'Videos'} />
      <Setting name={'Links'} />
    </div>
  )
}
