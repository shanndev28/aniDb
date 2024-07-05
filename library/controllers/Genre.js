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

export const tambahGenre = async (req, res) => {
    const { uuid, name } = req.body
    if (!uuid || !name) return res.status(400).json({ error: true, message: "Parameter Invalid`s" })

    try {
        const dataDuplicateCheck = await Genre.findOne({
            where: {
                uuid: uuid
            }
        })

        if (dataDuplicateCheck) return res.status(400).json({ error: true, message: "Data sudah tersedia di database" })

        await Genre.create({
            uuid: uuid,
            name: name
        })

        return res.status(200).json({ error: false, message: "Data berhasil ditambahkan" })
    } catch (error) {
        return res.status(400).json({ error: true, message: "Database Error" })
    }
}