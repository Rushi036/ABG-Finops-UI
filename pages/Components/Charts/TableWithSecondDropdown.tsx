import Link from "next/link";
import CloseIcon from "@mui/icons-material/Close";
import React, { useEffect, useState } from "react";
import { GetAllResourceTypes } from "@/pages/api/FinopsApi/GetAllResourceTypes";
import { GetTagedAndUnTagedCostSelectedResourceType } from "@/pages/api/FinopsApi/GetTagedAndUnTagedCostSelectedResourceType";
import { GetTagedAndUnTagedCostSelectedTagName } from "@/pages/api/FinopsApi/GetTagedAndUnTagedCostSelectedTagName";

const TableWithSecondDropdown = (cloud: any) => {
  //   console.log("datain second tble", cloud);
  const [data, setData] = useState<any>();
  const [firstdropDowndata, setfirstDropDowndata] = useState<any>();
  const [secdropDowndata, setSecDropDowndata] = useState<any>();
  const [firstDropdownValue, setFirstDropdownValue] = useState<any>();
  const [secondDropdownValue, setSecondDropdownValue] = useState<any>();
  const rowPerPage = 5;
  const [status, setStatus] = useState<any>(null);
  //   const totalRows = data?.Table?.data?.length;
  const [totalRows, setTotalRows] = useState<any>();
  const totalPages = Math.ceil(totalRows / rowPerPage);
  const [page, setPage] = useState<any>(1);
  const [isOpen, setIsOpen] = useState<any>(false);
  const [tableView, settableView] = useState<any>(true);
  const [searchInput, setSearchInput] = useState<string>("");
  const [filteredData, setFilteredData] = useState<any>(data?.data);

  const currentData = filteredData?.slice(
    rowPerPage * page - rowPerPage,
    rowPerPage * page
  );

  const secondDropdownDataAWS: any = {
    "Business Name": "business",
    "Entity Name": "Entity Name",
    "Unit Name": "Unit Name",
    "Department Name": "department",
    "Cost Center": "cost_centre_name",
    "Cost Center Code": "cost_centre_code",
    L5: "L5",
    Sponsor: "Sponsor",
    "Business Infra Owner": "Business Infra Owner",
    "App-Name": "application_name",
    "Application Owner": "application_owner",
    Environment: "environment",
    Requestor: "Requestor",
    "Request ID": "Request ID",
    "Business criticality": "Business criticality",
    Zone: "Zone",
  };
  const secondDropdownDataAzure: any = {
    "Business Name": "Business Name",
    "Entity Name": "Entity Name",
    "Unit Name": "Unit Name",
    "Department Name": "department_name",
    "Cost Center": "cost_centre",
    "Cost Center Code": "cost_centre_code",
    L5: "L5",
    Sponsor: "Sponsor",
    "Business Infra Owner": "Business Infra Owner",
    "App-Name": "Application_Name",
    "Application Owner": "Application Owner",
    Environment: "Environment",
    Requestor: "Requestor",
    "Request ID": "Request ID",
    "Business criticality": "Business criticality",
    Zone: "Zone",
  };
  useEffect(() => {
    setPage(1);
    // Filter data based on search input
    const filtered =
      data &&
      data.Table &&
      data.Table[0] &&
      data.Table[0].data &&
      data.Table[0].data.filter((rowData: any) => {
        return rowData.some((item: any) =>
          item[1]
            ? item[1]
                .toString()
                .toLowerCase()
                .includes(searchInput.toLowerCase())
            : item[0]
                .toString()
                .toLowerCase()
                .includes(searchInput.toLowerCase())
        );
      });
    setFilteredData(filtered);
  }, [data?.Table, searchInput, secondDropdownValue]);
  // console.log("filtered",filteredData)
  useEffect(() => {
    if (cloud.type == "secondDropdown" && cloud.cloud) {
      if (cloud.cloud == "AWS") {
        setSecDropDowndata(secondDropdownDataAWS);
        setSecondDropdownValue(Object.values(secondDropdownDataAWS)[0]);
      } else if (cloud.cloud == "Azure") {
        setSecDropDowndata(secondDropdownDataAzure);
        setSecondDropdownValue(Object.values(secondDropdownDataAzure)[0]);
      }
    }
  }, [cloud.cloud, cloud.type]);
  // console.log("second dropdown",secdropDowndata)
  // console.log("second dropdown value",secondDropdownValue)
  // console.log("second dropdown 1st value",Object.values(secondDropdownDataAWS)[0])
  useEffect(() => {
    if (secondDropdownValue) {
      GetTagedAndUnTagedCostSelectedTagName(
        cloud.cloud,
        secondDropdownValue
      ).then((data: any) => {
        // console.log("data in second", data);
        setData(data.data);
        data &&
          data.data &&
          data.data.Table &&
          data.data.Table[0] &&
          data.data.Table[0].data &&
          setTotalRows(data.data.Table[0].data.length);
        // if (data && data?.status != 200) {
        //   //   console.log(Object.keys(data.data).length, data.status)
        //   setStatus(data.status);
        // } else if (Object.keys(data.data).length === 0 && data?.status == 200) {
        //   setStatus("404");
        // }
      });
    }
  }, [secondDropdownValue]);

  // console.log("totalrows", totalRows);
  //   data && data.Table && data.Table.data && console.log("data table in second", data.Table.data.length);
  //   console.log("firstdropdowndata", firstdropDowndata);
  return (
    <>
      <div className="items-center pb-4 px-4">
        <label className="text-sm font-semibold">
          {data?.Table && data?.Table[0] && data?.Table[0].title
            ? data?.Table[0].title
            : ""}
        </label>
        {/* <div className="mt-4 mb-2"> */}
        <div className="flex mt-4 justify-between">
          <div>
            <input
              type="text"
              placeholder="Search..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="border max-h-7 px-2 py-1 rounded-sm"
            />
          </div>
          <div>
            {secdropDowndata && (
              <select
                value={secondDropdownValue}
                onChange={(e) => setSecondDropdownValue(e.target.value)}
                className="border text-xs max-h-7 px-2 py-[0.32rem] rounded-sm ml-2"
              >
                <option value="" disabled>
                  Select...
                </option>
                {Object.keys(secdropDowndata).map((key, index) => (
                  <option key={index} value={secdropDowndata[key]}>
                    {key}
                  </option>
                ))}
              </select>
            )}
          </div>
        </div>

        {/* </div> */}

        <div className="relative overflow-x-auto mt-6 rounded-md">
          <table className="w-full text-sm text-center text-gray-800">
            <thead
              className="text-xs text-white uppercase "
              style={{
                background:
                  "linear-gradient(90deg, #AF1E23 -43.96%, #F37032 112.99%)",
              }}
            >
              <tr>
                {/* <th>SrNo</th> */}
                {data &&
                  data.Table &&
                  data.Table[0] &&
                  data?.Table[0].headers &&
                  data?.Table[0].headers?.map((header: any, index: any) => (
                    <th className="px-auto py-3" key={index} scope="col">
                      {header}
                    </th>
                  ))}
              </tr>
            </thead>
            <tbody>
              {currentData &&
                currentData?.map((rowData: any, rowIndex: any) => (
                  <tr key={rowIndex}>
                    {/* <td>{rowIndex + 1}</td> */}
                    {rowData &&
                      rowData.map((item: any, index: any) => (
                        <td className="px-auto py-3" key={index}>
                          {item[0] === "actionButtonViewTable" ? (
                            <button
                              className="btn bg-blue-400 px-2 py-1 rounded-sm text-white font-medium"
                              onClick={() => setIsOpen(true)}
                            >
                              View
                            </button>
                          ) : (
                            item[1]
                          )}
                        </td>
                      ))}
                  </tr>
                ))}
              {currentData?.length === 0 ||
              filteredData === undefined ||
              filteredData === null ? (
                <tr>
                  <td colSpan={100} className="py-2">
                    No data
                  </td>
                </tr>
              ) : (
                ""
              )}
            </tbody>
          </table>
          <div className="mt-2 table-pagination w-full flex items-center justify-end gap-2">
            <button
              onClick={() => setPage(page - 1)}
              className="py-1 px-2 rounded border disabled:text-slate-400"
              disabled={page === 1}
            >
              Previous
            </button>
            <button
              onClick={() => setPage(page + 1)}
              className="py-1 px-2 rounded border disabled:text-slate-400"
              disabled={page >= totalPages}
            >
              Next
            </button>
            <div>
              page: {page} / {isNaN(totalPages) ? 1 : totalPages}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TableWithSecondDropdown;
