import React, { useEffect, useState } from 'react';
import { Images } from './Assets/ImagesArray';
// import '../App.css';
import '../index.css';

function User_Screen() {
  const [items, setItems] = useState(Images.sort(() => Math.random() - 0.5))

const shuffleImages=()=>{
  var shuffleimages=[...items]
  for(var i=0;i<shuffleimages.length;i++){
    var j=Math.floor(Math.random()*(i+1));
    //swapping i and j values
    [shuffleimages[i],shuffleimages[j]]=[shuffleimages[j],shuffleimages[i]]
  }
  setItems(shuffleimages)
}

function check(current) {
  if (items[current].id === items[prev].id) {
    items[current].stat = "correct";
    items[prev].stat = "correct";
    setItems([...items]);
    setPrev(-1);
  } else {
    items[current].stat = "wrong";
    items[prev].stat = "wrong";
    setItems([...items]);
    setTimeout(() => {
      items[current].stat = "";
      items[prev].stat = "";
      setItems([...items]);
      setPrev(-1);
    }, 1000);
  }
}

const [prev, setPrev] = useState(-1)

function handleImage(id){
    if(prev === -1){
        items[id].stat = "active"
        setItems([...items])
        setPrev(id)
    }else{
        check(id)
    }
}
  return (
    <div className="d-flex flex-column flex-wrap justify-content-center align-items-center p-5 bg">
      <div
        style={{ width: 500, height: 500 }}
        id="main"
        className="container d-flex flex-column justify-content-center align-items-center gap-2 p-2"
      >
        <h1 className="font-monospace fs-1">MEMORY GAME</h1>
        <div className="d-flex flex-wrap justify-content-center align-items-center">
          {items.map((item, index) => {
             const itemClass = item.stat ? " active " + item.stat : ""
            return (
              <div
                key={index}
                onClick={() => handleImage(index)}
                className={`card d-flex justify-content-center align-items-center m-2 div ${itemClass}`}
                style={{ width: 100, height: 100, perspective: 150 }}
              >
                <img
                  className="card-img fs-3"
                  src={item.image}
                  alt="Card image"
                  style={{ width: 60, height: 60 }}
                />
              </div>
            );
          })}
        </div>
        <button
        onClick={shuffleImages}
          className="btn btn-danger font-monospace fs-5 pointer blink"
          style={{cursor: 'pointer' }}
        >
          RESET GAME
        </button>
      </div>
    </div>
  );
}

export default User_Screen;
