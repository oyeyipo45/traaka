import dotenv from 'dotenv';
import app from './app';

dotenv.config();


const port = parseInt(process.env.PORT!) || 5001;


app.listen(Number(port), () => {
  console.log(`App listening on http://localhost:${port}`);
});