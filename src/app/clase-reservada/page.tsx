/* eslint-disable @next/next/no-img-element */
import React from 'react'
import Link from 'next/link'

export default function ClaseReservada() {
  return (
    <main className='flex flex-col items-center justify-center container mx-auto'>
      <div className='pt-8 md:pt-12'>
        <img
          src="/logo-black-2.png"
          alt="Zeal Studio Logo"
          width={200}
        />
      </div>
      <div className='flex flex-col justify-center pt-6 w-10/12 md:w-1/2 text-center'>
        <h3 className='text-lg md:text-xl font-[200] pt-6 uppercase'>
          SOMOS SERES CICLICOS EN BUSCA DE UN EQUILIBRIO, SOMOS ACTITUD DE VIDA,SOMOS ZEAL.
        </h3>
        <h2 className='text-2xl md:text-3xl font-[300] pt-8 md:pt-12 uppercase'>
          ¡GRACIAS POR TU RESERVA!
        </h2>
        <p className='text-base pt-8 md:pt-12 font-[300]'>Te esperamos 15 minutos antes de la hora en que empieza tu disciplina.</p>
        <p className='text-base pt-4 font-[300]'>
          En Zeal valoramos la puntualidad y compromiso de nuestra comunidad, por lo que pasados los primeros 5 min de clase, ya no se te permetira la entrada al salon. De esta forma no interrumpimos el momento sagrado que creamos estando nuestras almas en movimiento.
        </p>
        <h3 className='text-xl font-[300] pt-6 uppercase'>
          NOS MOVEMOS Y VIBRAMOS JUNTOS
        </h3>
        <h3 className='text-xl font-[300] pt-4 uppercase'>
          ARE YOU READY?
        </h3>
        <div className='w-full flex justify-center'>
          <div className='mt-2 w-fit text-center rounded-sm' style={{ backgroundColor: 'black' }}>
            <Link href='/' className='text-white'>
                <div className='py-1 px-2'>LET&apos;S DO THIS</div>
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}