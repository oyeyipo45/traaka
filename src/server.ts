import app from './app';
import { config } from './config/config';

const port = config.PORT || 5001;

app.listen(port, () => {
  console.log(`App listening on http://localhost:${port}`);
});
