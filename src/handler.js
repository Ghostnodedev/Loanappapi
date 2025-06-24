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

const fetchFromDB = async ()=>{
    const user = await get('users')
    console.log(user)
    return user
}

const fetchdata = async(user)=>{
  try {
    const users = await fetchFromDB()
    console.log(user)
    for(const u of user){
      const name = u.name
      const password = u.password
      const email = u.email
      const phone = u.phone
      const aadhar = u.aadhar
      const bankacc = u.bankacc
      const find = users.find((det)=>{
        return det.name === name && 
        det.password === password && 
        det.email === email && 
        det.phone === phone && 
        det.aadhar === aadhar && 
        det.bankacc === bankacc
      })
      if(find){
        return{
          res:{message:"Data Already exist you cannot apply"}
        }
      }
    }
  } catch (error) {
    console.error(error)
  }
}

const getdetails = async(req,res)=>{
  try {
    const user = req.body
    const users = await fetchdata(user)
    console.log(users)
    if(!users){
      return{
        res:{message:"User does not exist you cannot apply"}
      }
    }else{
      return{
        res:{message:"User exist you can apply"}
      }
    }
  } catch (error) {
    console.error(error.message)
  }
}
module.exports = getdetails;


