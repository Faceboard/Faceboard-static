var DBNAME = "faceboard_test";
var USERNAME = "Ron";
var PASSWORD = "chicken";

exports.DBURL = process.env.DATABASE_URL || "postgres://" +USERNAME+ ":" +PASSWORD+ "@localhost:5432/" +DBNAME;