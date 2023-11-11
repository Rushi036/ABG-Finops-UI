import { finopsBaseUrl, finopsServerBaseUrl, localHostBaseUrl } from "@/const";
import { useState } from "react";

export const getAllSubscriptions = async (cloud: any) => {
  let retData: any;
  // console.log("details in  api", cloud);
  const res = await fetch(
    `${finopsServerBaseUrl}/getAllCloudSubsriptionsNameandIds?cloud=${cloud}`,
    // `${localHostBaseUrl}/getAllCloudSubsriptionsNameandIds?cloud=${cloud}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      // body: JSON.stringify(body),
    }
  )
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      retData = data;
    })
    .catch(() => {
      retData = {};
    });
  // console.log(retData);

  return retData;
};
