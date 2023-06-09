import React, { useContext } from "react";
import {
  formatDateTimeInfo,
  extractDateTimeInfo,
  IDate,
  extractTimeOnlyInfo,
  extractDateOnlyInfo,
} from "../utils/dateUtils";
import { AppContext } from "../App";

export interface IScreening {
  id: number;
  movie: number;
  room: number;
  startTime: IDate;
  endTime: IDate;
  ticketPrice: number;
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
  const { selectedMovie } = useContext(AppContext);

  return (
    <div
      className={`screeningEntry ${
        selectedScreening?.id === screening.id ? "selected" : ""
      }`}
      onClick={() => onClick(screening)}
    >
      <table className="screeningTable">
        <tbody>
          <tr>
            <td>Movie:</td>
            <td>{selectedMovie?.title}</td>
          </tr>
          <tr>
            <td>Ticket price:</td>
            <td>{screening.ticketPrice} PLN</td>
          </tr>
          <tr>
            <td>Room:</td>
            <td>{screening.room}</td>
          </tr>
          <tr>
            <td>Duration:</td>
            <td>{selectedMovie?.duration} min</td>
          </tr>
          <tr>
            <td>Date: </td>
            <td>{extractDateOnlyInfo(screening.startTime.toString())}</td>
          </tr>
          <tr>
            <td>Start Time:</td>
            <td>{extractTimeOnlyInfo(screening.startTime.toString())}</td>
          </tr>
          <tr>
            <td>End Time:</td>
            <td>{extractTimeOnlyInfo(screening.endTime.toString())}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
