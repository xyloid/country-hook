import React, { useState, useEffect } from "react";
import axios from "axios";

const useField = (type) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return {
    type,
    value,
    onChange,
  };
};

const useCountry = (name) => {
  const [country, setCountry] = useState(null);

  let _name = name;

  // https://restcountries.eu/rest/v2/name/{name}?fullText=true
  useEffect(() => {
    if (_name.trim() !== "") {
      axios
        .get(`https://restcountries.eu/rest/v2/name/${_name}?fullText=true`)
        .then((res) => {
          setCountry({ data: { ...res.data[0] }, found: res.data.length > 0 });
          console.log("response ", res.data[0]);
          console.log({ data: { ...res.data[0] }, found: res.data.length > 0 });
        });
    }
  }, [_name]);

  const setName = (name) => {
    _name = name;
  };

  return { country, setName };
};

const Country = ({ country }) => {
  if (!country) {
    return null;
  }

  if (!country.found) {
    return <div>not found...</div>;
  }

  return (
    <div>
      <h3>{country.data.name} </h3>
      <div>capital {country.data.capital} </div>
      <div>population {country.data.population}</div>
      <img
        src={country.data.flag}
        height="100"
        alt={`flag of ${country.data.name}`}
      />
    </div>
  );
};

const App = () => {
  const nameInput = useField("text");
  const [name, setName] = useState("");
  const country = useCountry(name);

  const fetch = (e) => {
    e.preventDefault();
    setName(nameInput.value);
    country.setName(name);
  };

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country.country} />
    </div>
  );
};

export default App;
