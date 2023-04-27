// import { addFunko, eliminarFunko, listaFunkos, mostrarFunko} from './funciones.js';
// import { Funko } from './funko.js';
import { Tipo, Genero } from './types.js';
import express from 'express';


import { MongoClient } from 'mongodb';

const dbURL = 'mongodb://127.0.0.1:27017';
const dbName = 'funkos';


interface Funkos {
  nombre: string;
  descripcion: string;
  tipo: string;
  genero: string;
  franquicia: string;
  numero: number;
  exclusivo: boolean;
  caracteristicasEspeciales: string;
  valorMercado: number;
  ID: number;
  usuario: string;
}


const server = express();

/**
 * Función que maneja las peticiones GET
 */
server.get('/funkos', (req, res) => {
  if (req.query.usuario && !req.query.id) {
    MongoClient.connect(dbURL).then((client) => {
      const db = client.db(dbName);
    
      return db.collection<Funkos>(String(req.query.usuario)).find({}).toArray();
    }
    ).then((result) => {
      console.log(result);
      res.send(result);
    }
    ).catch((error) => {
      console.log(error);

    } 
    );
  }
  else if (req.query.usuario && req.query.id) {
    MongoClient.connect(dbURL).then((client) => {
      const db = client.db(dbName);
    
      return db.collection<Funkos>(String(req.query.usuario)).find({ID: Number(req.query.id)}).toArray();
    }
    ).then((result) => {
      console.log(result);
      res.send(result);
    }
    ).catch((error) => {
      console.log(error);
      res.send(error);
    } 
    );
  }
});

/**
 * Función que maneja las peticiones POST
 */
server.post('/funkos', (req, res) => {
  if (req.query.usuario && req.query.nombre && req.query.descripcion && req.query.tipo && req.query.genero && req.query.franquicia && req.query.numero && req.query.exclusivo && req.query.caracteristicasEspeciales && req.query.valorMercado && req.query.id) {
    MongoClient.connect(dbURL).then((client) => {
      const db = client.db(dbName);
    
      return db.collection<Funkos>(String(req.query.usuario)).insertOne({
        nombre: String(req.query.nombre),
        descripcion: String(req.query.descripcion),
        tipo: String(req.query.tipo),
        genero: String(req.query.genero),
        franquicia: String(req.query.franquicia),
        numero: Number(req.query.numero),
        exclusivo: Boolean(req.query.exclusivo),
        caracteristicasEspeciales: String(req.query.caracteristicasEspeciales),
        valorMercado: Number(req.query.valorMercado),
        ID: Number(req.query.id),
        usuario: String(req.query.usuario),
      });
    }).then((result) => {
      console.log(result);
      res.send(result);
    }
    ).catch((error) => {
      console.log(error);
      res.send(error);
    } 
    );
  } 
  else {
    res.send('Faltan argumentos');
  }
});

/**
 * Función que maneja las peticiones DELETE
 */
server.delete('/funkos', (req, res) => {
  if (req.query.id && req.query.usuario) {
    MongoClient.connect(dbURL).then((client) => {
      const db = client.db(dbName);
      return db.collection<Funkos>(String(req.query.usuario)).deleteOne({ID: Number(req.query.id)});
    }).then((result) => {
      console.log(result);
      res.send(result);
    }).catch((error) => {
      console.log(error);
      res.send(error);
    });
  }
  else {
    res.send('Faltan argumentos');
  }
});



/**
 * Función que maneja las peticiones PATCH
 */
server.patch('/funkos', (req, res) => {
  if (req.query.usuario && req.query.nombre && req.query.descripcion && req.query.tipo && req.query.genero && req.query.franquicia && req.query.numero && req.query.exclusivo && req.query.caracteristicasEspeciales && req.query.valorMercado && req.query.id) {
    MongoClient.connect(dbURL).then((client) => {
      const db = client.db(dbName);
      return db.collection<Funkos>(String(req.query.usuario)).updateOne({
        ID: Number(req.query.id),
      }, {
        $set: {
          nombre: String(req.query.nombre),
          descripcion: String(req.query.descripcion),
          tipo: String(req.query.tipo),
          genero: String(req.query.genero),
          franquicia: String(req.query.franquicia),
          numero: Number(req.query.numero),
          exclusivo: Boolean(req.query.exclusivo),
          caracteristicasEspeciales: String(req.query.caracteristicasEspeciales),
          valorMercado: Number(req.query.valorMercado),
          ID: Number(req.query.id),
          usuario: String(req.query.usuario),
        },
      });
    }).then((result) => {
      console.log(result);
      res.send(result);
    }
    ).catch((error) => {
      console.log(error);
      res.send(error);
    } 
    );
  } 
  else {
    res.send('Faltan argumentos');
  }
});


/**
 * Función que maneja las peticiones PUT
 */
server.listen(3000, () => {
  console.log('Server is up on port 3000');
});