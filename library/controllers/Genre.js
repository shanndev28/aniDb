import Genre from "../models/Genre.js";

export const getGenre = async (req, res) => {
    try {
        const response = await Genre.findAll({
            attributes: ['name']
        })

        return res.status(200).json(response)
    } catch (error) {
        return res.status(200).json({ error: true, msg: "Database Error" })
    }
}