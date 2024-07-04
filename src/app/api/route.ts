import { NextResponse } from "next/server";
import data1 from "./fonte1.json";
import data2 from "./fonte2.json";
import data3 from "./fonte3.json";
import data4 from "./fonte4.json";
import data5 from "./fonte5.json";

// SIMULATE API RESPONSE

export async function GET(req?: Request) {
  const url = new URL(req?.url ?? "");
  const source = url.searchParams.get("source");

  let jsonData = {};
  switch (source) {
    case "fonte1":
      jsonData = data1;
      break;
    case "fonte2":
      jsonData = data2;
      break;
    case "fonte3":
      jsonData = data3;
      break;
    case "fonte4":
      jsonData = data4;
      break;
    case "fonte5":
      jsonData = data5;
      break;
    default:
      jsonData = data1;
  }

  return NextResponse.json(jsonData);
}
