const Dev = require("../models/Dev");
const parseStringAsArray = require("../utils/parseStringAsArray");

module.exports = {
  async index(request, resp) {
    const { latitude, longitude, techs } = request.query;
    const techsArr = parseStringAsArray(techs);

    const devs = await Dev.find({
        techs: {
            $in: techsArr,
        },
        location: {
            $near: {
                $geometry: {
                    type: 'Point',
                    coordinates: [longitude, latitude]
                },
                $maxDistance: 10000,
            }
        }
    })
    return resp.json({ devs: devs });
  }
};

