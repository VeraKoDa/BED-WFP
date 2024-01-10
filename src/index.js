import * as Sentry from "@sentry/node";
// import { ProfilingIntegration } from "@sentry/profiling-node";
import { PrismaClient } from "@prisma/client";
import express from "express";
import "dotenv/config.js";
import logMiddleware from "./middleware/logMiddleware.js";
import loginRouter from "./routes/login.js";
import userRouter from "./routes/users.js";
import amenityRouter from "./routes/amenities.js";
import bookingRouter from "./routes/bookings.js";
import hostRouter from "./routes/hosts.js";
import propertyRouter from "./routes/properties.js";
import reviewRouter from "./routes/reviews.js";

const app = express();
const client = new PrismaClient();

// ************
// Sentry data
// ************
Sentry.init({
  dsn: process.env.SENTRY_DSN,
  integrations: [
    new Sentry.Integrations.Http({ tracing: true }), // enable HTTP calls tracing
    new Sentry.Integrations.Express({ app }), // enable Express.js middleware tracing
    new Sentry.Integrations.Prisma({ client }),
    // new ProfilingIntegration(),
  ],
  // Performance Monitoring
  tracesSampleRate: 1.0, //  Capture 100% of the transactions
  profilesSampleRate: 1.0, // Set sampling rate for profiling - this is relative to tracesSampleRate
});

app.use(Sentry.Handlers.requestHandler()); // The request handler must be the first middleware on the app
app.use(Sentry.Handlers.tracingHandler()); // TracingHandler creates a trace for every incoming request

// Let Express read json-files correctly
app.use(express.json());
// Log all requests
app.use(logMiddleware);

// Routers
app.use("/login", loginRouter);
app.use("/users", userRouter);
app.use("/amenities", amenityRouter);
app.use("/bookings", bookingRouter);
app.use("/hosts", hostRouter);
app.use("/properties", propertyRouter);
app.use("/reviews", reviewRouter);

app.get("/", (req, res) => {
  res.send("Hello world!");
});

// **************
// Error handling
// **************
app.use(Sentry.Handlers.errorHandler()); // The error handler must be before any other error middleware and after all controllers
app.use(function onError(err, req, res, next) {
  // Optional fallthrough error handler
  // The error id is attached to `res.sentry` to be returned
  // and optionally displayed to the user for support.
  res.statusCode = 500;
  res.end(res.sentry + "\n");
});

// ***********
// Listening data
// ***********
app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
