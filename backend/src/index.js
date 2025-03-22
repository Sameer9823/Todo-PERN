import express from 'express';
import cors from 'cors';
import clientRoutes from './routes/clientRoute.js';


const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', clientRoutes);



app.listen(3000, () => {
  console.log('Server is running on port 3000');
});


export default app;