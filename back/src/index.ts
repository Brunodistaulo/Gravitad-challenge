import dbCon from "./Config/dbCon";
import { preLoadMovies } from "./helpers/preLoadMovies";
import app from "./server";
import 'dotenv/config'

dbCon().then(async () => {
    await preLoadMovies();
    app.listen(process.env.PORT, () => {
        console.log(`Server running on port ${process.env.PORT}`)
    })
})