import { readdir, readFile } from 'node:fs/promises';
import express from 'express';
import path from 'path';
const app = express()
const port = 3000

// Create static folder for CSS, Vue components, etc.
app.use(express.static('public'));

const folders = await readdir(`${import.meta.dirname}/messages`)

app.get('/', (req, res) => {
    res.sendFile(path.join(import.meta.dirname, 'index.html'));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.get('/folders', (req, res) => {
    return res.json(folders)
})

app.get('/list', async (req, res) => {
  try {
    // 1. Read the file content as a string
    const rawData = await readFile(`${import.meta.dirname}/messages/index.json`, 'utf8');
    
    // 2. Parse the string into a JavaScript object
    const jsonData = JSON.parse(rawData);
    
    return res.json(jsonData);
  } catch (error) {
    console.error('Error reading or parsing the file:', error);
  }
})

app.get('/conversation/:id/', async (req, res) => {
  const conversation = await readFile(`${import.meta.dirname}/messages/c${req.params.id}/messages.json`, 'utf8')

  return res.json(JSON.parse(conversation));
});
