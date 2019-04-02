// @ts-ignore
import useFetch from "fetch-suspense";
import { Moment } from "moment-timezone/moment-timezone";
import React from "react";
import Day from "./Day";

export interface ICalendarEvent {
  id: string;
  title: string;
  description: string;
  time: string;
  notification: boolean;
}

export interface IDayProps {
  selectedDay: Moment;
}

export interface IDayDataProviderResponse {
  data: ICalendarEvent[];
}

export default function DayDataProvider({ selectedDay }: IDayProps) {
  const { data }: IDayDataProviderResponse =
    useFetch(`/day?date=${selectedDay.format("YYYY-MM-DD")}`, { method: "GET" });

  return (
    <Day list={data} />
  );
}
