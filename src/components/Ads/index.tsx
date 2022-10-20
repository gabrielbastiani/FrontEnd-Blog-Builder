import React from "react";
import Image from "../../../node_modules/next/image";
import Link from "../../../node_modules/next/link";
import styles from './styles.module.scss'


export function Ads() {

   return (
      <>
         <div className={styles.boxAds}>
            <Link href={"https://go.hotmart.com/H75893038U"}>
                  <Image className={styles.banner} src="/Curso-de-programação.jpg" width={240} height={220} alt="logomarca" />
            </Link>
         </div>

         <div className={styles.boxAdsAll}>
            <Link href={"https://go.hotmart.com/H75893038U"}>
                  <Image className={styles.bannerAll} src="/Curso-de-programação.jpg" width={890} height={500} alt="logomarca" />
            </Link>
         </div>

         <div className={styles.boxAdsMobile}>
            <Link href={"https://go.hotmart.com/H75893038U"}>
                  <Image className={styles.bannerMobile} src="/Curso-de-programação.jpg" width={550} height={310} alt="logomarca" />
            </Link>
         </div>
      </>
   )
}