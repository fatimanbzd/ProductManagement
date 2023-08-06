import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

export default function CustomerSearchBar(props) {
  const [myOptions, setMyOptions] = useState([]);

  useEffect(() => {
    const res = props.customers;

    for (var i = 0; i < res.length; i++) {
      if (!myOptions.some((obj) => obj.label == res[i].name)) {
        let object = {
          id: res[i].id,
          label: res[i].fullName,
        };
        myOptions.push(object);
      }
    }

    setMyOptions(myOptions);
  }, []);

  return (
    <div>
      <Autocomplete
        Style={{ width: 400 }}
        autoComplete
        autoHighlight
        freeSolo
        options={myOptions}
        onChange={(event, value) => props.onSelectedCustomer(value)}
        renderInput={(data) => (
          <TextField {...data} variant="outlined" label="Search Box" />
        )}
      />
    </div>
  );
}
