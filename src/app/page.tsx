'use client'
import Image from 'next/image'
import styles from '@/app/page.module.css'
import flexLayoutStyles from '@styles/flexLayout.module.css'
import SideMenu, {sideMenuRef} from '@/app/@sideMenu/page'
import {useRef, useEffect} from 'react'

const Content = () => {
  return (
	<div>
        <div>
            <div className={styles.description}>
                <p>
                Get started by next js &nbsp;
                </p>
            </div>

            <div className={styles.grid}>
                <a
                href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
                className={styles.card}
                target="_blank"
                rel="noopener noreferrer"
                >
                <h2>
                    Docs <span>-&gt;</span>
                </h2>
                <p>Find in-depth information about Next.js features and API.</p>
                </a>

                <a
                href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
                className={styles.card}
                target="_blank"
                rel="noopener noreferrer"
                >
                <h2>
                    Learn <span>-&gt;</span>
                </h2>
                <p>Learn about Next.js in an interactive course with&nbsp;quizzes!</p>
                </a>

                <a
                href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
                className={styles.card}
                target="_blank"
                rel="noopener noreferrer"
                >
                <h2>
                    Templates <span>-&gt;</span>
                </h2>
                <p>Explore the Next.js 13 playground.</p>
                </a>

                <a
                href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
                className={styles.card}
                target="_blank"
                rel="noopener noreferrer"
                >
                <h2>
                    Deploy <span>-&gt;</span>
                </h2>
                <p>
                    Instantly deploy your Next.js site to a shareable URL with Vercel.
                </p>
                </a>
            </div>
        </div>
	</div>
  )
}
export default Content;