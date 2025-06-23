// "use strict";

// const mysql = require('mysql2/promise');

// const login = async (req, res) => {
//   const store = [];
//   const data = req.body;
//   console.log("data is : ", data);
//   for (const user of data) {
//     const name = user.name;
//     const password = user.password;
//     const email = user.email;
//     const phone = user.phone;
//     if (!name || !password || !email || !phone) {
//       return {
//         status: false,
//         message: "Please fill all the fields",
//       };
//     }
//     console.log(name, password, email, phone);
//     store.push({ name, password, email, phone, address });
//     console.log(store);
//   }
//   res.send(store);
// };
// module.exports = login;

// const register = async (req, res) => {
//   const reg = [];
//   console.log("Initial reg array:", reg);

//   const data = req.body;
//   console.log("Incoming data:", data);

//   try {
//     if (!Array.isArray(data) || data.length === 0) {
//       return res.status(400).json({
//         status: false,
//         message: "No user data provided",
//       });
//     }

//     for (const user of data) {
//       const { name, password, email, phone, address, dateofbirth: dob } = user;

//       // Basic field presence check
//       if (!name || !password || !email || !phone || !address || !dob) {
//         return res.status(400).json({
//           status: false,
//           message: "Please fill all the fields",
//         });
//       }

//       // Optional: Add basic format validation
//       if (!/^\S+@\S+\.\S+$/.test(email)) {
//         return res.status(400).json({ status: false, message: "Invalid email format" });
//       }

//       if (!/^\d{10}$/.test(phone)) {
//         return res.status(400).json({ status: false, message: "Invalid phone number" });
//       }

//       reg.push({ name, password, email, phone, address, dob });
//     }

//     console.log("Final registered users:", reg);
//     res.status(200).json({ status: true, data: reg });

//   } catch (error) {
//     console.error("Error in register API:", error);
//     res.status(500).json({
//       status: false,
//       message: "Server error while registering users",
//     });
//   }
// };

// module.exports = register;

// const getdetails = async(req,res)=>{
//     try {
//       const details = req.body 
//       console.log(details)
//       const {name, bankacc , bankname, address, phone, email, dob, gender, reason , martailstatus, pan , aadhar} = details
//       console.log(name, bankacc , bankname, address, phone, email, dob, gender, reason , martailstatus, pan , aadhar)
        
//     } catch (error) {
        
//     }
// } 

export default async function handler(req, res) {
  try {
    const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'Ghostroot',
    password: 'mysqldb2003',
    database: 'loan',
    waitForConnections: true,
    });

    const [rows] = await connection.execute('SELECT * FROM users');
    await connection.end(); // close connection

    res.status(200).json({ success: true, data: rows });
  } catch (error) {
    console.error('DB Error:', error);
    res.status(500).json({ success: false, error: error.message });
  }
}