# mongoose-morgan

[![dependencies Status](https://david-dm.org/nemanjapetrovic/mongoose-morgan/status.svg)](https://david-dm.org/nemanjapetrovic/mongoose-morgan)
[![devDependencies Status](https://david-dm.org/nemanjapetrovic/mongoose-morgan/dev-status.svg)](https://david-dm.org/nemanjapetrovic/mongoose-morgan?type=dev)
[![Known Vulnerabilities](https://snyk.io/test/github/nemanjapetrovic/mongoose-morgan/badge.svg?targetFile=package.json)](https://snyk.io/test/github/nemanjapetrovic/mongoose-morgan?targetFile=package.json)

[![NPM](https://nodei.co/npm/mongoose-morgan.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/mongoose-morgan/)

Is npm package which is combining [mongoose](https://www.npmjs.com/package/mongoose) and [morgan](https://www.npmjs.com/package/morgan) packages by adding an additional functionality to log morgan data into MongoDB database.

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

# Detailed usage

[mongoose-morgan](https://www.npmjs.com/package/mongoose-morgan) is accepting three parameters:

- mongoData : object type with next properties
    - required {string} connectionString
    >- optional {string} collection
    >- optional {string} user
    >- optional {string} pass
    >- optional {bool} capped ([pull req](https://github.com/nemanjapetrovic/mongoose-morgan/pull/2) by @Ni55aN)
    >- optional {int} cappedSize ([pull req](https://github.com/nemanjapetrovic/mongoose-morgan/pull/2) by @Ni55aN)
    >- optional {int} cappedMax ([pull req](https://github.com/nemanjapetrovic/mongoose-morgan/pull/2) by @Ni55aN)
    >- optional {string} dbName ([pull req](https://github.com/nemanjapetrovic/mongoose-morgan/pull/5) by @pmstss)
    >- optional {bool} useNewUrlParser (default: true)
    >- optional {bool} useUnifiedTopology (default: true) ([issue #8](https://github.com/nemanjapetrovic/mongoose-morgan/issues/8))
- options : object type - [standrad morgan options](https://github.com/expressjs/morgan#options)
- format : string type - [standrad mrogan format](https://github.com/expressjs/morgan#predefined-formats)

Example without morgan options:

```
app.use(morgan({
    connectionString: 'mongodb://localhost:27017/logs-db'
   }, {}, 'short'
));
```

Full example:

```
app.use(morgan({
    collection: 'error_logger',
    connectionString: 'mongodb://localhost:27017/logs-db',
    user: 'admin',
    pass: 'test12345'
   },
   {
    skip: function (req, res) {
        return res.statusCode < 400;
    }
   },
   'dev'
));
```

The code above will log data in `dev` format and will skip logging if the response status code is less than 400. Data will be stored in `logs-db` database in `error_logger` collection.

# [Contribution](https://github.com/nemanjapetrovic/mongoose-morgan/blob/master/CONTRIBUTING.md)

Feel free to contribute by forking this repository, making changes, and submitting pull requests. For any questions or advice place an issue on this repository.

# License

  [MIT](LICENSE)
