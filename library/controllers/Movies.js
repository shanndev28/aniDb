import { Op } from "sequelize";
import Genre from "../models/Genre.js"
import Movies from "../models/Movies.js";

export const getMovie = async (req, res) => {
    try {
        const response = await Movies.findAll({
            order: [['title', 'ASC']],
            limit: req.body.limit ? req.body.limit : 15,
            attributes: ['uuid', 'cover', 'title', 'description', 'releaseDate', 'genre', 'studio', 'status']
        })

        return res.status(200).json(response)
    } catch (error) {
        return res.status(200).json({ error: true, msg: 'Database Error' })
    }
}

export const getMovieOngoing = async (req, res) => {
    try {
        const response = await Movies.findAll({
            where: {
                status: "Ongoing"
            },
            order: [['updatedAt', 'DESC']],
            limit: req.body.limit ? req.body.limit : 15,
            attributes: ['uuid', 'cover', 'title', 'description', 'releaseDate', 'genre', 'studio', 'status']
        })

        return res.status(200).json(response)
    } catch (error) {
        return res.status(200).json({ error: true, msg: error.message })
    }
}

export const getMovieById = async (req, res) => {
    if (!req.params.id) return res.status(200).json({ error: true, msg: 'Parameter Invalid`s' })

    try {
        const response = await Movies.findOne({
            where: {
                uuid: req.params.id
            },
            attributes: ['uuid', 'cover', 'title', 'description', 'releaseDate', 'genre', 'studio', 'status']
        })

        return res.status(200).json(response)
    } catch (error) {
        return res.status(200).json({ error: true, msg: 'Database Error' })
    }
}

export const getMovieByName = async (req, res) => {
    if (!req.params.title) return res.status(200).json({ error: true, msg: 'Parameter Invalid`s' })

    try {
        const response = await Movies.findAll({
            where: {
                title: { [Op.startsWith]: req.params.title }
            },
            order: [['title', 'ASC']],
            attributes: ['uuid', 'cover', 'title', 'description', 'releaseDate', 'genre', 'studio', 'status']
        })

        return res.status(200).json(response)
    } catch (error) {
        return res.status(200).json({ error: true, msg: 'Database Error' })
    }
}

export const getMovieByGenre = async (req, res) => {
    if (!req.params.genre) return res.status(200).json({ error: true, msg: "Parameter Invalid`s" })

    const data = await Genre.findOne({
        where: {
            name: req.params.genre
        }
    })

    if (!data) return res.status(200).json({ error: true, msg: "Data tidak ditemukan" })

    try {
        const response = await Movies.findAll({
            where: {
                genre: {
                    [Op.substring]: data.name
                }
            },
            attributes: ['uuid', 'cover', 'title', 'description', 'releaseDate', 'genre', 'studio', 'status']
        })

        return res.status(200).json(response)
    } catch (error) {
        return res.status(200).json({ error: true, msg: 'Database Error' })
    }
}