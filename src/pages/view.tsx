import './view.css'
import Sidebar from '../components/sidebar/sidebar'
import Message from '../components/message/message'

export default function View() {
  return (
    <>
      <Sidebar />
      <div className='messages'>
        <Message author={'Rory'} content={['Hello, world!']} date={'Today at 16:28'} avatarHash={'https://cdn.discordapp.com/avatars/316965023404785674/9fca0da230cf18401040045691831d00'} />
        <Message author={'Mateusz'} content={['Right back at you!', 'How are you?']} date={'Today at 16:30'} avatarHash={'https://cdn.discordapp.com/avatars/173785604692246528/a_40806bba335ae784f11a98486b110e43.gif?size=128'} />
      </div>
    </>
  )
}
