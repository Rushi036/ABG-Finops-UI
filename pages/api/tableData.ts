import axios from "axios";

const baseURL = "http://localhost:8000/";
export async function tableData(id:any) {
  // console.log("-------------",id)
  return await axios.get(baseURL+"topology_table_data?bu_id="+id)
}
