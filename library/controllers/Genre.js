import Genre from "../models/Genre.js";

export const getGenre = async (req, res) => {
    try {
        const response = await Genre.findAll({
            attributes: ['name']
        })

        if (!response || !response.length) return res.status(400).json({ error: true, nessage: "Data genre tidak ditemukan" })
        return res.status(200).json({ error: false, data: response })
    } catch (error) {
        return res.status(200).json({ error: true, message: "Database Error" })
    }
}