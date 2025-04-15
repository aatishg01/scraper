const express = require('express');
const linkedIn = require('linkedin-jobs-api');
const app = express();
const port = process.env.PORT || 10000;
// In server.js
const axios = require('axios');
// Mechanical engineering-focused query defaults
const DEFAULT_QUERY = {
  keyword: 'mechanical engineer',
  experienceLevel: 'entry level,associate,senior',
  jobType: 'full time',
  remoteFilter: 'remote,hybrid',
  limit: '30' // Match your Make RSS maxResults
};

app.get('/jobs', async (req, res) => {
  try {
    const jobs = await linkedIn.query({
      ...DEFAULT_QUERY,
      ...req.query // Allow Make to override params
    });
    
    // Transform to match your Airtable fields
    const transformed = jobs.map(job => ({
      title: job.position,
      description: `${job.company} - ${job.location}\n${job.agoTime}`,
      link: job.jobUrl,
      date: job.date
    }));
    // Add to transformation logic
    const desc = await axios.get(job.jobUrl)
    .then(res => cheerio.load(res.data)('.description__text').text())
    .catch(() => '');

    transformed.description = desc;
    res.json(transformed);
    
  } catch (error) {
    res.status(500).json({ 
      error: "LinkedIn jobs fetch failed",
      details: error.message 
    });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
