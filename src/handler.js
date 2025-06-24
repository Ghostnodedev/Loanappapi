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

const getdetails = async (req, res) => {
  try {
    const user = req.body;
    console.log(user);
    if (!user) {
      return res.status(400).json({
        status: false,
        message: "Please provide details",
        });
    }
    const loan = await process(user);
    console.log(loan)
    if(loan){
      return{
        res: { message: "Data already exists" }
      }
    }
    if(!loan){
      return{
        res: { message: "Data does not exist you can proceed" }
      }
    }
  } catch (error) {}
};
module.exports = getdetails;


const process = async () => {
  try {
    const details = await getdetails();

    const userdetails = {
      name: details.name,
      bank: details.bankname,
      bankacc: details.bankacc,
      phone: details.phone,
      email: details.email,
    };

    const dbdet = {
      name: details.name,
      bank: details.bankname,
      bankacc: details.bankacc,
      phone: details.phone,
      email: details.email,
    };

    const isMatch = JSON.stringify(userdetails) === JSON.stringify(dbdet);

    if (isMatch) {
      console.log("Matched");
      return {
        res: { message: "Data already exists" }
      };
    }
    console.log("Not matched, continue...");
    return {
      res: { message: "New data or needs update" }
    };

  } catch (error) {
    console.error("Error in process:", error);
    return {
      res: { error: "Internal server error" }
    };
  }
};


export async function fetchUsers() {
  const users = await get("users");
  return users;
}
