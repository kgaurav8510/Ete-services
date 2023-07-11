import "reflect-metadata";
import app from "./app";
import { AppDataSource } from "./config/db";

async function main() {
  try {
    const dbInit = await AppDataSource.initialize();
    if (dbInit.isInitialized) {
      console.log("Database has been initialized!");
      console.log("DB Host:", process.env.DB_HOST);
    }
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
      console.log(`Server up and running on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();
