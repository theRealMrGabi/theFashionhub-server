# TheFashionHub - Server

> An E-commerce server developed with TypeScript and Express, it allows an admin create Admin or Manager create and update a product, add items to cart etc. API response is a REST API. This is link to the Clientside [Repo](https://github.com/theRealMrGabi/TheFashionHub/) and [Clientside URL](https://thefashionhub.netlify.app/)

## App URL

This project is hosted on Heroku.

## Technologies

- TypeScript
- Express
- MongoDB
- Mongoose
- Cloudinary

## Features

- Create, update and delete products
- Get all and single products
- Signup or login based on RBAC
- Get all orders
- Get order by singleID
- Get all orders by a user

## Setup

### Development

Clone the project and run `yarn dev` or `npm run dev` to start the app in development mode.

### Production

Clone the project and run `yarn start` or `npm run start` to start the app for production.

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`mongoURI`

`jwtSecret`

`PORT`

`LOG_LEVEL`

`CLOUDINARY_CLOUD_NAME`

`CLOUDINARY_API_KEY`

`CLOUDINARY_API_SECRET`

`STRIPE_PUBLISHABLE_KEY`

`STRIPE_SECRET_KEY`

## Contributing

Contributions are always welcome!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Contact

Author and Developer

- [@theRealMrGabi](https://www.github.com/therealmrgabi) - GitHub
- [@theRealMrGabi](https://www.twitter.com/therealmrgabi) - Twitter
- [@Adegabi Ibrahim](https://www.linkedin.com/in/ibrahimadegabi/) - LinkedIn

## License

[MIT](https://choosealicense.com/licenses/mit/)
