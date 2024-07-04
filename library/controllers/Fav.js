import Movies from "../models/Movies.js"

export const getFavorite = async (req, res) => {
    if (!req.session.favorite || !req.session.favorite.length) return res.status(200).json({ error: true, msg: "Tidak ada data" })
    return res.status(200).json(req.session.favorite)
}

export const getFavoriteById = async (req, res) => {
    if (!req.session.favorite || !req.session.favorite.length) return res.status(200).json({ error: true, msg: "Tidak ada data" })
    if (!req.params.id) return res.status(200).json({ error: true, msg: "Parameter Invalid`s" })
    if (!req.session.favorite.find((e) => e.uuid === req.params.id)) return res.status(200).json({ error: true, msg: "Belum Ditambahkan" })

    return res.status(200).json({ error: false, favorite: true })
}

export const addFavorite = async (req, res) => {
    if (!req.session.favorite) req.session.favorite = []
    if (!req.params.id) return res.status(200).json({ error: true, msg: "Parameter Invalid`s" })

    const dataMovie = await Movies.findOne({
        where: {
            uuid: req.params.id
        },
        attributes: ['uuid', 'cover', 'title']
    })

    if (!dataMovie) return res.status(200).json({ error: true, msg: "Data tidak ditemukan" })
    if (req.session.favorite.find((e) => e.uuid === req.params.id)) return res.status(200).json({ error: false, msg: "Data sudah tersedia" })

    req.session.favorite.push(dataMovie)
    return res.status(200).json({ error: false, msg: "Data telah ditambahkan" })
}

export const deleteFavorite = async (req, res) => {
    if (!req.params.id) return res.status(200).json({ error: true, msg: "Parameter Invalid`s" })
    if (!req.session.favorite) return res.status(200).json({ error: true, msg: "Tidak ada data" })
    if (!req.session.favorite.find((e) => e.uuid === req.params.id)) return res.status(200).json({ error: true, msg: "Data tidak ditemukan" })

    let index = req.session.favorite.indexOf(req.params.id)

    req.session.favorite.splice(index, 1)
    return res.status(200).json({ error: true, msg: "Data berhasil dihapus" })
}