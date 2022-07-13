const { PORT } = require("./config");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const security = require("./middleware/security");
const authRoutes = require("./routes/auth");
//const activityRoutes = require("./routes/activity");
const nutritionRoutes = require("./routes/nutrition");

const { BadRequestError, NotFoundError } = require("./utils/errors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));

app.use(security.extractUserFromJwt);

app.use("/auth", authRoutes);
//app.use("/activity", activityRoutes);
app.use("/nutrition", nutritionRoutes);

// 404 error handler
app.use((req, res, next) => {
  return next(new NotFoundError());
});

// generic error handler
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message;
  return res.status(status).json({
    error: { message, status },
  });
});

app.listen(PORT, () => {
  console.log(`Server running http://localhost:${PORT}`);
});
