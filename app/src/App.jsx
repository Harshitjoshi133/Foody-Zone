import { useEffect, useState } from 'react';
import styled from 'styled-components';
import SearchResults from './components/SearchResults';
//export const BASE_URL="http://localhost:9000"
const App = () => {
  const[filteredData,setFilteredData]=useState(null);
  const [data,setData]=useState(null);
  const[loading,setLoading]=useState(false);
  const[error,setError]=useState(null);
  const[selectedButton,setSelectedButton]=useState("all");

  useEffect(()=>{
    const fetchFoodData = async () => {
      setLoading(true);
      console.log("Sending request");
      try{
      const response= await fetch("/data");
      const json=[
        {
          "name": "Boilded Egg",
          "price": 10,
          "text": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
          "image": "/images/egg.png",
          "type": "breakfast"
        },
        {
          "name": "RAMEN",
          "price": 25,
          "text": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
          "image": "/images/ramen.png",
          "type": "lunch"
        },
        {
          "name": "GRILLED CHICKEN",
          "price": 45,
          "text": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
          "image": "/images/chicken.png",
          "type": "dinner"
        },
        {
          "name": "CAKE",
          "price": 18,
          "text": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
          "image": "/images/cake.png",
          "type": "breakfast"
        },
        {
          "name": "BURGER",
          "price": 23,
          "text": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
          "image": "/images/burger.png",
          "type": "lunch"
        },
        {
          "name": "PANCAKE",
          "price": 25,
          "text": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.",
          "image": "/images/pancake.png",
          "type": "dinner"
        }
      ];
      
      setData(json);
      console.log(data);
      setFilteredData(json);
      setLoading(false);
    
    }
      catch(error){
        setError(error);
        console.log(error);
      }
    };
    fetchFoodData();
  },[]);

  

  
  if(error)return <div>Error</div>;
  if(loading)return <div>Loading...</div>

  const searchFood=(e) =>{
    const searchValue=e.target.value;
    if(searchValue===""){
      setFilteredData(null);
    }
    const filter=data?.filter((food)=>
      food.name.toLowerCase().includes(searchValue.toLowerCase())
    )
    setFilteredData(filter);
    console.log(filter);
  }
  const filterFood=(type)=>{
    if(type==="all"){
      setFilteredData(data);
      setSelectedButton("all");
      return;
    }
    const filter=data?.filter((food)=>
      food.type.toLowerCase().includes(type.toLowerCase())
    )
    setFilteredData(filter);
    setSelectedButton(type);
  }

  const filterbtns=[
    {
      name:"All",
      type:"all",

    },
    {
      name:"BreakFast",
      type:"breakfast",

    },
    {
      name:"Lunch",
      type:"lunch",
    },
    {
      name:"Dinner",
      type:"dinner",
    }
  ]

  return <>
    <Container>
    <TopContainer>
      <div className="logo">
        <img src='/Foody Zone.svg' alt="Logo"/>
      </div>
      <div onChange={searchFood} className="search">
        <input placeholder='Search Food..'/>
      </div>
    </TopContainer>
    <FilterContainer>
      {
        filterbtns.map((value)=>(
          <Button key={value.name} 
          onClick={()=>filterFood(value.type)}> 
          {value.name}
          </Button>
        ))
      }
    </FilterContainer>
  </Container>
   <SearchResults data={filteredData}>
    </SearchResults>
  </>
  
};

export default App;

export const Container=styled.div`
  max-width: 1200px;
  margin: 0 auto;
    
`
const TopContainer=styled.section`
    display: flex;
    justify-content: space-between;
    height:140px;
    width: max-width;
    align-items: center;
    padding: 16px;
    .search{
       input{
        background-color:transparent;
        border: 1px solid red;
        color:white;
        border-radius: 5px;
        height: 40px;
        font-size: 16px;
        padding: 10px;
       }
    }
    @media (0< width <600px) {
      flex-direction: column;
      height: 60px;
    }  
    
`
const FilterContainer=styled.section`
        display: flex;
        justify-content: center;
        gap:12px;
        padding: 40px;
        
`

export const Button=styled.button`
    padding: 6px 12px;
    /* //background:${({isSelected})=>(isSelected ?"#FF4040": "#FF4343")};
    //outline:1px solid ${({isSelected})=>(isSelected ?"white": "#FF4343")}; */
    border-radius: 5px;
    border:none;
    color: white;
    cursor:pointer;
`

