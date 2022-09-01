
import React from 'react';
import { useRouter } from '../../../node_modules/next/router'
import styles from './styles.module.scss'



export default function Article() {

   const router = useRouter();
   const params = router.query.id;

   return(
      <>
         <h1></h1>
      </>
   )
}