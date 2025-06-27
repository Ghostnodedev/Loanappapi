// "use strict";
import { get } from "@vercel/edge-config";

const login = async (req, res) => {
  const store = [];
  const data = req.body;
  console.log("data is : ", data);
  for (const user of data) {
    const name = user.name;
    const password = user.password;
    const email = user.email;
    const phone = user.phone;
    if (!name || !password || !email || !phone) {
      return {
        status: false,
        message: "Please fill all the fields",
      };
    }
    console.log(name, password, email, phone);
    store.push({ name, password, email, phone, address });
    console.log(store);
  }
  res.send(store);
};
module.exports = login;

const register = async (req, res) => {
  const reg = [];
  console.log("Initial reg array:", reg);

  const data = req.body;
  console.log("Incoming data:", data);

  try {
    if (!Array.isArray(data) || data.length === 0) {
      return res.status(400).json({
        status: false,
        message: "No user data provided",
      });
    }

    for (const user of data) {
      const { name, password, email, phone, address, dateofbirth: dob } = user;

      // Basic field presence check
      if (!name || !password || !email || !phone || !address || !dob) {
        return res.status(400).json({
          status: false,
          message: "Please fill all the fields",
        });
      }

      // Optional: Add basic format validation
      if (!/^\S+@\S+\.\S+$/.test(email)) {
        return res
          .status(400)
          .json({ status: false, message: "Invalid email format" });
      }

      if (!/^\d{10}$/.test(phone)) {
        return res
          .status(400)
          .json({ status: false, message: "Invalid phone number" });
      }

      reg.push({ name, password, email, phone, address, dob });
    }

    console.log("Final registered users:", reg);
    res.status(200).json({ status: true, data: reg });
  } catch (error) {
    console.error("Error in register API:", error);
    res.status(500).json({
      status: false,
      message: "Server error while registering users",
    });
  }
};

module.exports = register;

// const fetchUsers = async () => {
//   const users = await get("users");
//   return users;
// };

// const fetchFromDB = async (user) => {
//   const users = await fetchUsers();

//   return users.find((u) =>
//     u.email === user.email &&
//     u.phone === user.phone &&
//     u.bank_account_number === user.bank_account_number
//   );
// };

// const process = async (user) => {
//   try {
//     const existing = await fetchFromDB(user);

//     if (!existing) return false;

//     const relevantKeys = [
//       "name",
//       "email",
//       "phone",
//       "bank_name",
//       "bank_account_number",
//     ];

//     const inputFiltered = Object.fromEntries(
//       Object.entries(user).filter(([key]) => relevantKeys.includes(key))
//     );

//     const dbFiltered = Object.fromEntries(
//       Object.entries(existing).filter(([key]) => relevantKeys.includes(key))
//     );

//     const isMatch = JSON.stringify(inputFiltered) === JSON.stringify(dbFiltered);
//     return isMatch;
//   } catch (error) {
//     console.error("Error in process:", error);
//     throw error;
//   }
// };

// const getdetails = async (req, res) => {
//   try {
//     const user = req.body;

//     if (!user || Object.keys(user).length === 0) {
//       return res.status(400).json({
//         status: false,
//         message: "Please provide user details in the request body",
//       });
//     }

//     const exists = await process(user);

//     if (exists) {
//       return res.status(200).json({
//         status: true,
//         message: "Data already exists",
//       });
//     } else {
//       return res.status(200).json({
//         status: false,
//         message: "Data does not exist, you can proceed",
//       });
//     }
//   } catch (error) {
//     console.error("Error in getdetails:", error);
//     return res.status(500).json({
//       status: false,
//       message: "Internal Server Error",
//     });
//   }
// };

// module.exports = getdetails;

// Simulated DB fetch function (replace with your actual DB call)
const fetchFromDB = async () => {
  const users = await get("users"); // your DB fetch function
  return users; // array of user objects
};

const fetchdata = async (user) => {
  try {
    const users = await fetchFromDB();
    // Adjust keys as per your DB structure and user object
    const find = users.find((det) => {
      return (
        det.name === user.name &&
        det.email === user.email &&
        det.phone === user.phone &&
        det.aadhar_number === user.aadhar_number &&
        det.bank_account_number === user.bank_account_number
      );
    });

    if (find) {
      return {
        res: { message: "Data Already exists, you cannot apply" },
      };
    } else {
      return null; // no match
    }
  } catch (error) {
    console.error("Error in fetchdata:", error);
    throw error;
  }
};

const getdetails = async (req, res) => {
  try {
    const user = req.body;

    if (!user || Object.keys(user).length === 0) {
      return res.status(400).json({
        status: false,
        message: "Please provide user details in request body",
      });
    }

    const result = await fetchdata(user);
    const datavalid = await validdata(user);
    console.log(datavalid);
    if (!result) {
      return res.status(200).json({
        status: false,
        message: "User does not exist, you can apply",
      });
    } else {
      return res.status(200).json({
        status: true,
        message: result.res.message,
      });
    }
  } catch (error) {
    console.error("Error in getdetails:", error);
    return res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};

module.exports = getdetails;

const validdata = async (user) => {
  const data = user;

  if (
    !data.aadhar_number ||
    !data.pannumber ||
    !data.bank_account_number ||
    !data.bank
  ) {
    return {
      status: false,
      message: "Missing required fields",
    };
  }

  const aadhar = data.aadhar_number;
  const pan = data.pannumber;
  const bank = data.bank_account_number;
  const bankname = data.bank;

  if (!/^\d{12}$/.test(aadhar) || aadhar.startsWith("0")) {
    return { status: false, message: "Invalid aadhar number" };
  }

  if (!/^[A-Z]{5}\d{4}[A-Z]$/.test(pan) || pan.startsWith("0")) {
    return { status: false, message: "Invalid pan number" };
  }

  if (!/^\d{10}$/.test(bank)) {
    return { status: false, message: "Invalid bank account number" };
  }

  if (!bankname) {
    return { status: false, message: "Please provide bank name" };
  }

  if (user.pendingloan) {
    return { status: false, message: "You have a pending loan" };
  }

  const cibil = user.cibil;
  if (cibil < 720) {
    return { res: { message: "You're not eligible for the loan" } };
  } else if (cibil >= 720 && cibil <= 800) {
    return { res: { message: "You're eligible for 100000" } };
  } else if (cibil > 800 && cibil <= 900) {
    return { res: { message: "You're eligible for 2000000" } };
  } else if (cibil > 900) {
    return { res: { message: "You're eligible for 3000000" } };
  }

  return { status: true }; // default pass
};
