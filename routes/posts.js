import express from "express"
import pool from "../config/db.js"

const router = express.Router()

router.get("/", async (req, res, next) => {
    try {
        const [rows] = await pool.query(`
            SELECT post.id, post.content, post.created_at, user.name
            FROM post
            JOIN user ON post.user_id = user.id
            ORDER BY post.created_at DESC
        `)
        res.json(rows)
    } catch (err) {
        next(err)
    }
})

router.get("/:id", async (req, res, next) => {
    try {
        const postId = req.params.id
        if (!Number.isInteger(Number(postId))) {
            throw new Error("Ogiltigt inläggs-ID.")
        }

        const [rows] = await pool.query(
        `
                SELECT post.id, post.content, post.created_at, user.name
                FROM post
                JOIN user ON post.user_id = user.id
                WHERE post.id = ?
            `,
        [postId],
        )

        if (rows.length === 0) {
            throw new Error("Inlägget kunde inte hittas.")
        }

        res.json(rows[0])
    } catch (err) {
        next(err)
    }
})

export default router