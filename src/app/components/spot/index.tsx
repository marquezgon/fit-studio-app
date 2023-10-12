"use client"

import {Button} from "@nextui-org/react"
import classNames from 'classnames'
import styles from './style.module.css'

interface SpotProps {
  index?: number
  text?: string
  status: SpotStatus
  disabled?: boolean
  handleClick: (event: React.MouseEvent<HTMLElement>, index: number) => void
}

interface DummySpotProps {
  status: SpotStatus
}

export enum SpotStatus {
  "UNAVAILABLE" = "Unavailable",
  "AVAILABLE" = "Available",
  "RESERVED" = "Reserved",
  "SELECTED" = "Selected"
}

export function DummySpot(props: DummySpotProps) {
  return (
    <div className={classNames(styles.spotButton, styles[`spotButton${props.status}`], 'min-w-8', 'w-10', 'h-10')} />
  )
}

export default function Spot({ index = 0, ...rest }: SpotProps) {
  return (
    <Button
      isDisabled={rest.disabled}
      className={classNames([styles.spotButton, styles[`spotButton${rest.status}`], 'min-w-8', 'w-10', 'h-10', 'md:w-16', 'md:h-16'])}
      onClick={(e) => rest.handleClick(e, index)}
    >
      {rest.text}
    </Button>
  )
}
