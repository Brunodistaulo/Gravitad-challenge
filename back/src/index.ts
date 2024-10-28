import dbCon from "./Config/dbCon";
import { preLoadAdmin } from "./helpers/preLoadAdmin";
import { preLoadMovies } from "./helpers/preLoadMovies";
import app from "./server";
import 'dotenv/config'

dbCon().then(async () => {
    await preLoadMovies();
    await preLoadAdmin();
    app.listen(process.env.PORT, () => {
        console.log(`Server running on port ${process.env.PORT}`)
    })
})