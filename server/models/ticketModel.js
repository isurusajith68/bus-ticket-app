const db = require("../config/db");

class Ticket {
  constructor(ticketCode, passengerName, source, destination, busNumber) {
    this.ticketCode = ticketCode;
    this.passengerName = passengerName;
    this.source = source;
    this.destination = destination;
    this.busNumber = busNumber;
  }
e
  async save() {
    try {
      const query = `INSERT INTO tickets (ticket_code, passenger_name, source, destination, bus_number) 
                     VALUES (?, ?, ?, ?, ?)`;
      const values = [
        this.ticketCode,
        this.passengerName,
        this.source,
        this.destination,
        this.busNumber,
      ];

      await db.query(query, values);
    } catch (error) {
      console.error("Error saving ticket:", error);
      throw new Error("Failed to save ticket.");
    }
  }

  static async getByTicketCode(ticketCode) {
    try {
      const query = `SELECT * FROM tickets WHERE ticket_code = ?`;
      const values = [ticketCode];

      const [rows] = await db.query(query, values);

      if (rows.length === 0) {
        return null;
      } else {
        const ticketData = rows[0];
        return new Ticket(
          ticketData.ticket_code,
          ticketData.passenger_name,
          ticketData.source,
          ticketData.destination,
          ticketData.bus_number
        );
      }
    } catch (error) {
      console.error("Error retrieving ticket:", error);
      throw new Error("Failed to retrieve ticket.");
    }
  }
}

module.exports = Ticket;
