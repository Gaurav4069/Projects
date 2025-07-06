import { Conversation } from "../models/conversationModel.js";
import { Message } from "../models/messageModel.js";
import { getReceiverSocketId, io } from "../Socket/socket.js";

export const sendMessage = async (req,res)=>{
  try {
    const senderId=req.id;
    const receiverId=req.params.id;
    const {message}=req.body;
    let gotconversation = await Conversation.findOne({
      // $all operator will search for the given values in the array
      participants:{$all : [senderId,receiverId]},
    });

    if(!gotconversation){
      gotconversation = await Conversation.create({
        participants:[senderId , receiverId]
      })
    };
   const newMessage = await Message.create({
    senderId,
    receiverId,
    message
   })
    if(newMessage){
      gotconversation.messages.push(newMessage._id);
    }

    await gotconversation.save();

    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }
    return res.status(201).json({
     newMessage
    })


  } catch (error) {
    console.log(error)
  }
}



export const getMessage = async (req,res) => {
  try {
      const receiverId = req.params.id;
      const senderId = req.id;
      const conversation = await Conversation.findOne({
          participants:{$all : [senderId, receiverId]}
      }).populate("messages"); 
      return res.status(200).json(conversation?.messages);
  } catch (error) {
      console.log(error);
  }
}