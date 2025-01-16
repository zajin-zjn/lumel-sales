Node Version : v18.20.5
NPM Version : 10.8.2
PG Version : PostgreSQL 9.2.24 on x86_64-redhat-linux-gnu, compiled by gcc (GCC) 4.8.5 20150623 (Red Hat 4.8.5-44), 64-bit
Nest.js Version : 10.4.9

STEPS :

1.  npm install - if face any issues while installing packages please include --force

2.  create a database in pg with the name mentioned in the .env

3.  npm run start

Env sample :
ENV='local'
PORT=3200

DATABASE_NAME='lumel_sales'
DATABASE_TYPE='postgres'
DATABASE_HOST='localhost'
DATABASE_PORT=5432
DATABASE_USERNAME='power_user'
DATABASE_PASSWORD='powerUser1@3$'

APIS :

\*\* Health Check

API : api/v1/lumel-sales/health-check
METHOD : GET
RESPONSE : Api status running! - 2025/01/16 05:30:34 PM

\*\* Load CSV file Data

API : api/v1/lumel-sales/data-upload
METHOD : POST
RESPONSE : {
"result": "6 data has been loaded",
"errors": []
}

\*\* Revenue Calculations

API : api/v1/lumel-sales/data-analytics/revenue
METHOD : GET
FILTERS : startDate,endDate,type(product/region/category)
RESPONSE : [
{
"productName": "UltraBoost Running Shoes",
"totalRevenue": "504.00"
},
{
"productName": "iPhone 15 Pro",
"totalRevenue": "3767.10"
},
{
"productName": "Levi's 501 Jeans",
"totalRevenue": "143.98"
},
{
"productName": "Sony WH-1000XM5 Headphones",
"totalRevenue": "297.49"
}
]

---

1. Data Loading and Database Design:

   - Created mandatory tables to process the sales data
   - we can add more tables such as paymentMethods, categories, region.
   - Created a script to load the csv data using fs stream with batch because it is efficient to load the bulk data eventhough it may take some extra time.
   - The sample file is in the assets folder which I used to verify the script

2. Data Refresh Mechanism:

   - here I used cron to refresh the data periodically
   - we can even use queues to run the data loading without affecting the main application using promise-queue / bull.
   - Logging is done with the default logger method and consoles. For example if we want to keep the logs we can use  
     winston/ cloudwatch/ etc

3. RESTful API for Analysis:
   - I have created 2 modules. one is for upload/refresh the data. In this case I just loaded the existing file. and the another one is for to fetch the revenue details in single api with all the 4 functionalities asked for.
   - I wrote the APIs as simple but it is possible to add validations using DTOs, constant data maintenance instead of keeping it as static directly in the file.
