import xlsx from "xlsx";
import { DataModel } from "./schema.js";

// Process data from Excel sheet
const processData = async () => {
  const excelFile = "./utils/user_data.xlsx";
  const workbook = xlsx.readFile(excelFile);
  const sheetName = workbook.SheetNames[0];
  const excelData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);

  const jsonWithTrees = excelData.map((item) => {
    const amount = item["amount"];
    const numberOfTrees = Math.floor(amount / 100);
    return {
      ...item,
      no_of_trees: numberOfTrees,
    };
  });

  return jsonWithTrees;
};

// Send processed data to DB
const sendData = async (req, res) => {
  try {
    const data = await processData();

    const result = await DataModel.insertMany(data);

    if (result.length === 0) {
      return res.status(400).json({
        message: "No data added",
      });
    }

    return res.status(200).json({
      message: "Data added successfully",
    });
  } catch (error) {
    console.error("Error inserting data into MongoDB", error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

// Render Certificates on HTML page
const renderCert = async (req, res) => {
  try {
    const fetch_result = await DataModel.find({});

    if (fetch_result.length === 0) {
      return res.status(400).json({
        message: "No data found",
      });
    }

    res.render("pages/index", {
      fetch_data: fetch_result,
    });
  } catch (error) {
    console.error("Error while rendering certificate:", error);
  }
};

// Fetch all data from DB
const fetchData = async (req, res) => {
  try {
    const result = await DataModel.find({});

    if (result.length === 0) {
      return res.status(400).json({
        message: "No data found",
      });
    }

    return res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete all data from DB
const deleteData = async (req, res) => {
  try {
    const result = await DataModel.deleteMany({});

    if (result.length === 0) {
      return res.status(400).json({
        message: "No data deleted",
      });
    }

    return res.status(200).json({
      message: "ALl data deleted successfully",
      result,
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export { sendData, fetchData, deleteData, renderCert };
