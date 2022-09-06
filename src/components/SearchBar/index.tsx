import React, { useState, useEffect } from 'react';
import styles from "./styles.module.scss";
import { api } from '../../services/apiClient';
import Link from '../../../node_modules/next/link';


export function SearchBar() {

   const [initialFilter, setInitialFilter] = useState();
   const [search, setSearch] = useState([]);

   const [showMenu, setShowMenu] = useState(false);
   const [showElement, setShowElement] = useState(false);


   useEffect(() => {
      async function loadArticles() {
         try {
            const dataArticle = await api.get('/article/search');
            const filter = await dataArticle.data;

            setInitialFilter(filter);
            setSearch(filter);

         } catch (error) {
            console.error(error);
            alert('Error call api list article');
         }
      }

      loadArticles();
   }, []);


   const handleChange = ({ target }) => {
      if (!target.value) {
         setSearch(initialFilter);

         return;
      }

      const filterArticles = search.filter((filt) => filt.title.toLowerCase().includes(target.value));
      setSearch(filterArticles);
   }

   const showOrHide = () => {
      setShowElement(!showElement)
   }



   return (
      <>
         <div className={styles.search}>
            <div className={styles.searchInputs}>
               <input
                  placeholder='Busca por artigo'
                  type="search"
                  onClick={showOrHide}
                  onChange={handleChange}
               />
            </div>

            {showElement ? <div className={styles.dataResult}>
               {search.length !== 0 && (
                  <div className={styles.dataResult}>
                     {search.slice(0, 15).map((value) => {
                        return (
                           <>
                              <Link className={styles.dataItem} href={`/articlePage?article_id=${value.id}`} target="_blank">
                                 <li>{value.title}</li>
                              </Link>
                           </>
                        );
                     })}
                  </div>
               )}
            </div> : null}
         </div>
      </>
   )
}