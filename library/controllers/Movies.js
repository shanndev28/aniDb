import { Op } from "sequelize";
import Genre from "../models/Genre.js"
import Movies from "../models/Movies.js";

export const getAnimes = async (req, res) => {
    try {
        const response = await Movies.findAll({
            order: [['title', 'ASC']],
            limit: req.body.limit ? req.body.limit : 15,
            attributes: ['uuid', 'cover', 'title', 'description', 'releaseDate', 'genre', 'studio', 'status']
        })

        if (!response || !response.length) return res.status(400).json({ error: true, message: "Tidak ditemukan" })
        return res.status(200).json({ error: false, data: response })
    } catch (error) {
        return res.status(400).json({ error: true, message: 'Database Error' })
    }
}

export const getAnimesOngoing = async (req, res) => {
    try {
        const response = await Movies.findAll({
            where: {
                status: "Ongoing"
            },
            order: [['updatedAt', 'DESC']],
            limit: req.body.limit ? req.body.limit : 15,
            attributes: ['uuid', 'cover', 'title', 'description', 'releaseDate', 'genre', 'studio', 'status']
        })

        if (!response || !response.length) return res.status(400).json({ error: true, message: "Tidak ditemukan" })
        return res.status(200).json({ error: false, data: response })
    } catch (error) {
        return res.status(400).json({ error: true, message: error.message })
    }
}

export const getAnimesById = async (req, res) => {
    if (!req.params.id) return res.status(400).json({ error: true, message: 'Parameter Invalid`s' })

    try {
        const response = await Movies.findOne({
            where: {
                uuid: req.params.id
            },
            attributes: ['uuid', 'cover', 'title', 'description', 'releaseDate', 'genre', 'studio', 'status']
        })

        if (!response) return res.status(400).json({ error: true, message: "Tidak ditemukan" })
        return res.status(200).json(response)
    } catch (error) {
        return res.status(400).json({ error: true, message: 'Database Error' })
    }
}

export const getAnimesByName = async (req, res) => {
    if (!req.params.title) return res.status(400).json({ error: true, message: 'Parameter Invalid`s' })

    try {
        const response = await Movies.findAll({
            where: {
                title: { [Op.startsWith]: req.params.title }
            },
            order: [['title', 'ASC']],
            attributes: ['uuid', 'cover', 'title', 'description', 'releaseDate', 'genre', 'studio', 'status']
        })

        if (!response || !response.length) return res.status(400).json({ error: true, message: "TIdak ditemukan" })
        return res.status(200).json({ error: true, data: response })
    } catch (error) {
        return res.status(400).json({ error: true, message: 'Database Error' })
    }
}

export const getAnimesByGenre = async (req, res) => {
    if (!req.params.genre) return res.status(400).json({ error: true, message: "Parameter Invalid`s" })

    const data = await Genre.findOne({
        where: {
            name: req.params.genre
        }
    })

    if (!data) return res.status(400).json({ error: true, message: "Data tidak ditemukan" })

    try {
        const response = await Movies.findAll({
            where: {
                genre: {
                    [Op.substring]: data.name
                }
            },
            attributes: ['uuid', 'cover', 'title', 'description', 'releaseDate', 'genre', 'studio', 'status']
        })

        if (!response || !response.length) return res.statu(400).json({ error: true, message: "TIdak ditemukan" })
        return res.status(200).json({ error: false, data: response })
    } catch (error) {
        return res.status(400).json({ error: true, message: 'Database Error' })
    }
}

export const tambahAnime = async (req, res) => {
    const { uuid, cover, title, description, releaseDate, genre, studio, status } = req.body
    if (!uuid || !cover || !title || !description || !releaseDate || !genre || !studio || !status) return res.status(400).json({ error: true, message: "Parameter Invalid`s" })

    try {
        const dataDuplicateCheck = await Movies.findOne({
            where: {
                uuid: uuid
            }
        })

        if (dataDuplicateCheck) return res.status(400).json({ error: true, message: "Data sudah tersedia di database" })

        await Movies.create({
            uuid: uuid,
            cover: cover,
            title: title,
            description: description,
            releaseDate: releaseDate,
            genre: genre,
            studio: studio,
            status: status,
        })

        return res.status(200).json({ error: false, message: "Data berhasil ditambahkan" })
    } catch (error) {
        return res.status(400).json({ error: true, message: "Database error" })
    }
}