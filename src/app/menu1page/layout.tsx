import type { Metadata } from 'next'
import styles from './layout.module.css'
import commonStyle from '@styles/common.module.css'

export const metadata: Metadata = {
	title: 'menu one page',
	description:' TEST description ',
}

const MenuOnePageLayout = (prop: any) => {
    return (
        <div className={`${styles.menu1page_wrapper} ${commonStyle.list_scroll} ${commonStyle.list_scroll_y}`}>
            <h1>menu one page</h1>
            <div>
                {prop.children}
            </div>
        </div>
    )
}
export default MenuOnePageLayout;