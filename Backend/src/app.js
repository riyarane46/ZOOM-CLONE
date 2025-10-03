import Express from 'express';
import {createServer} from 'node:http';
import  {Server} from 'socket.io';
import cors from 'cors';
import usersRoutes from './routes/users.routes.js';
import mongoose from 'mongoose';
import {connectToSocket} from './controllers/socketManager.js';

const app = Express();
const server = createServer(app);
const io = connectToSocket(server);

app.set("port", (process.env.PORT || 8000));
app.use(cors());
app.use(Express.json({limit: '40kb'}));
app.use(Express.urlencoded({limit: '40kb', extended: true}));

app.use("/api/v1/users", usersRoutes);

const start = async () => {
    const connectionDb = await mongoose.connect("mongodb+srv://riyaVideo:Riyarane07@cluster0.kjdfh.mongodb.net/");
    console.log(`Connected to database ${connectionDb.connection.host}`);
    server.listen(app.get("port"), () => {
        console.log("Server is running on port 8000");
    });
}

start();