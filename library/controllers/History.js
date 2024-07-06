import Eps from '../models/Eps.js'
import Movies from '../models/Movies.js'
import History from '../models/History.js'

export const getHistory = async (req, res) => {
    try {
        const response = await History.findAll({
            where: {
                session: req.sessionID
            },
            attributes: ['uuid', 'epsTitle', 'movieTitle', 'movieCover']
        })

        if (!response || !response.length) return res.status(400).json({ error: true, message: "Data history tidak ditemukan" })
        return res.status(200).json({ error: false, data: response })
    } catch (error) {
        return res.status(400).json({ error: true, message: "Database error" })
    }
}

export const addHistory = async (req, res) => {
    if (!req.params.id) return res.status(400).json({ error: true, message: "Parameter Invalid`s" })

    // DATA MOVIE CHECK
    const dataMovie = await Eps.findOne({
        where: {
            uuid: req.params.id
        },
        include: [{
            model: Movies,
            attributes: ['cover', 'title']
        }],
        attributes: ['uuid', 'movieUuid', 'title']
    })
    if (!dataMovie) return res.status(200).json({ error: true, message: "Data anime tidak ditemukan" })

    // DATA HISTORY CHECK
    const dataDuplicateCheck = await History.findOne({
        where: {
            uuid: req.params.id,
            session: req.sessionID
        }
    })
    if (dataDuplicateCheck) return res.status(200).json({ error: true, message: "Data sudah tersedia di database" })

    try {
        await History.create({
            uuid: req.params.id,
            session: req.sessionID,
            epsTitle: dataMovie.title,
            movieTitle: dataMovie.movie.title,
            movieCover: dataMovie.movie.cover
        });

        return res.status(200).json({ error: false, message: "Data berhasil ditambahkan" })
    } catch (error) {
        return res.status(400).json({ error: true, message: "Database error" })
    }

}

export const deleteHistory = async (req, res) => {
    if (!req.params.id) return res.status(400).json({ error: true, message: "Parameter Invalid`s" })

    const dataHistory = await History.findOne({
        where: {
            uuid: req.params.id,
            session: req.sessionID
        }
    })

    if (!dataHistory) return res.status(200).json({ error: true, message: "Data history tidak ditemukan" })

    try {
        await History.destroy({
            where: {
                uuid: dataHistory.uuid,
                session: dataHistory.session
            }
        })

        return res.status(200).json({ error: false, message: "Data berhasil dihapus" })
    } catch (error) {
        return res.status(400).json({ error: true, message: "Database error" })
    }
}