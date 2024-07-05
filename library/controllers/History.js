import Eps from '../models/Eps.js'
import Movies from '../models/Movies.js'

export const getHistory = async (req, res) => {
    if (!req.session.history || !req.session.history.length) return res.status(400).json({ error: true, message: "Data history tidak ditemukan" })
    return res.status(200).json({ error: false, data: req.session.history })
}

export const addHistory = async (req, res) => {
    if (!req.session.history) req.session.history = []
    if (!req.params.id) return res.status(400).json({ error: true, message: "Parameter Invalid`s" })

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

    req.session.history.push(dataMovie)
    return res.status(200).json({ error: false, message: "Data berhasil ditambahkan" })
}

export const deleteHistory = async (req, res) => {
    if (!req.params.id) return res.status(400).json({ error: true, message: "Parameter Invalid`s" })
    if (!req.session.history) return res.status(400).json({ error: true, message: "Data history tidak ditemukan" })
    if (!req.session.history.find((e) => e.uuid === req.params.id)) return res.status(400).json({ error: true, message: "Data history tidak ditemukan" })

    let index = req.session.history.indexOf(req.params.id)

    req.session.history.splice(index, 1)
    return res.status(200).json({ error: false, message: "Data berhasil dihapus" })
}