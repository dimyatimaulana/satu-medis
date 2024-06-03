import Customers from "../models/CustomerModel.js";

export const getCustomers = async (req, res) => {
  try {
    const response = await Customers.findAll();
    res.json(response);
  } catch (error) {
    console.log(error);
    res.json({ message: "Failed to get all customers" });
  }
};

export const createCustomer = async (req, res) => {
  const { firstname, lastname, address, phone, whatsapp } = req.body;
  try {
    await Customers.create({
      firstname: firstname,
      lastname: lastname,
      address: address,
      phone: phone,
      whatsapp: whatsapp,
    });
    res.json({ message: "Customer addded successfully" });
  } catch (error) {
    console.log(error);
    res.json({ message: "Failed to add new customer" });
  }
};

export const updateCustomer = async (req, res) => {
  const customer = await Customers.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!customer)
    return res.status(404).json({ message: "Customer is not found" });
  const { firstname, lastname, address, phone, whatsapp } = req.body;
  let updateFirstname;
  let updateLastname;
  let updateAddress;
  let updatePhone;
  let updateWhatsapp;
  if (firstname === "" || firstname === null) {
    updateFirstname = customer.firstname;
  } else {
    updateFirstname = firstname;
  }
  if (lastname === "" || lastname === null) {
    updateLastname = customer.lastname;
  } else {
    updateLastname = lastname;
  }
  if (address === "" || address === null) {
    updateAddress = customer.address;
  } else {
    updateAddress = address;
  }
  if (phone === "" || phone === null) {
    updatePhone = customer.phone;
  } else {
    updatePhone = phone;
  }
  if (whatsapp === "" || whatsapp === null) {
    updateWhatsapp = customer.whatsapp;
  } else {
    updateWhatsapp = whatsapp;
  }
  try {
    await Customers.update(
      {
        firstname: updateFirstname,
        lastname: updateLastname,
        address: updateAddress,
        phone: updatePhone,
        whatsapp: updateWhatsapp,
      },
      {
        where: {
          id: customer.id,
        },
      }
    );
    res.status(200).json({ message: "Customer updated" });
  } catch (error) {
    console.log(error);
    if (error.response) {
      res.status(400).json({ message: "Customer update failed" });
    }
  }
};

export const deleteCustomer = async (req, res) => {
  const customers = await Customers.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!customers)
    return res.status(404).json({ message: "Customers is not found" });
  try {
    await Customers.destroy({
      where: {
        id: customers.id,
      },
    });
    res.status(200).json({ message: `${customers.firstname} deleted` });
  } catch (error) {
    res
      .status(400)
      .json({ message: `Failed to delete ${customers.firstname}` });
  }
};
