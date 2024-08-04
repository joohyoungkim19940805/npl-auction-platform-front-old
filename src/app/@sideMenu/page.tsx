'use client'
import styles from '@/app/@sideMenu/page.module.css'
import flexLayoutStyles from '@styles/flexLayout.module.css'
import {RefObject, useRef, useContext} from 'react'
import { AccountContext } from '@/components/globalContextWrapper/GlobalAccountContextWrapper'
import commonStyles from '@styles/common.module.css'
import Link from 'next/link'

export let sideMenuRef : RefObject<HTMLDivElement> ; 

const SideMenu = (prop : any) => {
  const {accountSummary} = useContext(AccountContext)
  , {accountId, fullName} = accountSummary;
    
  const sideMenuContainer = useRef<HTMLDivElement>(null)
  sideMenuRef = sideMenuContainer;
  return (
    <div id={styles.side_menu_wrapper} ref={sideMenuContainer}>
      <aside className={styles.side_menu}>
        <div>side menu array</div>
        {
          ! accountId ? 
          <></>
          : 
          <div>
            <div>
              login account ID : {accountId}
            </div>
            <div>
              login account full name : {fullName}
            </div>
          </div>
        }
        <ul>
          <li className={`${commonStyles.pointer} ${commonStyles.shake}`} style={{marginTop: '30px',marginBottom : '30px'}}>
            <Link href="/">home</Link>
          </li>
          <li className={`${commonStyles.pointer} ${commonStyles.shake}`} style={{marginTop: '30px',marginBottom : '30px'}}>
            <Link href="/menu1page">menu 1</Link>
          </li>
          <li className={`${commonStyles.pointer} ${commonStyles.shake}`}>
            <Link href="/menu2page">menu 2</Link>
          </li>   
        </ul>
      </aside>
    </div>
  )
}
export default SideMenu;