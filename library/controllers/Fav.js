import Movies from "../models/Movies.js"
import Favorite from '../models/Favorite.js'

export const getFavorite = async (req, res) => {
    try {
        const response = await Favorite.findAll({
            where: {
                session: req.sessionID
            },
            attributes: ['uuid', 'movieCover', 'movieTitle']
        })

        if (!response || !response.length) return res.status(400).json({ error: true, message: "Data favorite tidak ditemukan" })
        return res.status(200).json({ error: false, data: response })
    } catch (error) {
        return res.status(400).json({ error: true, message: "Database error" })
    }
}

export const getFavoriteById = async (req, res) => {
    if (!req.params.id) return res.status(400).json({ error: true, message: "Parameter Invalid`s" })

    try {
        const response = await Favorite.findOne({
            where: {
                uuid: req.params.id,
                session: req.sessionID
            }
        })

        if (!response) return res.status(400).json({ error: true, message: "Data favorite tidak ditemukan" })
        return res.status(200).json({ error: false, favorite: true })
    } catch (error) {
        return res.status(400).json({ error: true, message: "Database error" })
    }
}

export const addFavorite = async (req, res) => {
    if (!req.params.id) return res.status(400).json({ error: true, message: "Parameter Invalid`s" })

    // DATA MOVIE CHECK
    const dataMovie = await Movies.findOne({
        where: {
            uuid: req.params.id
        },
        attributes: ['uuid', 'cover', 'title']
    })
    if (!dataMovie) return res.status(400).json({ error: true, message: "Anime tidak ditemukan" })

    // DATA DUPLICATE CHECK
    const dataDupilcateCheck = await Favorite.findOne({
        where: {
            uuid: req.params.id,
            session: req.sessionID
        }
    })
    if (dataDupilcateCheck) return res.status(400).json({ error: true, message: "Data sudah tersedia di databse" })

    try {
        await Favorite.create({
            uuid: req.params.id,
            session: req.sessionID,
            movieCover: dataMovie.cover,
            movieTitle: dataMovie.title

        })

        return res.status(200).json({ error: false, message: "Data berhasil ditambahkan" })
    } catch (error) {
        return res.status(400).json({ error: true, message: "Database error" })
    }
}

export const deleteFavorite = async (req, res) => {
    if (!req.params.id) return res.status(400).json({ error: true, message: "Parameter Invalid`s" })

    const dataFavorite = await Favorite.findOne({
        where: {
            uuid: req.params.id,
            session: req.sessionID,
        }
    })
    if (!dataFavorite) return res.status(400).json({ error: true, message: "Data favorite tidak ditemukan" })

    try {
        await Favorite.destroy({
            where: {
                uuid: dataMovie.uuid,
                session: dataMovie.session
            }
        })

        return res.status(200).json({ error: false, message: "Data berhasil ditambahkan" })
    } catch (error) {
        return res.status(400).json({ error: true, message: "Database error" })
    }
}