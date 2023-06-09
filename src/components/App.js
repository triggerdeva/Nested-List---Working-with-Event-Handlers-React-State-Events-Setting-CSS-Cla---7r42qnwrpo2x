import React, { Component, useState } from "react";
import "./../styles/App.css";

// Do not alter the states const and values inside it.
const states = [
  {
    name: "Madhya Pradesh",
    cities: [
      {
        name: "Indore",
        towns: [
          {
            name: "Mhow",
          },
          {
            name: "Dewas",
          },
        ],
      },
      {
        name: "Bhopal",
        towns: [
          {
            name: "Manit",
          },
          {
            name: "Berasia",
          },
        ],
      },
      {
        name: "Gwalior",
        towns: [
          {
            name: "Ajaypur",
          },
        ],
      },
    ],
  },
  {
    name: "Jharkhand",
    cities: [
      {
        name: "Dhanbad",
        towns: [
          {
            name: "IIT(ISM) Dhanbad",
          },
          {
            name: "Hirapur",
          },
        ],
      },
      {
        name: "Wasseypur",
        towns: [
          {
            name: "Sardar khan's",
          },
          {
            name: "Faizal khan's",
          },
        ],
      },
      {
        name: "Mirzapur",
        towns: [
          {
            name: "Kaleen bhaiya's",
          },
          {
            name: "Guddu bhaiya's",
          },
        ],
      },
    ],
  },
  {
    name: "Assam",
    cities: [
      {
        name: "Guwhati",
        towns: [
          {
            name: "Amin",
          },
          {
            name: "Jalah",
          },
        ],
      },
      {
        name: "Jungle1",
        towns: [
          {
            name: "Tiger found at IIT Guwahati",
          },
          {
            name: "Leopard found in IIT Guwahati",
          },
        ],
      },
      {
        name: "Tezpur",
        towns: [
          {
            name: "Dibrugarh",
          },
          {
            name: "Silchar",
          },
        ],
      },
    ],
  },
  {
    name: "Bihar",
    cities: [
      {
        name: "Patna",
        towns: [
          {
            name: "Sonpur",
          },
          {
            name: "Maner",
          },
        ],
      },
      {
        name: "Gaya",
        towns: [
          {
            name: "Bakraur",
          },
          {
            name: "Barachatti",
          },
        ],
      },
      {
        name: "Darbhanga",
        towns: [
          {
            name: "Singhwara",
          },
          {
            name: "Jale",
          },
        ],
      },
    ],
  },
];

function App() {
  let [cities, setCities] = useState({});
  let [towns, setTowns] = useState({});

  function stateClicked(e){
    // console.log("state clicked "+ e.target.className);
    let index = e.target.id.split("").reverse()[0]-1;
    let cityName = e.target.className;

    if(cities.hasOwnProperty(cityName)){
      delete cities[cityName];
      setCities({...cities});
      return;
    }

    setCities({
      ...cities,
      [cityName]: states[index].cities,
    });
  }

  function cityClicked(e){
    e.stopPropagation();
    let townName = e.target.className;
    // console.log("city clicked "+ townName);
    let ownIndex = e.target.id.split("").reverse()[0]-1;
    // console.log(ownIndex);
    let parentIndex = e.target.value;

    if(towns.hasOwnProperty(townName)){
      delete towns[townName];
      setTowns({...towns});
      return
    }

    setTowns({
      ...towns,
      [townName]: states[parentIndex].cities[ownIndex].towns,
    })
      
  }

  function townClicked(e){
    e.stopPropagation();
  }
  return(
    <div id="main">
      <ul>
        {states.map((state, cityIndex)=>
          <li onClick={stateClicked} id={`state${cityIndex+1}`} key={cityIndex} className={state.name} >{state.name}
              {cities.hasOwnProperty(state.name) ?
                <ul>{cities[state.name].map((city, townIndex)=>
                  <li onClick={cityClicked} value={cityIndex} id={`city${townIndex+1}`} className={city.name} key={townIndex}>{city.name}
                    {towns.hasOwnProperty(city.name) ? 
                      <ul>
                        {towns[city.name].map((town, index)=>
                          <li id={`town${index+1}`} onClick={townClicked} key={index}>{town.name}</li>
                        )}
                      </ul>
                    :""}
                  </li>
                  )}
                </ul>
                : ""
              }
          </li>
        )}
      </ul>

    </div>
  );
}

export default App;
