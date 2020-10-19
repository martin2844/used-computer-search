import React, {useState, useEffect} from 'react';
import { Router, useLocation } from "@reach/router";
import {Link} from 'gatsby';
import Test from '../components/test';
import axios from 'axios';
import '../pages/main.css';

const Differences = (props) => {
   
    const location = useLocation();
    const [terms, setTerms] = useState([]);

    useEffect(() => {
        axios.get("/api/data/difference-terms").then((res) => {
            setTerms(res.data);
        });
    }, [])
  

   
    const displayLinks = terms.map((term) => {
        return(
        <Link key={term} to={`/difference/${term}`}>{term}</Link>
        )
    })


    return(
   
  <>
    <h1>Differences:</h1>
    {location.pathname === "/difference/" ? displayLinks : "null" }
    <Router>
      <Test path="/difference/:id" />
    </Router>
  </>
)}

export default Differences