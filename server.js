const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./DB');

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize app
const app = express();
app.use(express.json());


app.use('/api/user',require('./Routes/Auth'))

app.get('/',(req,res)=>{
res.send('hello')
})

// Routes
// app.use('/', require('./routes/index'));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
