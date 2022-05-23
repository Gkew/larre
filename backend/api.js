let db;
const express = require("express");

function runQuery(tableName, req, res, parameters, sqlForPreparedStatement, onlyOne = false) {
  let result;
  try {
    result = db.run(sqlForPreparedStatement, parameters);
  }
  catch (error) {
    result = { _error: error + '' };
  }
  if (onlyOne) { result = result[0]; }
  result = result || null;
  res.status(result ? (result._error ? 500 : 200) : 404);
  setTimeout(() => res.json(result), 1);
}

module.exports = function setupRESTapi(app, databaseConnection) {

  db = databaseConnection;

  app.get('/api/tables', (req, res) => res.json(db.tables));
  app.get('/api/views', (req, res) => res.json(db.views));

  for (let name of [...db.tables, ...db.views]) {

    app.get('/api/' + name, (req, res) => {
      runQuery(name, req, res, {}, `
        SELECT *
        FROM ${name}
      `);
    });

    app.get('/api/' + name + '/:id', (req, res) => {
      runQuery(name, req, res, req.params, `
        SELECT *
        FROM ${name}
        WHERE sodasID = $id
      `, true);
    });
    //Missing the CONTINUE in the api
    if (db.views.includes(name)) {
      continue;
    }

    app.post('/api/' + name, (req, res) => {
      delete req.body.id;
      runQuery(name, req, res, req.body, `
        INSERT INTO ${name} (${Object.keys(req.body)})
        VALUES (${Object.keys(req.body).map(x => '$' + x)})
      `);
    });

    let putAndPatch = (req, res) => {
      runQuery(name, req, res, { ...req.body, ...req.params }, `
        UPDATE ${name}
        SET ${Object.keys(req.body).map(x => x + ' = $' + x)}
        WHERE sodasID = $id
      `);
    };

    app.put('/api/' + name + '/:id', putAndPatch);
    app.patch('/api/' + name + '/:id', putAndPatch);

    app.delete('/api/' + name + '/:id', (req, res) => {
      runQuery(name, req, res, req.params, `
        DELETE FROM ${name}
        WHERE sodasID = $id
      `);
    });

  }

  app.all('/api/*', (req, res) => {
    res.status(404);
    res.json({ _error: 'No such route!' });
  });

  app.use((error, req, res, next) => {
    if (error) {
      let result = {
        _error: error + ''
      };
      res.json(result);
    }
    else {
      next();
    }
  });

}

const formidable = require('formidable')
const fs = require('fs')

const app = express();

app.use(express.json())

// endpoint to handle formData uploads
app.post('/api/upload', (req, res) => {
  // uses npm module 'formidable' to read the formData
  const form = formidable();

  form.parse(req, (fields, file) => {

    // get the file, from file
    file = file.file

    // open file with 'fs' to enable it to be 
    // saved as a file
    let fileData = fs.readFileSync(file.path)
    fs.writeFileSync(__dirname + './public/images' + file.name, fileData)

    res.json({ fields, file });
  });
});

// serve /www folder to let clients read from uploads
app.use(express.static(__dirname + './public/images'))