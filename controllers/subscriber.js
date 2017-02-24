const Subscriber = require('../models/subscriber');

exports.list = (req, res) => {
  Subscriber.find(function(err, subscribers) {
    if (err) res.send(err);

    res.send(subscribers);
  })
};

exports.create = (req, res) => {
  const sub = new Subscriber({
    email: req.body.email
  });

  Subscriber.findOne({ email: req.body.email }, function(err, email) {
    if (email) return res.send('Email is already subscribed!');

    sub.save(function(err) {
      if (err) res.send(err);
      return res.send('NEW subscriber ' + req.body.email);
    });
  });
};
