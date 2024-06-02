import express from "express"
const app = express();


app.get('/',(req,res)=>{
    res.send('Server is ready')
})

app.get('/api/v1/jokes',(req,res)=>{
    const jokes=[
        {
          "id": 1,
          "title": "Why don't scientists trust atoms?",
          "content": "Because they make up everything!"
        },
        {
          "id": 2,
          "title": "What do you get when you cross a snowman and a vampire?",
          "content": "Frostbite!"
        },
        {
          "id": 3,
          "title": "Why did the scarecrow win an award?",
          "content": "Because he was outstanding in his field!"
        },
        {
          "id": 4,
          "title": "How does a penguin build its house?",
          "content": "Igloos it together!"
        },
        {
          "id": 5,
          "title": "Why don't skeletons fight each other?",
          "content": "They don't have the guts."
        }
      ];
      res.send(jokes)
      
})




const PORT = process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log(`Running on port ${PORT}`);
})