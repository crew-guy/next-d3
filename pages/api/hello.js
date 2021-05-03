// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const axios = require('axios')

export default async (req, res) =>
{
  try {
    const data = await axios.get('https://gist.githubusercontent.com/crew-guy/7cbac5e5cf2dbac4ab6a4c5e43e6f70d/raw/data.csv');
    console.log(data)
    res.status(200).json(data)
  } catch (error) {
    console.log(error.message)
  }
}
