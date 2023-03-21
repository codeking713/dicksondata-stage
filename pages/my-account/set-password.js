import {Text} from '@/components/atoms/Inputs'
import LayoutNew from '@/components/common/LayoutNew'
import Form from '@/components/molecules/Form'
import updateUserPassword from '@/functions/wordpress/profile/updateUserPassword'
import {useSession} from 'next-auth/client'
import Router, {useRouter} from 'next/router'

const ResetPassword = () => {
  const [session] = useSession()
  const router = useRouter()

  const updatePassword = async ({newPassword, confirmPassword}) => {
    const {key, login} = router.query
    if (newPassword !== confirmPassword) {
      return alert('Passwords do not match')
    }
    const token = session?.user.accessToken
    const res = await updateUserPassword(token, key, login, newPassword)
    if (res.error) {
      return alert('Something went wrong!')
    }
    Router.push('/my-account/login')
  }

  return (
    <LayoutNew>
      <Form
        // className={styles['login-form']}
        id="forget-form"
        title="Forget Form"
        buttonText="Reset Password"
        onSubmit={updatePassword}
      >
        <Text
          // className={styles.textfield}
          id="newPassword"
          label="New Password*"
          isRequired
          type="password"
        />
        <Text
          // className={styles.textfield}
          id="confirmPassword"
          label="Confirm Password*"
          isRequired
          type="password"
        />
      </Form>
    </LayoutNew>
  )
}

export default ResetPassword
