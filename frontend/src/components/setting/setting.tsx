import './setting.css'
import Toggle from '../toggle/toggle'

interface SettingProps {
  name: string
  isToggled?: boolean
}

export default function Setting(props: SettingProps) {
  return (
    <span className='setting'>
      <label>{props.name}</label>
      <Toggle isToggled={props.isToggled ?? false} />
    </span>
  )
}
