import dbCon from "./Config/dbCon";
import app from "./server";
import 'dotenv/config'

dbCon().then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Server running on port ${process.env.PORT}`)
    })
})