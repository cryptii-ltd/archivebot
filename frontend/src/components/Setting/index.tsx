import style from './index.module.css'
import Toggle from '../Toggle'

interface SettingProps {
  name: string
  isToggled: boolean
  onToggle: () => void
}

/**
 * Setting Component - Renders a toggle with a label
 * @param {SettingProps} props
 * @returns {JSX.Element} Setting Component
 */
export default function Setting(props: SettingProps): JSX.Element {
  return (
    <span className={style.setting}>
      <label>{props.name}</label>
      <Toggle
        isToggled={props.isToggled}
        onToggle={props.onToggle}
      />
    </span>
  )
}
