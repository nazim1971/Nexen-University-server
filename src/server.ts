

import app from './app';
import config from './config';  


// Async method to start the server
async function start() {
  try {
    await config.connectDB();  
    app.App.listen(config.port, () => {
      console.log(`Server is running on Port: ${config.port}`);
    });
  } catch (error) {
    console.error('Error starting the server:', error);
  }
}


start();
