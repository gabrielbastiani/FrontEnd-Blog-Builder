import React, { useState, useEffect, useCallback } from 'react'
import { canSSRAuth } from "../../utils/canSSRAuth"
import Head from 'next/head';
import styles from "../dashboard/styles.module.scss"
import { setupAPIClient } from '../../services/api'
import { HeaderPainel } from "../../components/HeaderPainel/index";
import { FooterPainel } from "../../components/FooterPainel/index";
import Link from "../../../node_modules/next/link";
import moment from 'moment';
import { FaTrashAlt } from 'react-icons/fa'
import { FiEdit } from 'react-icons/fi'
import { FiRefreshCcw } from 'react-icons/fi'
import Router from 'next/router'
import { api } from '../../services/apiClient';


export default function Dashboard() {

   return (
      <>
         <Head>
            <title>Painel - Blog Builder Seu Negócio Online</title>
         </Head>
         <HeaderPainel />
            <div>
               <h1>Página de Artigos</h1>
            </div>
         <FooterPainel />
      </>
   )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
   const apliClient = setupAPIClient(ctx)

   const response = await apliClient.get('/category');
   const responseArticle = await apliClient.get('/category/article');

   return {
      props: {
         categoryList: response.data,
         articleList: responseArticle.data,
      }
   }
})