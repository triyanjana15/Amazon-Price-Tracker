"use client"
import React,{useEffect} from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2"; // ✅ Not Chart

// ✅ Register chart components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);


const DisplayChart = ({chartData}) => {

    useEffect(() => {
        console.log("Chart data received in DisplayChart:",chartData);
    },[chartData]);
    
    const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: true, text: "prices by time" },
    },
  };
    return(
        <div style={{ width: "600px", height: "400px" }}>
          <Line data={chartData} options={options} />
        </div>

    )
}

export default DisplayChart