import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 3000;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  try {
    const response = await axios.get("https://bored-api.appbrewery.com/random");
    const result = response.data;
    res.render("index.ejs", { data: result });
  } catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: error.message,
    });
  }
});

app.post("/", async (req, res) => {
  console.log(req.body);
  try{
    const activityType = req.body.type;
    const participants = req.body.participants;
    const url= `https://bored-api.appbrewery.com/filter?type=${activityType}&participants=${participants}`;
    console.log("Request URL:", url);
    const response = await axios.get(url);
    const result = response.data[0];
    console.log("Response Data:", result);
    res.render("index.ejs", { data: result });
  }
  catch (error) {
    console.error("Failed to make request:", error.message);
    res.render("index.ejs", {
      error: error.message,
    });
  }
});

app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});
