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

        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({ error: true, msg: 'Database Error' })
    }
}

export const getEpisodeById = async (req, res) => {
    if (!req.params.id) return res.status(200).json({ error: true, msg: 'Parameter Invalid`s' })

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

        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({ error: true, msg: 'Database Error' })
    }
}

export const getEpisodeByMovieId = async (req, res) => {
    if (!req.params.id) return res.status(200).json({ error: true, msg: 'Parameter Invalid`s' })

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

        return res.status(200).json(response)
    } catch (error) {
        return res.status(404).json({ error: true, msg: 'Database error' })
    }
}