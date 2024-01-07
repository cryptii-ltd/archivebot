import './logo.css'
import Brand from '../../assets/Logo.svg'
import BrandCollapsed from '../../assets/LogoCryptii.svg'

interface LogoProps {
  isCollapsed?: boolean
}

/**
 * Logo Component - Displays the logo for the CRYPTII Archive Bot.
 * @param {LogoProps} props - The properties for the Logo component.
 * @returns {JSX.Element} Logo component.
 */
export default function Logo(props: LogoProps) {
  return <img className='brand' alt='CRYPTII Archive Bot Logo' src={!props.isCollapsed ? Brand : BrandCollapsed} />
}
