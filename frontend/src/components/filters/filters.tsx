import './filters.css'
import Setting from '../setting/setting'

// TODO: Simplify - we already have a SearchFilter type that can be used here.
interface FiltersProps {
  searchAuthor: string
  setSearchAuthor: React.Dispatch<React.SetStateAction<string>>
}

/**
 * Filters Component - Displays input field and settings for message filters.
 * @params {FiltersProps} props
 * @returns {JSX.Element} Filters component.
 */
export default function Filters(props: FiltersProps): JSX.Element {
  return (
    <div className='filters'>
      <input type='text' placeholder='Username' onChange={(e) => props.setSearchAuthor(e.target.value)} value={props.searchAuthor} />
      <Setting name={'Images'} />
      <Setting name={'Videos'} />
      <Setting name={'Links'} />
    </div>
  )
}
