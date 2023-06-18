const db = require("../config/db");

exports.generateTicket = async (req, res) => {
  const { passengerName, source, destination, busNumber } = req.body;

  try {

    const ticketCode = generateTicketCode();

    const query = `INSERT INTO tickets (ticket_code, passenger_name, source, destination, bus_number) 
                   VALUES (?, ?, ?, ?, ?)`;
    const values = [ticketCode, passengerName, source, destination, busNumber];

    await db.query(query, values);

    res.status(201).json({ ticketCode });
  } catch (error) {
    console.error("Error generating ticket:", error);
    res.status(500).json({ error: "Failed to generate ticket." });
  }
};


exports.getTicket = async (req, res) => {
  const { ticketCode } = req.params;

  try {
    const query = `SELECT * FROM tickets WHERE ticket_code = ?`;
    const values = [ticketCode];
    const [rows] = await db.query(query, values);
    if (rows.length === 0) {
      res.status(404).json({ error: "Ticket not found." });
    } else {
      const ticket = rows[0];
      res.status(200).json({ ticket });
    }
  } catch (error) {
    console.error("Error retrieving ticket:", error);
    res.status(500).json({ error: "Failed to retrieve ticket." });
  }
};


function generateTicketCode() {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";
  for (let i = 0; i < 8; i++) {
    code += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return code;
}
