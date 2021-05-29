import cors from "cors";

const corsOptions = {
  origin: ["https://studiobnb.com", "https://qa.studiobnb.com"],
  optionSuccessStatus: 200,
};

export default cors(corsOptions);
