import express from "express"

const router = express.Router()

router.get("/", (req, res) => {
    res.render("index.njk",
        { title: "Node js, mannen", message: "Tjabba tjena hallå!" }
    )
})

router.get('/error', (req, res) => {
    throw new Error('Test error')
})

export default router