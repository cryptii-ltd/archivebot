import './filters.css'
import Setting from '../setting/setting'

interface FiltersProps {
  searchAuthor: string
  setSearchAuthor: React.Dispatch<React.SetStateAction<string>>
}

/**
 * Filters Component - Displays input field and settings for message filters.
 * @returns {JSX.Element} Filters component.
 */
export default function Filters(props: FiltersProps) {
  return (
    <div className='filters'>
      <input type='text' placeholder='Username' onChange={(e) => props.setSearchAuthor(e.target.value)} value={props.searchAuthor} />
      <Setting name={'Images'} />
      <Setting name={'Videos'} />
      <Setting name={'Links'} />
    </div>
  )
}
