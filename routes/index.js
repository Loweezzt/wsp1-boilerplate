import express from "express"
import pool from "../config/db.js"

const router = express.Router()

router.get("/", async (req, res, next) => {
    try {
        const [rows] = await pool.query(`
            SELECT *
            FROM Movies
        `)
        res.render("index.njk", { title: "Notflix", movies: rows })
    } catch (err) {
        next(err)
    }
})

export default router