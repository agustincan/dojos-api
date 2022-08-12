import {createConnection} from "typeorm";

// try {
//   const cnn = await createConnection()
//   console.log("Conexión db creada: " + cnn.name);
// } catch (err) {
//   console.log("Error al conectar base: " + err);
//     process.exit(1)
// }

createConnection()
  .then(cnn => {
    console.log("Conexión db creada: " + cnn.name);
  })
  .catch(err => {
    console.log("Error al conectar base: " + err);
    process.exit(1)
  });

//const cnn = createConnection("postgres1");

//export default cnn;