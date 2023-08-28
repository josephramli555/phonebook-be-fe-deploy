# Phonebook Backend Frontend Deploy

In this exercise i create phonebook fullstack app using React as FE and Nodejs+Express as BE. Mongodb Atlas is used as database. All the application is hosted using fly.io platform, you can check on this page

* https://phonebook-be-fe.fly.dev/

## Start 

To start an application:

```bash
# Install dependencies
$ npm i

# create .env file and add your mongodb URI inside. It will be used to establish DB connection
$ echo "MONGO_URI=<YOUR-MONGODB-URI>" > .env

# Start the app
$ npm run dev
```

After running npm run dev, you can access the app on : http://localhost:3001/