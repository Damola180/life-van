import React from "react";
import { Link } from "react-router-dom";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../config/firebase";

export default function HostVans() {
  const [vans, setVans] = React.useState([]);

  const getHostVanData = async () => {
    const multipleSetData = query(
      collection(db, "ava-Vans"),
      where("hostId", "==", "123")
    );

    const querySnapshot = await getDocs(multipleSetData);
    const dataNeed = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return dataNeed;
  };

  // getHostVanData();

  React.useEffect(() => {
    // fetch("/api/host/vans")
    //   .then((res) => res.json())
    //   .then((data) => {
    //     console.log(data);
    //     setVans(data.vans);
    //   });
    const fetchData = async () => {
      const result = await getHostVanData();
      console.log(result);
      setVans(result);
    };

    fetchData();
  }, []);

  const hostVansEls = vans.map((van) => (
    <Link to={`${van.id}`} key={van.id} className="host-van-link-wrapper">
      <div className="host-van-single" key={van.id}>
        <img src={van.img} alt={`Photo of ${van.name}`} />
        <div className="host-van-info">
          <h3>{van.name}</h3>
          <p>${van.price}/day</p>
        </div>
      </div>
    </Link>
  ));

  return (
    <>
      {" "}
      <section>
        <h1 className="host-vans-title">Your listed vans</h1>
        <div className="host-vans-list">
          {vans.length > 0 ? (
            <section>{hostVansEls}</section>
          ) : (
            <h2>Loading...</h2>
          )}
        </div>
      </section>
    </>
  );
}
