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
import {Link} from '@nextui-org/link'
import {useAppStore} from '@/app/store'
import styles from './style.module.css'
import {ModalType} from '@/app/types'

export default function App() {
  const menuItems = [
    "Clases",
    "Iniciar Sesión",
    "Registrarse",
  ];

  const {isOpen, onOpen, onOpenChange} = useDisclosure()
  const {modal} = useAppStore()

  React.useEffect(() => {
    if (modal !== null) {
      onOpen()
    }
  }, [modal])

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
        <NavbarMenuToggle className={styles.navbarMenuToggle} />
      </NavbarContent>
      <NavbarMenu>
        <NavbarMenuItem>
          <Link
            className="w-full"
            color='foreground'
            href='/reserva'
            size="lg"
          >
            Clases
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link
            className="w-full"
            color='foreground'
            onClick={() => alert()}
            size="lg"
          >
            Iniciar Sesión
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link
            className="w-full"
            color='foreground'
            onClick={() => alert()}
            size="lg"
          >
            Registrarse
          </Link>
        </NavbarMenuItem>
      </NavbarMenu>
      {modal === ModalType.SIGN_IN && <SignInModal isOpen={isOpen} onOpenChange={onOpenChange} />}
      {modal === ModalType.SIGN_UP && <SignUpModal isOpen={isOpen} onOpenChange={onOpenChange} />}
      {modal === ModalType.CONFIRM_CODE && <ConfirmCodeModal isOpen={isOpen} onOpenChange={onOpenChange} />}
      {modal === ModalType.SELECT_PACKAGE && <SelectPackageModal isOpen={isOpen} onOpenChange={onOpenChange} />}
    </Navbar>
  );
}
