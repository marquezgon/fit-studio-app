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
import Image from 'next/image'
import {useDisclosure} from '@nextui-org/react'
import SignInModal from '@/app/components/signin-modal'
import SignUpModal from '@/app/components/signup-modal'
import SelectPackageModal from '@/app/components/select-package-modal'
import ConfirmCodeModal from '@/app/components/confirm-code-modal'
import { CognitoIdentityProviderClient, GetUserCommand } from '@aws-sdk/client-cognito-identity-provider'
import {Link} from '@nextui-org/link'
import {useAppStore} from '@/app/store'
import styles from './style.module.css'
import {ModalType} from '@/app/types'

export default function App() {
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

  return (
    <Navbar disableAnimation isBordered className={styles.navbarContainer} maxWidth='full'>
      <NavbarBrand>
        <Image
          src="/logo.png"
          width={200}
          height={21}
          alt="Zeal Studio Logo"
        />
      </NavbarBrand>
      <NavbarContent justify="end">
        <NavbarMenuToggle className={styles.navbarMenuToggle}/>
      </NavbarContent>
      <NavbarMenu>
        {/* <NavbarMenuItem>
          <Link
            className="w-full"
            color='foreground'
            href='/reserva'
            size="lg"
          >
            Inicio
          </Link>
        </NavbarMenuItem> */}
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
        {user ? (
          <NavbarMenuItem>
            <Link
              className="w-full"
              color='foreground'
              onClick={() => toggleModal(ModalType.SIGN_IN)}
              size="lg"
              href="#"
            >
              Cerrar Sesión
            </Link>
          </NavbarMenuItem>
        ) : (
          <NavbarMenuItem>
            <Link
              className="w-full"
              color='foreground'
              onClick={() => toggleModal(ModalType.SIGN_IN)}
              size="lg"
              href="#"
            >
              Iniciar Sesión
            </Link>
          </NavbarMenuItem>
        )}
      </NavbarMenu>
      {modal === ModalType.SIGN_IN && <SignInModal isOpen={isOpen} onOpenChange={onOpenChange} />}
      {modal === ModalType.SIGN_UP && <SignUpModal isOpen={isOpen} onOpenChange={onOpenChange} />}
      {modal === ModalType.CONFIRM_CODE && <ConfirmCodeModal isOpen={isOpen} onOpenChange={onOpenChange} />}
      {modal === ModalType.SELECT_PACKAGE && <SelectPackageModal isOpen={isOpen} onOpenChange={onOpenChange} />}
    </Navbar>
  );
}
