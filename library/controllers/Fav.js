import Movies from "../models/Movies.js"

export const getFavorite = async (req, res) => {
    if (!req.session.favorite || !req.session.favorite.length) return res.status(400).json({ error: true, message: "Data favorite tidak ditemukan" })
    return res.status(200).json(req.session.favorite)
}

export const getFavoriteById = async (req, res) => {
    if (!req.params.id) return res.status(400).json({ error: true, message: "Parameter Invalid`s" })
    if (!req.session.favorite || !req.session.favorite.length) return res.status(400).json({ error: true, message: "Data favorite tidak ditemukan" })
    if (!req.session.favorite.find((e) => e.uuid === req.params.id)) return res.status(400).json({ error: true, message: "Data favorite tidak ditemukan" })

    return res.status(200).json({ error: false, favorite: true })
}

export const addFavorite = async (req, res) => {
    if (!req.session.favorite) req.session.favorite = []
    if (!req.params.id) return res.status(400).json({ error: true, message: "Parameter Invalid`s" })

    const dataMovie = await Movies.findOne({
        where: {
            uuid: req.params.id
        },
        attributes: ['uuid', 'cover', 'title']
    })

    if (!dataMovie) return res.status(400).json({ error: true, message: "Anime tidak ditemukan" })
    if (req.session.favorite.find((e) => e.uuid === req.params.id)) return res.status(200).json({ error: false, message: "Data berhasil ditambahkan" })

    req.session.favorite.push(dataMovie)
    return res.status(200).json({ error: false, message: "Data berhasil ditambahkan" })
}

export const deleteFavorite = async (req, res) => {
    if (!req.params.id) return res.status(400).json({ error: true, message: "Parameter Invalid`s" })
    if (!req.session.favorite) return res.status(400).json({ error: true, message: "Data favorite tidak ditemukan" })
    if (!req.session.favorite.find((e) => e.uuid === req.params.id)) return res.status(400).json({ error: true, message: "Data favorite tidak ditemukan" })

    let index = req.session.favorite.indexOf(req.params.id)

    req.session.favorite.splice(index, 1)
    return res.status(200).json({ error: true, message: "Data berhasil dihapus" })
}