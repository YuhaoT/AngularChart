# Angular Chart Project Overview
## Introduction
This Angular project utilizes d3.js to read data from the asset, and Apache Echart to draw a candlestick chart. The S&P data is from https://www.nasdaq.com/market-activity/index/spx/historical.

Initially, I developed the project on my local machine using Angular as the frontend and Django as the backend to fetch data from a postgreSQL database. The communication between frontend and backend was done through REST API. However, Heroku can only support one build-pack, which meant I had to choose between Python and Node.js. Since Heroku started charging for its service and DMS add-on in 2022, I modified the Angular code and stored the data into the asset as a .csv file.

## Project Details
While using Angular for the first time, I found it quite easy to use with the help of Angular CLI. Before starting the project, I experimented with Python and found a package called Plotly that was easy to use in Python and also had a JS distribution. I tried to use it as my charting library, but it caused numerous issues. I then switched to Apache Echart, which was well-documented and provided many examples. Using it was a pleasure, especially after getting out of the dependency hell.

## Conclusion
Overall, the Angular chart project was a success. By utilizing d3.js and Apache Echart, I was able to read data from the asset and draw a candlestick chart. The experience was a great learning opportunity, as I got to use Angular for the first time and also explore different charting libraries.