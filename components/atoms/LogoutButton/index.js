import {signOut} from 'next-auth/client'
import {IconLogout} from '@/components/icons/logout'
import css from './logoutbutton.module.scss'

const Logout = () => {
  return (
    <button className={css.signout} onClick={signOut}>
      <IconLogout />
    </button>
  )
}
export default Logout
