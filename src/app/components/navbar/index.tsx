'use client'

import React from 'react'
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from '@nextui-org/navbar'
import {useRouter} from 'next/navigation'
import Image from 'next/image'
import { ToastContainer } from 'react-toastify'
import {Avatar, Button, Divider, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, NavbarItem, useDisclosure} from '@nextui-org/react'
import SignInModal from '@/app/components/signin-modal'
import SignUpModal from '@/app/components/signup-modal'
import SelectPackageModal from '@/app/components/select-package-modal'
import ConfirmCodeModal from '@/app/components/confirm-code-modal'
import { CognitoIdentityProviderClient, GetUserCommand } from '@aws-sdk/client-cognito-identity-provider'
import {Link} from '@nextui-org/link'
import {useAppStore} from '@/app/store'
import {ModalType} from '@/app/types'
import 'react-toastify/dist/ReactToastify.css'
import styles from './style.module.css'

export default function App() {
  const router = useRouter()
  const {isOpen, onOpen, onOpenChange} = useDisclosure()
  const {toggleModal, modal, user, setUser} = useAppStore()

  React.useEffect(() => {
    if (modal !== null) {
      onOpen()
    }
  }, [modal])

  React.useEffect(() => {
    const fetchUserInfo = async (token: string) => {
      try {
        const cognitoClient = new CognitoIdentityProviderClient({region: 'us-east-1'})
        const parsedToken = JSON.parse(token)
        const input = {AccessToken: parsedToken.AccessToken};
        const command = new GetUserCommand(input);
        const data = await cognitoClient.send(command);

        const userAttributes = data.UserAttributes!.reduce((acc, prev) => {
          if (prev.Name === 'given_name') {
            acc.firstName = prev.Value!
          } else if (prev.Name === 'family_name') {
            acc.lastName = prev.Value!
          } else if (prev.Name === 'phone_number') {
            acc.phoneNumber = prev.Value!
          }
          return acc
        }, {firstName: '', lastName: '', phoneNumber: ''})

        setUser({
          id: data.Username,
          ...userAttributes
        })
      } catch (e) {
        localStorage.removeItem('zeal_session')
      }
    }

    const token = localStorage.getItem('zeal_session')
    if (token) {
      fetchUserInfo(token)
    }
  }, [])

  console.log(user)

  const handleSignOut = async () => {
    try {
      const response = await fetch(`/api/sign-out`, {
        method: 'POST',
        // body: JSON.stringify(newValues),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      })
      if (response.ok) {
        localStorage.removeItem('zeal_session')
        router.push('/login')
        setUser(null)
        // sessionStorage.setItem('zeal_temp_phone', values.phoneNumber)
      }
    } catch(e) {
      console.log(e)
    } finally {

    }
  }

  return (
    <Navbar disableAnimation isBordered className={styles.navbarContainer} maxWidth='full'>
      <NavbarBrand>
        <Link href="/">
          <Image
            src="/logo.png"
            width={200}
            height={21}
            alt="Zeal Studio Logo"
          />
        </Link>
      </NavbarBrand>
      <NavbarContent className="hidden lg:flex gap-8" justify="end">
        <NavbarItem>
          <Link style={{ color: 'white' }} className='uppercase font-extralight' href="https://zealstudio.mx">
            Home
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link style={{ color: 'white' }} className='uppercase font-extralight' href="/">
            Book
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link style={{ color: 'white' }} className='uppercase font-extralight' href="https://zealstudio.mx/home/#about">
            Us
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link style={{ color: 'white' }} className='uppercase font-extralight' href="/shop" >
            Shop
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link style={{ color: 'white' }} className='uppercase font-extralight' href="https://zealstudio.mx/home/#clients" >
            Location
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link style={{ color: 'white' }} className='uppercase font-extralight' href="https://zealstudio.mx/home/#testimonials" >
            Sacred Movement
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link style={{ color: 'white' }} className='uppercase font-extralight' href="https://zealstudio.mx/home/#contact" >
            Contact
          </Link>
        </NavbarItem>
        {user ? (
          <Dropdown placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                style={{ backgroundColor: 'white' }}
                name={user.firstName.substring(0, 1) + user.lastName.substring(0, 1)}
                size="sm"
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile">
                <Link color='foreground' href='/profile'>My Profile</Link>
              </DropdownItem>
              <DropdownItem key="logout" onClick={() => handleSignOut()}>
                Log Out
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        ) : (
          <NavbarItem>
            <Link style={{ color: 'black', }} className='bg-white text-black py-2.5 px-5 uppercase rounded-2xl text-sm' href="/login" >
            Log In
            </Link>
          </NavbarItem>
        )}
      </NavbarContent>
      <NavbarContent className='lg:hidden' justify="end">
        <NavbarMenuToggle className={styles.navbarMenuToggle}/>
      </NavbarContent>
      <NavbarMenu>
      {user ? (
          <>
            <NavbarMenuItem>
              <Link size='lg' color='foreground' href='/profile'>My Profile</Link>
            </NavbarMenuItem>
            <NavbarMenuItem>
              <Link
                className="w-full"
                color='foreground'
                onClick={() => handleSignOut()}
                size="lg"
                href="#"
              >
                Log Out
              </Link>
            </NavbarMenuItem>
          </>
        ) : (
          <NavbarMenuItem>
            <Link
              className="w-full"
              color='foreground'
              size="lg"
              href="/login"
            >
              Log In
            </Link>
          </NavbarMenuItem>
        )}
        {!user && (
          <NavbarMenuItem>
            <Link
              className="w-full"
              color='foreground'
              onClick={() => toggleModal(ModalType.SIGN_UP)}
              size="lg"
              href="#"
            >
              Registrarse
            </Link>
          </NavbarMenuItem>
        )}
        <Divider />
        <NavbarMenuItem>
          <Link
            className="w-full"
            color='foreground'
            href='https://zealstudio.mx'
            size="lg"
          >
            Home
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link
            className="w-full"
            color='foreground'
            href='/'
            size="lg"
          >
            Book
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link
            className="w-full"
            color='foreground'
            href='https://zealstudio.mx/home/#about'
            size="lg"
          >
            Us
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link
            className="w-full"
            color='foreground'
            href='/shop'
            size="lg"
          >
            Shop
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link
            className="w-full"
            color='foreground'
            href='https://zealstudio.mx/home/#clients'
            size="lg"
          >
            Location
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link
            className="w-full"
            color='foreground'
            href='https://zealstudio.mx/home/#testimonials'
            size="lg"
          >
            Sacred Movement
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link
            className="w-full"
            color='foreground'
            href='https://zealstudio.mx/home/#contact'
            size="lg"
          >
            Contact
          </Link>
        </NavbarMenuItem>
      </NavbarMenu>
      {modal === ModalType.SIGN_IN && <SignInModal isOpen={isOpen} onOpenChange={onOpenChange} />}
      {modal === ModalType.SIGN_UP && <SignUpModal isOpen={isOpen} onOpenChange={onOpenChange} />}
      {modal === ModalType.CONFIRM_CODE && <ConfirmCodeModal isOpen={isOpen} onOpenChange={onOpenChange} />}
      {modal === ModalType.SELECT_PACKAGE && <SelectPackageModal isOpen={isOpen} onOpenChange={onOpenChange} />}
      <ToastContainer />
    </Navbar>
  );
}
