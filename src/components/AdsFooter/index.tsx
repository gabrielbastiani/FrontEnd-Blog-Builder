import React from "react";
import Image from "../../../node_modules/next/image";
import Link from "../../../node_modules/next/link";
import styles from './styles.module.scss'


export function AdsFooter() {

   return (
      <>
         <div className={styles.boxAdsFooter}>
            <Link href={"https://go.hotmart.com/H75893038U"}>
                  <Image className={styles.banner} src="/Curso-de-programacao.png" width={890} height={500} alt="dankicode" />
            </Link>
         </div>
      </>
   )
}