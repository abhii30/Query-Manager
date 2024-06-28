const express = require("express");
const Query = require("../models/query");
const router = express.Router();

router.post("/add", async (req, res) => {
  const query = new Query(req.body);
  await query.save();
  res.send(query);
});

router.get("/", async (req, res) => {
  const queries = await Query.find();
  res.send(queries);
});

router.put("/:id", async (req, res) => {
  const query = await Query.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.send(query);
});

router.delete("/:id", async (req, res) => {
  const query = await Query.findByIdAndDelete(req.params.id);
  res.send(query);
});

router.delete("/:queryId/replies/:replyIndex", async (req, res) => {
  const query = await Query.findById(req.params.queryId);
  query.replies.splice(req.params.replyIndex, 1);
  await query.save();
  res.send(query);
});

module.exports = router;
