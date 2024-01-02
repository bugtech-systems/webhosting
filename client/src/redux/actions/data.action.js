

import axios from "axios";
import { env_vars } from 'utils/config';



export const uploadFile = (data) => dispatch => {
  //  dispatch(fetchStart());
  return axios.post(`${env_vars.api_url}/tbl_cervixexamination/file-upload`, data, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
};


