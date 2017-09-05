# [mongoose-morgan](https://www.npmjs.com/package/mongoose-morgan) logger

Is an npm package which is combining [mongoose](https://www.npmjs.com/package/mongoose) and [morgan](https://www.npmjs.com/package/morgan) packages and adding aditional functinality to log morgan data into MongoDb.

# Install

To install this package just run:

```npm install mongoose-morgan```

# Basic usage example

Here is an example of using mongoose-morgan together with the express app:

```
// express
var express = require('express');
var app = express();

// mongoose-morgan
var morgan = require('mongoose-morgan');

// connection-data
var port = process.env.port || 8080;

// Logger
app.use(morgan({
    connectionString: 'mongodb://localhost:27017/logs-db'
}));

// run
app.listen(port);
console.log('works... ' + port);
```

The example from the above will create inside `logs-db` database collection called `logs` and will store data inside it.

# Detaild usage

[mongoose-morgan](https://www.npmjs.com/package/mongoose-morgan) is accepting three parameters:

- mongoData : object type
- options : object type - [standrad morgan options](https://github.com/expressjs/morgan#options)
- format : string type - [standrad mrogan format](https://github.com/expressjs/morgan#predefined-formats)

Example:

```
app.use(morgan({
    collection: 'error-logger'
    connectionString: 'mongodb://localhost:27017/logs-db',
    user: 'admin',
    pass: 'test12345'
   },
   {
    skip: function (req, res) {
        return res.statusCode < 400
    }
   },
   'dev'
));
```

The code above will log only data in `dev` format and will skip all logs if the response status code is less then 400. Data will be stored in `logs-db` database in `error-logger` collection.

# [Contribution](https://github.com/nemanjapetrovic/dev-env-setup/blob/master/CONTRIBUTING.md)

Feel free to contribute by forking this repository, making some changes, and submitting pull requests. For any questions or advice place an issue on this repository.

# License

  [MIT](LICENSE)