const axios = require("axios");
const Dev = require("../models/Dev");
const parseStringAsArray = require("../utils/parseStringAsArray");

module.exports = {
  async index(request, resp) {
    const devs = await Dev.find();
    return resp.json(devs);
  },

  async store(request, resp) {
    const { github_username, techs, latitude, longitude } = request.body;

    let dev = await Dev.findOne({ github_username });

    if (!dev) {
      const response = await axios.get(
        `https://api.github.com/users/${github_username}`
      );

      const techsArr = parseStringAsArray(techs);

      const location = {
        type: "Point",
        coordinates: [longitude, latitude]
      };

      const { name = login, avatar_url, bio } = response.data;

      const dev = await Dev.create({
        github_username,
        name,
        avatar_url,
        bio,
        techs: techsArr,
        location
      });
      return resp.json(dev);
    }
    return resp.json(dev);
  },

  async update(request, resp) {

  },

  async destroy(request, resp) {
    const { id } = request.params;
    let dev = await Dev.findOne({ _id: id });
    if (dev) {
      let { github_username } = dev;
      await Dev.deleteOne({ _id: id }, function(err) {
        if (err) {
          return resp.status(500).json({ error: err });
        }
        return resp
          .status(200)
          .json({ success: `Usuario ${github_username} excluido` });
      });
    } else {
      return resp.status(404).json({ error: "Usuario nao encontrado" });
    }
  }
};
