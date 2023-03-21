import Container from '@/components/atoms/Container'
import Heading from '@/components/atoms/Heading'
import LayoutNew from '@/components/common/LayoutNew'
import ProfileBilling from '@/components/organisms/ProfileBilling'
import ProfileDashboard from '@/components/organisms/ProfileDashboard'
import ProfileView from '@/components/organisms/ProfileView'
import {getLangCode} from '@/functions/checkout/commonUtil'
import getPostTypeStaticProps from '@/functions/wordpress/postTypes/getPostTypeStaticProps'
import cn from 'classnames'
import {useSession} from 'next-auth/client'
import {useRouter} from 'next/router'
import React, {useEffect, useState} from 'react'
import styles from '../../styles/profile.module.scss'

/**
 * Render the Profile component.
 *
 * @author DAP
 * @return {Element} The Profile component.
 */
export default function Profile() {
  const DASHBOARD = 'DASHBOARD'
  const PROFILE = 'profile'
  const BILLING = 'billing'

  const [selectedTab, setSelectedTab] = useState(DASHBOARD)
  const [session, loading] = useSession()
  const router = useRouter()

  // @TODO - Possibly create a model for User.
  let user = {
    firstName: '',
    lastName: '',
    email: '',
    username: ''
  }

  useEffect(() => {
    if (!(session?.user.email || loading)) {
      router.push('/my-account/login')
    }
  })
  // Prevent unauth flash
  if (!session) {
    return null
  }

  if (session?.user) {
    user = session.user
  }

  // Combine first, last names into full name to avoid displaying `null` on FE.
  const fullName = []
  user.firstName && fullName.push(user.firstName)
  user.lastName && fullName.push(user.lastName)

  const changeTab = (selected) => {
    setSelectedTab(selected)
  }

  const displayProfileView = () => {
    switch (selectedTab) {
      case PROFILE:
        return <ProfileView />
      case DASHBOARD:
        return <ProfileDashboard />
      case BILLING:
        return <ProfileBilling />
    }
  }

  return (
    <LayoutNew>
      <section className={styles.main}>
        <Heading tag="h3" className={styles.header}>
          Welcome{user.firstName && `, ${user.firstName}`}!
        </Heading>
        <div className={styles.tabsGroup}>
          <span onClick={() => changeTab(DASHBOARD)}>
            <Heading
              tag="h4"
              className={cn(
                styles.tab,
                selectedTab == DASHBOARD && styles.active
              )}
            >
              My Dickson
            </Heading>
          </span>
          <span onClick={() => changeTab(PROFILE)}>
            <Heading
              tag="h4"
              className={cn(
                styles.tab,
                selectedTab == PROFILE && styles.active
              )}
            >
              Profile
            </Heading>
          </span>
          <span onClick={() => changeTab(BILLING)}>
            <Heading
              tag="h4"
              className={cn(
                styles.tab,
                selectedTab == BILLING && styles.active
              )}
            >
              Billing
            </Heading>
          </span>
        </div>
      </section>
      <Container>
        {loading ? <p>Loading</p> : <>{displayProfileView()}</>}
      </Container>
    </LayoutNew>
  )
}

/**
 * Get post static props.
 *
 * @author DAP
 * @param  {object} context        Context for current post.
 * @param  {string} context.locale Locale
 * @return {object}                Post props.
 */
export async function getStaticProps({locale}) {
  return await getPostTypeStaticProps(
    null,
    'profile',
    false,
    null,
    getLangCode(locale)
  )
}
