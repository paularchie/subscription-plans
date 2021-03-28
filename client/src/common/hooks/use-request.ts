import axios from 'axios';
import { useState } from 'react';

const useRequest = () => {
  const [errors, setErrors] = useState(null);

  const doRequest = async ({ url, method, body, options }: any): Promise<any> => {
    try {
      setErrors(null);
      const response = await axios[method](url, { ...body, ...options });

      return response.data;
    } catch (err) {
      setErrors(err.response.data.errors);
    }
  };

  return { doRequest, errors }
};

export default useRequest;
