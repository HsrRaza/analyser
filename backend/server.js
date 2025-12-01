import app from "./api/index.js";

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});


// {
//   "version": 2,
//   "rewrites": [
//     {
//       "source": "/(.*)",
//       "destination": "/api"
//     }
//   ]
// }