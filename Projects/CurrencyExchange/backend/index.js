import express from "express";
const app = express();
const PORT = 3000;

app.get("/data", async (req, res) => {
  try {
    const apiResponse = await fetch(
      "https://www.nrb.org.np/api/forex/v1/app-rate"
    );
    const data = await apiResponse.json();
    res.send(data);
  } catch (error) {
    console.error(error);
  }
});

app.listen(PORT, () => {
  console.log(`Running over the ${PORT}`);
});
