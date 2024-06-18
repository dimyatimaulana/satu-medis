import Products from "../models/ProductModel.js";

export const getProducts = async (req, res) => {
  try {
    const response = await Products.findAll();
    res.json(response);
  } catch (error) {
    console.log(error);
  }
};

export const getOneProduct = async (req, res) => {
  try {
    const product = await Products.findOne({
      where: {
        product_id: req.params.id,
      },
    });
    if (!product)
      return res.status(404).json({ message: "Product is not found" });
    res.json(product);
  } catch (error) {
    console.log(error);
    res.json({ message: "Failed to get the product" });
  }
}

export const createProducts = async (req, res) => {
  const { name, barcode, qty, price, cost } = req.body;
  if (price <= cost) {
    return res.status(400).json({ message: "Price must higher than cost"});
  }
  try {
    await Products.create({
      name: name,
      barcode: barcode,
      qty: qty,
      price: price,
      cost: cost,
    });
    res.json({ message: "Product addded successfully" });
  } catch (error) {
    console.log(error)
    res.json({ message: "Failed to add new product" });
  }
};

export const updateProduct = async (req, res) => {
  const product = await Products.findOne({
    where: {
      product_id: req.params.id,
    },
  });
  if (!product)
    return res.status(404).json({ message: "Product is not found" });
  const { name, barcode, qty, price, cost } = req.body;
  let updateName;
  let updateBarcode;
  let updateQty;
  let updatePrice;
  let updateCost;
  if (name === "" || name === null) {
    updateName = product.name;
  } else {
    updateName = name;
  }
  if (barcode === "" || barcode === null) {
    updateBarcode = product.barcode;
  } else {
    updateBarcode = barcode;
  }
  if (qty === "" || qty === null) {
    updateQty = product.qty;
  } else {
    updateQty = qty;
  }
  if (price === "" || price === null) {
    updatePrice = product.price;
  } else {
    updatePrice = price;
  }
  if (cost === "" || cost === null) {
    updateCost = product.cost;
  } else {
    updateCost = cost;
  }
  try {
    await Products.update(
      {
        name: updateName,
        barcode: updateBarcode,
        qty: updateQty,
        price: updatePrice,
        cost: updateCost,
      },
      {
        where: {
          product_id: product.product_id,
        },
      }
    );
    res.status(200).json({ message: "Product updated" });
  } catch (error) {
    if (error) {
      res.status(400).json({ message: "Product update failed" });
    }
  }
};

export const deleteProduct = async (req, res) => {
  const product = await Products.findOne({
    where: {
      product_id: req.params.id,
    },
  });
  if (!product)
    return res.status(404).json({ message: "Product is not found" });
  try {
    await Products.destroy({
      where: {
        product_id: product.product_id,
      },
    });
    res.status(200).json({ message: `${product.name} deleted` });
  } catch (error) {
    res.status(400).json({ message: `Failed to delete ${product.name}` });
  }
};
