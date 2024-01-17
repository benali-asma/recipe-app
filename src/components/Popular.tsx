import React, { useState } from "react";
import styled from "styled-components";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

const Wrapper = styled.div`
  margin: 4rem 0rem;
`;
const Card = styled.div`
  min-height: 25rem;
  border-radius: 2rem;
  overflow: hidden;
  position: relative
  img {
    border-radius: 2rem;
    position: absolute;
    left: 0 ;
    width: 100%;
    height:100%: object-filt: cover;
  }
  p {
    position: absolute;
    z-index: 10;
    left: 50%;
    bottom: 0%;
    transform: translate(-50%, 0%);
    color: white;
    width: 100%;
    text-align: center;
    font-weight: 600;
    font-size: 1rem;
    height: 40%;
    display: flex;
    justify-content: center;
    align-items: center;
}
`;

export default function Popular() {
  const [popular, setPopular] = useState([]);

  async function getPpular() {

    const check = localStorage.getItem("populaur") 
    if (check){
      setPopular(JSON.parse(check))
    }
    else {
      const api = await fetch(
        `https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=30`
      );
      const data = await api.json();
      localStorage.setItem("populaur",JSON.stringify(data.recipes))
      setPopular(data.recipes);
    
    }
  
  }
  React.useEffect(() => {
    getPpular();
  }, []);

  return (
    <Wrapper>
      <h3>Populaire Picks</h3>
      <Splide
        options={{
          perPage: 4,
          arrows: false,
          gap: "5rem",
          pagination: false,
          drag: "free",
        }}
      >
        {popular.map((recipe: any) => {
          return (
            <SplideSlide>
              <Card key={recipe.id}>
                <p>{recipe.title}</p>
                <img src={recipe.image} alt={recipe.title}></img>
              </Card>
            </SplideSlide>
          );
        })}
      </Splide>
    </Wrapper>
  );
}
