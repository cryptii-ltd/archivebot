import './filterOverlay.css'
import Setting from '../setting/setting'

export default function FilterOverlay() {
  return (
    <div className='filterOverlay'>
      <Setting name={'Images'} />
      <Setting name={'Videos'} />
      <Setting name={'Links'} />
    </div>
  )
}
