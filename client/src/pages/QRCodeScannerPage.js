import React, { useState } from "react";
import axios from "axios";
import QrReader from "react-qr-scanner";

const QRScanner = () => {
  const [scannedData, setScannedData] = useState("");
  const [ticketData, setTicketData] = useState({
    id: null,
    ticket_code: "",
    passenger_name: "",
    source: "",
    destination: "",
    bus_number: "",
    seat_number: "",
  });

  const handleScan = (data) => {
    if (data) {
      setScannedData(data.text);
      fetchTicketData(data.text);
    }
  };

  const handleError = (error) => {
    console.error("QR code scan error:", error);
  };

  const fetchTicketData = async (ticketCode) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/tickets/${ticketCode}`
      );
      const { ticket } = response.data;
      setTicketData(ticket);
    } catch (error) {
      console.error("Error retrieving ticket:", error);
      // Handle error state or display error message
    }
  };

  return (
    <div>
      <h2>QR Code Scanner</h2>
      <QrReader
        delay={300}
        onError={handleError}
        onScan={handleScan}
        style={{ width: "150px" }}
      />
      {scannedData && (
        <div>
          <h2>Scanned Data:</h2>
          <p>{scannedData}</p>
        </div>
      )}
      {ticketData.id && (
        <div>
          <h2>Ticket Data:</h2>
          <p >ID: {ticketData.id}</p>
          <p>Ticket Code: {ticketData.ticket_code}</p>
          <p>passenger Name: {ticketData.passenger_name}</p>
          <p>Source: {ticketData.source}</p>
          <p>Destination: {ticketData.destination}</p>
          <p>Bus Number: {ticketData.bus_number}</p>
          <p>Seat Number: {ticketData.seat_number}</p>
        </div>
      )}
    </div>
  );
};

export default QRScanner;
