'use client';
import React from 'react';
import { Button } from "@mui/material";

export default function Prototype() {

    const handleClick = async () => {
      console.log('Button clicked!');
       await fetchGetHolidays()
    }

    const fetchGetHolidays = async() => { 
        const apiUrl = '/api/test'

        await fetch(apiUrl)
          .then((response) => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then((data) => {
            console.log('API response:', data);
          })
          .catch((error) => {
            console.error('Fetch error:', error);
          });
        
    }

    return (<>
        <Button onClick={handleClick}>fetch GET/test</Button>
    </>)
}