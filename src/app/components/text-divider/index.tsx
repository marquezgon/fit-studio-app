import styles from './style.module.css'

interface ITextDividerProps {
  text: string
}

export default function TextDivider(props: ITextDividerProps) {
  const {text} = props

  return (
    <div className={styles.textDivider}>{text}</div>
  )
}