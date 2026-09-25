const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema({
    fromUserId : {
        type : mongoose.Schema.Types.ObjectId,
        required : true
    },
    toUserId : {
        type : mongoose.Schema.Types.ObjectId,
        required : true
    },
    status : {
        type : String,
        required : true,
        enum : {
            values : ["interested", "ignored", "accepted", "rejected"],
            message : '{VALUE} is not a valid Status Option'
        }
    }
},
{
    timestamps : true
}
)

connectionRequestSchema.pre("save", function (next) {
    const connectionRequest = this;
    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
        throw new Error("Cannot send a request to self")
    }
})

//compound indexing - because we perform the check for exisiting request, this DB query needs to be indexed and optimized
connectionRequestSchema.index({fromUserId : 1 , toUserId : 1})


const ConnectionRequest = mongoose.model("ConnectionRequest", connectionRequestSchema)

module.exports = ConnectionRequest;