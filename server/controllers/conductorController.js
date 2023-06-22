const db = require("../config/db");

// Retrieve
exports.getConductor = async (req, res) => {
  const { conductorId } = req.params;
  console.log(conductorId);

  try {
    const query = "SELECT * FROM conductors WHERE id = ?";
    const values = [conductorId];
    const [rows] = await db.query(query, values);
    if (rows.length === 0) {
      res.status(404).json({ error: "conductor not found" });
    } else {
      const conductor = rows[0];
      res.status(200).json({ conductor });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve conductor" });
  }
};

exports.updateConductor = async (req, res) => {
  const { conductorId } = req.params;
  const { conductor_name, nic, conductor_no, age, email, conducter_license } =
    req.body;

  try {
    const query = `
      UPDATE conductors
      SET conductor_name = ?, nic = ?, conductor_no = ?, age = ?, email = ?, conducter_license = ?
      WHERE id = ?
    `;
    const values = [
      conductor_name,
      nic,
      conductor_no,
      age,
      email,
      conducter_license,
      conductorId,
    ];
    await db.query(query, values);

    res.status(200).json({ message: "Conductor updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed update" });
  }
};
