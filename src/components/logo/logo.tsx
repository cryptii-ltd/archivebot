import Brand from '../../assets/Logo.svg'
import BrandCollapsed from '../../assets/LogoCryptii.svg'

interface LogoProps {
  isCollapsed?: boolean
}

export default function Logo(props: LogoProps) {
  return <img src={!props.isCollapsed ? Brand : BrandCollapsed} />
}
