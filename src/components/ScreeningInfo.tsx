import React from "react";
import { formatDateTimeInfo, extractDateTimeInfo } from "../utils/dateUtils";

export interface IScreening {
  id: number;
  movie: number;
  room: number;
  startTime: Date;
  endTime: Date;
}

interface ScreeningInfoProps {
  screening: IScreening;
  selectedScreening: IScreening | null;
  onClick: (screening: IScreening) => void;
}

export const ScreeningInfo = ({
  screening,
  selectedScreening,
  onClick,
}: ScreeningInfoProps) => {
  return (
    <div
      className={`screeningEntry ${
        selectedScreening?.id === screening.id ? "selected" : ""
      }`}
      onClick={() => onClick(screening)}
    >
      <p>ID: {screening.id}</p>
      <p>Movie ID: {screening.movie}</p>
      <p>Room: {screening.room}</p>
      <p>
        Start Time:{" "}
        {formatDateTimeInfo(
          extractDateTimeInfo(screening.startTime.toString())
        )}
      </p>
      <p>
        End Time:{" "}
        {formatDateTimeInfo(extractDateTimeInfo(screening.endTime.toString()))}
      </p>
    </div>
  );
};
