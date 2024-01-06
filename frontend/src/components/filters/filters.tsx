import './filters.css'
import Setting from '../setting/setting'

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
