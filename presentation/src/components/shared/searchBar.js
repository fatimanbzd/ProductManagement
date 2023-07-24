import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";


export default function SearchBar(props) {
   const [myOptions, setMyOptions] = useState([]);



   useEffect(() => 
   { 
      const res = props.products;
      //console.log(props.products);
      for (var i = 0; i < res.length; i++) {
        
            if (!myOptions.some((obj) => obj.label == res[i].name)) {
               
               let object = {
                id:res[i].id,
                  label: res[i].name,
                  code: res[i].code,
               };
               myOptions.push(object);
            }
         }
         setMyOptions(myOptions);
   }, [myOptions]);

   
   return (
      <div>

   
         <Autocomplete
            Style = {{ width: 400 }}
            autoComplete
            autoHighlight
            freeSolo
            options={myOptions}
            onChange={(event, value) =>  props.onSelectedProduct(value)} 
            renderInput = {(data) => (
               <TextField {...data} variant = "outlined" label = "Search Box"/>
               
            )}
         />
      </div>
   );
}