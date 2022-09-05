import React, { useState, useEffect } from 'react';
import styles from "./styles.module.scss";
import { api } from '../../services/apiClient';
import Link from '../../../node_modules/next/link';


export function SearchBar() {

   const [filteredData, setFilteredData] = useState([]);
   const [wordEntered, setWordEntered] = useState('');

   const [showMenu, setShowMenu] = useState(false);


   useEffect(() => {
      async function loadArticles() {
         try {
            const dataArticle = await api.get('/article/search');

            setFilteredData(dataArticle.data)

         } catch (error) {
            console.error(error);
            alert('Error call api list article');
         }
      }

      loadArticles();
   }, []);


   const handleFilter = (event) => {
      const searchWord = event.target.value;

      setWordEntered(searchWord);

      const newFilter = filteredData.filter((value) => {
         return value.title.toLowerCase().includes(searchWord.toLowerCase());
      });

      if (searchWord === "") {
         setFilteredData([]);
      } else {
         setFilteredData(newFilter);
      }
   };

   const showOrHide = () => {
      setShowMenu(!showMenu)
   }

   return (
      <>
         <div className={styles.search}>
            <div className={styles.searchInputs}>
               <input
                  type="text"
                  placeholder='Digite sua busca...'
                  value={wordEntered}
                  onChange={handleFilter}
                  onClick={showOrHide}
               />
            </div>

            {showMenu ? <div className={styles.dataResult}>
               {filteredData.length != 0 && (
                  <div className={styles.dataResult}>
                     {filteredData.slice(0, 15).map((value) => {
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