import React, { useState, useEffect } from 'react';
import styles from "./styles.module.scss";
import { api } from '../../services/apiClient';
import { IoCloseCircleSharp } from 'react-icons/io';
import { AiOutlineSearch } from 'react-icons/ai'
import Link from '../../../node_modules/next/link';


export function SearchBar() {

   const [filteredData, setFilteredData] = useState([]);
   const [wordEntered, setWordEntered] = useState('');

   console.log(filteredData)


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

   const clearInput = () => {
      setFilteredData([]);
      setWordEntered('');
   };



   return (
      <>
         <div className={styles.search}>
            <div className={styles.searchInputs}>
               <input
                  type="text"
                  placeholder="Digite sua busca"
                  value={wordEntered}
                  onChange={handleFilter}
               />
               <div className={styles.searchIcon}>
                  {filteredData.length === 0 ? (
                     <AiOutlineSearch />
                  ) : (
                     <IoCloseCircleSharp id="clearBtn" onClick={clearInput} />
                  )}
               </div>
            </div>
            {filteredData.length != 0 && (
               <div className={styles.dataResult}>
                  {filteredData.map((value) => {
                     return (
                        <>
                           <Link className={styles.dataItem} href={`/articlePage?article_id=${filteredData.id}`} target="_blank">
                              <p>{value.title} </p>
                           </Link>
                        </>
                     );
                  })}
               </div>
            )}
         </div>
      </>
   )
}