'use client'
import styles from '@/app/@footer/page.module.css'
import flexLayoutStyles from '@styles/flexLayout.module.css'
export var footerDefaultProp : any;
const Footer = (prop : any) => {
  footerDefaultProp = prop
  return (
    <div id={styles.footer_wrapper}>
      <div>footer array</div>
    </div>
  )
}
export default Footer;