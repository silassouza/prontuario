var mongoose = require('mongoose')

var CounterSchema = mongoose.Schema({
    _id: { type: String, required: true },
    seq: { type: Number, default: 1 }
});

var Counter = mongoose.model('Counter', CounterSchema);

Counter.nextCount = function (model, callback) {
    Counter.findOne({ model }, function (err, counter) {
        if (err) return callback(err);
        callback(null, counter === null ? 1 : counter.count + 1);
    });
};

module.exports = Counter

