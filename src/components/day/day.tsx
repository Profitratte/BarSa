import { Box, Container, Slider, Typography } from "@mui/material";
import React from "react";

//constants to define times as number: i.e. 0,25 = 15 minutes
const startTime = 7;  //starting hour as number
const endTime   = 24; //ending hour as number 
const stepsTime = 4;  //divider for stepping hours 


const valuetext = (value: number) => {
  const calcValue  = value/calcSteps()/stepsTime+startTime;
  const hourString = Math.floor(calcValue).toString();
  let fullString   = "";

  switch (calcValue % 1) {
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

const calcSteps = () => {
  const range = endTime-startTime;
  const steps: number = 100/range/stepsTime;

  return(steps);
}

const getMarks = () => {
  let marks = [];

  for(let i=0; i<=100; i+calcSteps()*stepsTime){
    marks.push({value: i, label: (i/calcSteps()/stepsTime+startTime).toString()})
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
      console.log(value);
    };

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
                marks={getMarks()}
            />
            </Box>
        </Container>
      );
}

export default DatePicker;