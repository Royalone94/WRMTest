/* Express */
let express = require("express");
let app = express();

/* Packages */
let compression = require("compression");
let mongoose = require("mongoose");
let morgan = require("morgan");
let bodyParser = require("body-parser");
let cors = require("cors");
let env = require("dotenv");
env.config();

/* Routes */
let routes = require("./routes/routes.js");

/*****************/
/*   PORTS       */
/*************** */

let port;
/* environment variables */
if (process.env.NODE_ENV == "dev") {
    if (process.env.PORT) {
        port = process.env.PORT;
    } else {
        var args = parseArgs(process.argv.slice(2), {
            port: "port"
        });

        if (args.port == undefined) {
            throw new Error(
                "To start server, must define PORT argument. --port <num>"
            );
        }
        port = args.port;
    }
} else if (
    process.env.NODE_ENV == "stg"
) {
    port = process.env.PORT;
} else if (process.env.NODE_ENV == "prod") {
    port = process.env.PORT;
    // add more config setup ~ to do list
} else {
    throw new Error(
        "Set up development variable. 'dev', 'stg', 'prod'"
    );
}

/* Testing environment */
if (process.env.NODE_ENV !== "accept") {
    // use morgan to log at command line
    app.use(morgan("combined")); //'combined' outputs the Apache style LOGs
}

/*****************/
/* APP SETTINGS  */
/*************** */
/* app.use # packages */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/json" }));
app.use(compression());
app.use(cors());

/* routes */
app.use("/api", routes);

/*****************/
/*   DATABASE    */
/*************** */

let options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};

if (!process.env.DBHost) {
    throw new Error(
        "Database Host Url is not defiend, Please check your .env file"
    );
}

mongoose.connect(process.env.DBHost, options).then(() => {
    let db = mongoose.connection;

    /* Mongoose fix depreciation promise */
    mongoose.Promise = Promise;

    /* Start API */
    app.listen(process.env.PORT, () => {
        console.log("# Running on port " + process.env.PORT + " #");
    });
}).catch((e) => {
    console.error.bind(e, "connection error:")
})

module.exports = app;