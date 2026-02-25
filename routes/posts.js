import express from "express"
import pool from "../config/db.js"

const router = express.Router()

router.get("/posts", async (req, res, next) => {
    try {
        const [rows] = await pool.query(`
            SELECT post.id, post.content, post.created_at, user.name
            FROM post
            JOIN user ON post.user_id = user.id
            ORDER BY post.created_at DESC
        `)
        res.render("index.njk", { title: "Mikroblogg", posts: rows })
    } catch (err) {
        next(err)
    }
})

export default router