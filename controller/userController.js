
const { Op } = require("sequelize");
const Model = require("../models");

const users = Model.users;
const posts = Model.posts;

const table = async (req, res) => {
  try {
    let allData = await users.findAll({});

    res.render("table.ejs", allData);
  } catch (error) {}
};

const getdata = async (req, res) => {
  const { draw ,order} = req.query;
  const search = req.query.search || null;
  const offset = req.query.start || 0;
  const limit = req.query.length || 5;
  const columns = ["id", "name", "email"];
  const col2 = ["postname","title"];

  if(order){
  var column = order[0].column;
  var dir = order[0].dir;


columnOrder = columns[column];
orderDirection = dir.toUpperCase();

}

if (column == 4) {
    orderBy = [[posts, "postname", orderDirection]];
    } else if (column == 5) {
    orderBy = [[posts, "title", orderDirection]];
    } else {
    var orderBy = [[columnOrder, orderDirection]];
    }
    

  const query = {
    subQuery: false,
    where: {
        [Op.or]:{
            id: {
                [Op.like]: `%${search.value}%`,
              },
              name: {
                [Op.like]: `%${search.value}%`,
              },
              email: {
                [Op.like]: `%${search.value}%`,
              },
              "$posts.postname$": {
                [Op.like]: `%${search.value}%`,
              },
              "$posts.title$": {
                [Op.like]: `%${search.value}%`,
              },

        }
    },
    include: posts,
    offset: +offset,
    limit: +limit,
    order: orderBy,
    
  };

  //final query
  var data = await users.findAndCountAll(query);

  return res.json({
    draw: parseInt(draw),
    recordsTotal: data.count,
    recordsFiltered: data.count,
    data: data.rows,
  });
};
module.exports = {table,getdata}