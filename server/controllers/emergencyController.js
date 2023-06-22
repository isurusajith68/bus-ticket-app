const db = require("../config/db");
const { Vonage } = require("@vonage/server-sdk");

exports.storeEmergencyDetails = async (req, res) => {
  const {
    emergencyId,
    emergencyType,
    busNo,
    routeNo,
    routeName,
    date,
    time,
    location,
  } = req.body;

  try {
    const query = `INSERT INTO emergencies (emergency_id, emergency_type,bus_number,route_no ,route_name, date,time,location) VALUES (?, ?, ?,?, ?, ?,?,?)`;
    const values = [
      emergencyId,
      emergencyType,
      busNo,
      routeNo,
      routeName,
      date,
      time,
      location,
    ];
    await db.query(query, values);

    // sendSMS(
    //   emergencyId,
    //   emergencyType,
    //   busNo,
    //   routeNo,
    //   routeName,
    //   date,
    //   time,
    //   location
    // );

    res.status(200).json({ message: "Insert successfully." });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Failed insert details." });
  }
};


//send sms

// function sendSMS(
//   emergencyId,
//   emergencyType,
//   busNo,
//   routeNo,
//   routeName,
//   date,
//   time,
//   location
// ) {
//   const vonage = new Vonage({
//     apiKey: "0c553305",
//     apiSecret: "fDdJjGoCpm5TRmmG",
//   });
//   const from = "free";
//   const to = "94765280144";
//   const text =
//     "Emergency Id: " +
//     emergencyId +
//     " Emergency Type: " +
//     emergencyType +
//     " Bus Number: " +
//     busNo +
//     " Route No: " +
//     routeNo +
//     " Route Name: " +
//     routeName +
//     " Date: " +
//     date +
//     " Time: " +
//     time +
//     " Location: " +
//     location +
//     "";

//   async function sendSMS() {
//     await vonage.sms
//       .send({ to, from, text })
//       .then((resp) => {
//         console.log("Message sent successfully");
//         console.log(resp);
//       })
//       .catch((err) => {
//         console.log("There was an error sending the messages.");
//         console.error(err);
//       });
//   }

//   sendSMS();
// }
