import React, { useEffect, useState } from "react";
import PokemonList from "./PokemonList";
import Pagination from "./Pagination";
import axios from "axios";

function App() {
  const [pokemon, setPokemon] = useState([]);
  const [currentPageUrl, setCurrentPageUrl] = useState('https://pokeapi.co/api/v2/pokemon');
  const [nextPageUrl, setNextPageUrl] = useState();
  const [prevPageUrl, setPrevPageUrl] = useState();
  const [loading, setLoading] = useState(true);


  useEffect(()=>{
    setLoading(true);
    let cancel;
    axios.get(currentPageUrl, {
      cancelToken: new axios.CancelToken(c => cancel = c)
    })
      .then(res => {
        setLoading(false);
        setPrevPageUrl(res.data.previous);
        setNextPageUrl(res.data.next);
        setPokemon(res.data.results.map(p => p.name));
  })
    return () => cancel();
  },[currentPageUrl]);

  //pagination setup
  function goToNextPage(){
    setCurrentPageUrl(nextPageUrl);
  }
  
  function goToPrevPage(){
    setCurrentPageUrl(prevPageUrl);
  }

  //loading page
  if (loading) return "Loading...";
  
  return (
    <>
      <PokemonList pokemon={pokemon}/>
      <Pagination goToNextPage = {nextPageUrl ? goToNextPage : null}
                  goToPrevPage = {prevPageUrl ? goToPrevPage : null}
      />
    </>
  );
}

export default App;
