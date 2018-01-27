var mongoose = require('mongoose')

var CounterSchema = mongoose.Schema({
    _id: { type: String, required: true },
    seq: { type: Number, default: 1 }
});

var Counter = mongoose.model('Counter', CounterSchema);

Counter.nextCount = function (model, callback) {
    Counter.findById({ _id: model }, function (err, counter) {
        if (err) return callback(err);
        callback(null, counter === null ? 1 : counter.seq + 1);
    });
};

Counter.updateCounter = function (model, doc, callback) {
    Counter.findByIdAndUpdate({ _id: model }, { $inc: { seq: 1 } },
        { new: true, upsert: true },
        function (err, counter) {
            if (err) return callback(err)
            doc.numero = counter.seq
            callback(null)
        }
    )
}

module.exports = Counter

