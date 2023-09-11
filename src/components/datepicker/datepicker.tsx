import { Box, Button, Container, Slider, Typography } from "@mui/material";
import React from "react";

//constants to define times as number: i.e. 0,25 = 15 minutes
const startTime = 7;  //starting hour as number
const endTime   = 24; //ending hour as number 
const stepsTime = 4;  //divider for stepping hours 

const calcSteps = () => {
  const range = endTime-startTime;
  const steps: number = 100/range/stepsTime;

  return(steps);
}

const calcTime = (value: number) => {
  const calcTime: number = value/calcSteps()/stepsTime+startTime;

  return (calcTime);
}

const valuetext = (value: number) => {
  const calcedTime = calcTime(value);
  const hourString = Math.floor(calcedTime).toString();
  let fullString   = "";

  switch (calcedTime % 1) {
    case 0: 
      fullString = hourString + ":" + "00";
      break;
    case 0.25:
      fullString = hourString + ":" + "15";
      break;
    case 0.5:
      fullString = hourString + ":" + "30";
      break;
    case 0.75:
      fullString = hourString + ":" + "45";
      break;  
    default: 
      fullString = "";
      break;
  }

  return `${fullString} Uhr`;
}


//Nice to have
const getMarks = () => {
  let marks = [];

  let i = 0;

  while(i < 100){

    if(i % calcSteps() === 0){
      marks.push({value: i, label: (i/calcSteps()/stepsTime+startTime).toString()})
    }

    i = i+calcSteps();

    //debug
    console.log("i ", i)
  }

  //debug
  console.log(marks);

  return(marks);
}



const DatePicker = () => {

    const [value, setValue] = React.useState<number[]>([20, 37]);

    const handleChange = (event: Event, newValue: number | number[]) => {
      setValue(newValue as number[]);
      //debug
      console.log("value: ", value);
    };

    const handleSubmit = () => {
      fetchPostShift();
    }

    const fetchPostShift = async () => {
      const data = {startTime: calcTime(value[0]), endTime: calcTime(value[1])}

      //debug
      console.log("data: ", data);

      const response = await fetch("api/", {
          method: "POST", 
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data), 
        });
    
      const result = response.json(); 
      
      //debug
      console.log(result);


    }

    return (
        <Container sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "100vh"
        }}>
            <Box sx={{ width: 300, backgroundColor: "white"}}>
            <Slider
                getAriaLabel={() => 'Temperature range'}
                value={value}
                onChange={handleChange}
                valueLabelDisplay="auto"
                getAriaValueText={valuetext}
                valueLabelFormat={valuetext}
                step={calcSteps()}
            />
            <Button onClick={handleSubmit}>Abschicken</Button>
            </Box>
        </Container>
      );
      return(<></>)
}

export default DatePicker;