import React, { useState } from "react";
import axios from "axios";
import QRCode from "qrcode.react";

const TicketForm = () => {
  const [passengerName, setPassengerName] = useState("");
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [busNumber, setBusNumber] = useState("");
  const [ticketCode, setTicketCode] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/api/tickets/", {
        passengerName,
        source,
        destination,
        busNumber,
      });

      setTicketCode(response.data.ticketCode);
    } catch (error) {
      console.error("Error generating ticket:", error);
    }
  };
const handleDownload = () => {
  const canvas = document.getElementById("qrcode");
  const url = canvas.toDataURL("image/png");
  const link = document.createElement("a");
  link.href = url;
  link.download = "qrcode.png";
  link.click();
};

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Passenger Name:
          <input
            type="text"
            value={passengerName}
            onChange={(e) => setPassengerName(e.target.value)}
          />
        </label>
        <label>
          Source:
          <input
            type="text"
            value={source}
            onChange={(e) => setSource(e.target.value)}
          />
        </label>
        <label>
          Destination:
          <input
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />
        </label>
        <label>
          Bus Number:
          <input
            type="text"
            value={busNumber}
            onChange={(e) => setBusNumber(e.target.value)}
          />
        </label>

        <button type="submit">Generate Ticket</button>
      </form>

      {ticketCode && (
        <div>
          <h2>Ticket Code: {ticketCode}</h2>
          <QRCode id="qrcode" value={ticketCode} />
          <button onClick={handleDownload}>Download QR Code</button>
        </div>
      )}
    </div>
  );
};

export default TicketForm;
