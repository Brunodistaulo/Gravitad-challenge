import styles from './styles.module.css'

interface Props {
    link: string,
    text: string,
    callback?: () => void 
}

const BotonLink = ({link, text, callback}: Props) => {
  return (
    <li className={styles.btn}>
        <a href={link} onClick={callback}>{text}</a>
    </li>
  )
}

export default BotonLink;