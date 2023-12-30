import React from "react";

import { Link, useSearchParams } from "react-router-dom";

import { collection, getDocs } from "firebase/firestore";

import { db } from "../../config/firebase";

export default function Vans() {
  const [vans, setVans] = React.useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const [loading, setLoading] = React.useState(false);

  const [error, setError] = React.useState(null);
  const typeFilter = searchParams.get("type");

  // Call the testing function

  const getVansData = async () => {
    const querySnapshot = await getDocs(collection(db, "ava-Vans"));

    const arrData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return arrData;
  };

  React.useEffect(() => {
    async function loadVans() {
      setLoading(true);
      try {
        const data = await getVansData();
        setVans(data);
      } catch (err) {
        console.log(err);
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    loadVans();
  }, []);

  const displayedCharacters = typeFilter
    ? vans.filter((char) => char.type.toLowerCase() === typeFilter)
    : vans;

  const vanElements = displayedCharacters.map((van) => (
    <div key={van.id} className="van-tile">
      <Link
        to={`${van.id}`}
        state={{ search: `?${searchParams.toString()}`, type: typeFilter }}
      >
        <img src={van.img} />
        <div className="van-info">
          <h3>{van.name}</h3>
          <p>
            ${van.price}
            <span>/day</span>
          </p>
        </div>
        <i className={`van-type ${van.type} selected`}>{van.type}</i>
      </Link>
    </div>
  ));
  function handlefilterchange(key, value) {
    setSearchParams((prevParams) => {
      if (value === null) {
        prevParams.delete(key);
      } else {
        prevParams.set(key, value);
      }
      return prevParams;
    });
  }

  if (loading) {
    return <>Loading in a bit</>;
  }
  if (error) {
    return <h1> error, console console.error();</h1>;
  }
  return (
    <>
      <div className="van-list-container">
        <h1> Explore our van options</h1>
        <div className="van-list-filter-buttons">
          <button
            onClick={() => handlefilterchange("type", "simple")}
            className={` van-type simple ${
              typeFilter === "simple" ? "selected" : null
            }`}
          >
            Simple
          </button>
          <button
            onClick={() => handlefilterchange("type", "luxury")}
            className={` van-type luxury ${
              typeFilter === "luxury" ? "selected" : null
            }`}
          >
            Luxury
          </button>
          <button
            onClick={() => handlefilterchange("type", "rugged")}
            className={` van-type rugged ${
              typeFilter === "rugged" ? "selected" : null
            }`}
          >
            Rugged
          </button>
          {typeFilter ? (
            <button
              onClick={() => handlefilterchange("type", null)}
              className="van-type clear-filters"
            >
              Clear Filter
            </button>
          ) : null}
        </div>
        <div className="van-list">{vanElements}</div>
      </div>
    </>
  );
}
