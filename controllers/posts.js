// const Post = require("../models/post")
// // search post
// serachPosts: async (req, res) => {
//   const wordSearching = await req.query.searchPost

//   try {
//     Post.find({ post: { title_create: wordSearching } }, (err, data) => {
//       if (err) {
//         console.log(err)
//       } else {
//         res.render("appartments/Post", { data: data })
//       }
//     })
//   } catch (error) {
//     console.log(error)
//   }
// }
// module.exports = {
//   Post,
// }

// locus - is a debugging package for node
