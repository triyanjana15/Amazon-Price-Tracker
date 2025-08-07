
import Image from "next/image";
import React from "react";

import Navbar from "@/components/NavBar";
import{MongoClient} from "mongodb";
import DisplayChart from "@/components/DisplayChart";

//connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

//Database Name
const dbName = 'amazon';


async function getChartData(asin) {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection('prices');

//     const chartData = {
//     labels:"Product" ,
//     data:[23], // X-axis labels
//     datasets: [
//       {
//         label: "prices",
//         data: [12], // Y-axis values
//         borderColor: "rgb(75, 192, 192)",
//         backgroundColor: "rgba(75, 192, 192, 0.5)",
//       },
//     ],
//   };

    const data = await collection
  .find({ asin })
  .sort({ time: 1 }) // 1 for ascending, -1 for descending
  .toArray();

return{
  labels: data.map(item => new Date(item.time).toLocaleTimeString("en-IN")),
  datasets: [
    {
      label: "prices",
      data: data.map(item => Number(item.priceInt)),
      borderColor: "rgb(75, 192, 192)",
      backgroundColor: "rgba(75, 192, 192, 0.5)",
    },
  ],
};
}




export default async function Page(props) {
    const {params} = props;
    const{asin} =await params;
    // const asin = params.asin;
    const chartData= await getChartData(asin);
    
   



  
  return ( 
    <div>
        <Navbar />
        <div className = "container mx-auto p-9">
    
        <p>Track price for: {asin}</p>
        <DisplayChart chartData = {chartData}/>
        </div>
       

     </div>
    );
}