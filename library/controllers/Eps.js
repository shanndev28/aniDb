import Eps from '../models/Eps.js'
import Movies from '../models/Movies.js'

export const getEpisode = async (req, res) => {
    try {
        const response = await Eps.findAll({
            attributes: ['uuid', 'movieUuid', 'title', 'video', 'eps'],
            include: [{
                model: Movies,
                attributes: ['cover', 'title', 'description', 'releaseDate', 'genre', 'studio', 'status']
            }]
        })

        if (!response || !response.length) return res.status(400).json({ error: true, message: "Tidak ditemukan" })
        return res.status(200).json({ error: false, data: response })
    } catch (error) {
        return res.status(400).json({ error: true, message: 'Database Error' })
    }
}

export const getEpisodeById = async (req, res) => {
    if (!req.params.id) return res.status(400).json({ error: true, message: 'Parameter Invalid`s' })

    try {
        const response = await Eps.findOne({
            attributes: ['uuid', 'movieUuid', 'title', 'video', 'eps'],
            where: {
                uuid: req.params.id
            },
            include: [{
                model: Movies,
                attributes: ['cover', 'title', 'description', 'releaseDate', 'genre', 'studio', 'status']
            }]
        })

        if (!response) return res.status(400).json({ error: true, message: "Tidak ditemukan" })
        return res.status(200).json({ error: false, data: response })
    } catch (error) {
        return res.status(400).json({ error: true, message: 'Database Error' })
    }
}

export const getEpisodeByMovieId = async (req, res) => {
    if (!req.params.id) return res.status(400).json({ error: true, message: 'Parameter Invalid`s' })

    try {
        const response = await Eps.findAll({
            attributes: ['uuid', 'movieUuid', 'title', 'video', 'eps'],
            where: {
                movieUuid: req.params.id
            },
            order: req.body.order ? [['eps', req.body.order]] : [['eps', 'ASC']],
            include: [{
                model: Movies,
                attributes: ['cover', 'title', 'description', 'releaseDate', 'genre', 'studio', 'status']
            }]
        })

        if (!response || !response.length) return res.status(400).json({ error: true, message: "Tidak ditemukan" })
        return res.status(200).json({ error: false, data: response })
    } catch (error) {
        return res.status(400).json({ error: true, message: 'Database error' })
    }
}

export const tambahEpsAnime = async (req, res) => {
    const { uuid, movieUuid, title, video, eps } = req.body
    if (!uuid || !movieUuid || !title || !video || !eps) return res.status(400).json({ error: true, message: "Parameter Invalid`s" })

    try {
        const dataDuplicateCheck = await Eps.findOne({
            where: {
                uuid: uuid
            }
        })

        if (dataDuplicateCheck) return res.status(400).json({ error: true, message: "Data sudah tersedia di database" })

        const dataMovieId = await Movies.findOne({
            where: {
                uuid: movieUuid,
            }
        })

        if (!dataMovieId) return res.status(400).json({ error: true, message: "Data movieUuid Invalid`s" })

        await Eps.create({
            uuid: uuid,
            movieUuid: movieUuid,
            title: title,
            video: video,
            eps: eps,
        })

        return res.status(200).json({ error: false, message: "Data berhasil ditambahkan" })
    } catch (error) {
        return res.status(400).json({ error: true, message: "Database error" })
    }
}