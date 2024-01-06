import './auth.css'
import Logo from '../../components/logo/logo'

export default function Auth() {
  return (
    <div className='auth'>
      <div>
        <div className='logo'>
          <Logo />
        </div>
        <p>To view and decrypt your archive, you’ll need your passphrase</p>
        <input type='text' placeholder='Passphrase' />
      </div>

      <span className='copyright'>© 2024 CRYPTII LTD | All Rights Reserved</span>
    </div>
  )
}
