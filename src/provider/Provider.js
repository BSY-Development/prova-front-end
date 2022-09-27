import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import MyContext from '../context/context';

function Provider({ children }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const response = async () => {
      const api = 'http://localhost:9000/api/pessoas';
      const result = await fetch(api).then((result) => result.json());
      setData(result);
    };
    response();
  }, []);

  const contextValue = { data };
  return (
    <MyContext.Provider value={ contextValue }>
      { children }
    </MyContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
