import Container from '@/components/atoms/Container'
import Icon from '@/components/atoms/Icon'
import PageNotifications from '@/components/molecules/PageNotifications'
import SectionHead from '@/components/molecules/SectionHead'
import ProfileDashboard from '@/components/organisms/ProfileDashboard'
import cn from 'classnames'
import {signOut, useSession} from 'next-auth/client'
import {useRouter} from 'next/router'
import {useEffect, useState} from 'react'
import ProfileAccountDetailsSkeleton from '../ProfileAccountDetails/Skeleton/ProfileAccountDetailsSkeleton'
import ProfileAddresses from '../ProfileAddresses/Skeleton/ProfileAddresses'
import ProfileDashboardSkeleton from '../ProfileDashboard/Skeleton/ProfileDashboardSkeleton'
import ProfileOrderSkeleton from '../ProfileOrder/Skeleton/ProfileOrderSkeleton'
import styles from './UserAccount.module.scss'

/**
 * Render the UserAccount component.
 *
 * @author DAP
 * @param  {object}  props          The UserAccount component propterties.
 * @param  {Element} props.children Any children.
 * @return {Element}                The UserAccount component.
 */
export default function UserAccount({children}) {
  const router = useRouter()
  const [session, loading] = useSession()
  const DASHBOARD = '/my-account'
  const ORDER = '/my-account/orders'
  const ADDRESSES = '/my-account/addresses'
  const ACCOUNT_DETAILS = '/my-account/account-details'
  const [selectedTab, setSelectedTab] = useState(router?.pathname)
  const [orderLoading, setOrderLoading] = useState(false)
  const [addressLoading, setAddressLoading] = useState(false)
  const [accountDetailsLoading, setAccountDetailsLoading] = useState(false)
  const [dashboardLoading, setDashboardLoading] = useState(false)

  useEffect(() => {
    if (!session?.user.accessToken && !loading) {
      router.push('/my-account')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session])

  const loadingSection = () => {
    return orderLoading ||
      addressLoading ||
      accountDetailsLoading ||
      dashboardLoading
      ? true
      : false
  }

  const changeTab = (selected) => {
    if (loadingSection()) return

    if (session?.user.accessToken) {
      //If we can set the skeleton loader, prior to the routing
      if (selectedTab !== selected) {
        if (selected === ORDER) {
          setOrderLoading(true)
          setAddressLoading(false)
          setAccountDetailsLoading(false)
          setDashboardLoading(false)
        } else if (selected === ADDRESSES) {
          setOrderLoading(false)
          setAddressLoading(true)
          setAccountDetailsLoading(false)
          setDashboardLoading(false)
        } else if (selected === ACCOUNT_DETAILS) {
          setOrderLoading(false)
          setAddressLoading(false)
          setAccountDetailsLoading(true)
          setDashboardLoading(false)
        } else if (selected === DASHBOARD) {
          setOrderLoading(false)
          setAddressLoading(false)
          setAccountDetailsLoading(false)
          setDashboardLoading(true)
        }
      }

      setSelectedTab(selected)
      router.push(selected)
    }
  }

  useEffect(() => {
    if (selectedTab === router?.pathname) {
      setOrderLoading(false)
      setAddressLoading(false)
      setAccountDetailsLoading(false)
      setDashboardLoading(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router?.asPath])

  if (!session)
    return (
      <Container>
        {!loading && (
          <PageNotifications message="Access Denied" type="ERROR" open={true} />
        )}
      </Container>
    )

  return (
    <Container>
      <SectionHead
        className={styles['container__sectionhead--margin']}
        alignment="left"
        heading="My Account"
      />
      <Container className={styles.container}>
        <div className={styles.container__tabs}>
          <div>
            <span onClick={() => changeTab(DASHBOARD)}>
              <p
                className={cn(
                  styles.tab,
                  selectedTab == DASHBOARD && styles['tab--active']
                )}
              >
                Dashboard
                <Icon title="chevron" style="fill" icon="chevron" />
              </p>
            </span>
            <span onClick={() => changeTab(ORDER)}>
              <p
                className={cn(
                  styles.tab,
                  selectedTab == ORDER && styles['tab--active']
                )}
              >
                Orders
                <Icon title="chevron" style="fill" icon="chevron" />
              </p>
            </span>
            <span onClick={() => changeTab(ADDRESSES)}>
              <p
                className={cn(
                  styles.tab,
                  selectedTab == ADDRESSES && styles['tab--active']
                )}
              >
                Addresses
                <Icon title="chevron" style="fill" icon="chevron" />
              </p>
            </span>
            <span onClick={() => changeTab(ACCOUNT_DETAILS)}>
              <p
                className={cn(
                  styles.tab,
                  selectedTab == ACCOUNT_DETAILS && styles['tab--active']
                )}
              >
                Account details
                <Icon title="chevron" style="fill" icon="chevron" />
              </p>
            </span>
            <span
              onClick={(e) => {
                e.preventDefault()
                signOut({callbackUrl: '/my-account'})
              }}
            >
              <p
                className={cn(
                  styles.tab,
                  selectedTab == 'Logout' && styles['tab--active']
                )}
              >
                Logout
                <Icon title="chevron" style="fill" icon="chevron" />
              </p>
            </span>
          </div>
        </div>
        <div className={styles.container__display}>
          {orderLoading && <ProfileOrderSkeleton />}
          {addressLoading && <ProfileAddresses />}
          {accountDetailsLoading && <ProfileAccountDetailsSkeleton />}
          {dashboardLoading && <ProfileDashboardSkeleton />}

          {!orderLoading &&
          !addressLoading &&
          !accountDetailsLoading &&
          !dashboardLoading ? (
            selectedTab === DASHBOARD ? (
              <ProfileDashboard changeTab={changeTab} />
            ) : (
              children
            )
          ) : (
            ''
          )}
        </div>
      </Container>
    </Container>
  )
}
