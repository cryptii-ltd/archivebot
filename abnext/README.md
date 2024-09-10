# Discord Archive Bot Frontend

This is the frontend for the **Discord Archive Bot**, a platform that allows users to seamlessly archive, manage, and share their Discord conversations. This project is built with [Next.js](https://nextjs.org/) and offers a clean and user-friendly interface for viewing and organizing archived messages.

## Getting Started

To get started with development, follow these steps:

1.  **Clone the Repository:**

    ```
    git clone git@github.com:cryptii-ltd/archivebot.git
    cd abnext
    ```

2.  **Install Dependencies:**

    Install the necessary packages:

    ```
    npm install
    # or
    yarn install
    # or
    pnpm install
    ```

3.  **Setup the Database:**

    Before running the development server, you need to pull the existing database schema and generate the necessary Prisma client:

    ```
    npx prisma db pull
    npx prisma generate
    ```

4.  **Run the Development Server:**

    Start the development server:

    ```
    npm run dev
    # or
    yarn dev
    # or
    pnpm dev
    # or
    bun dev
    ```

    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

5.  **Migrate Existing Archives:**

    If you need to migrate current archives to the new relational database schema, use the provided migration script:

    ```
    cd migration
    python -m venv env
    source venv/bin/activate  # On Windows use `env\Scripts\activate`
    pip install -r requirements.txt
    python main.py
    ```

    You'll need to configure the .env.local and .env files in the /abnext directory. Examples are provided. You will have to do the same for the .env file required in the migration directory. Again, an example is available there for you 😊

6.  **Build the Project:**

    Once everything is set up, you can build the project for production:

    ```
    npm run build
    # or
    yarn build
    # or
    pnpm build
    ```


## Features

*   **Simple Archiving:** Use a slash command to quickly save your Discord chats.
*   **Access Anytime:** Sign in with Discord to view and manage your archives.
*   **Sleek Interface:** Browse your conversations in a clean and intuitive interface.
*   **Organize with Ease:** Rename, delete, and manage your archives efficiently.
*   **Share Securely:** Share your archives with optional password protection.

## Learn More

To learn more about Next.js, check out the following resources:

*   [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API.
*   [Learn Next.js](https://nextjs.org/learn) - An interactive Next.js tutorial.

You can also check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) for feedback and contributions.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/). Check out the [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

- - -

### Join Our Community

Need help or have feedback? Join our [Discord Server](https://discord.gg/FJ93j2f) to connect with the developers and other users.

- - -

**The Ultimate Discord Message Archiving Solution**

*Quickly archive, organize, and securely share your favorite conversations.*


- - -

© 2024 Discord Archive Bot. All rights reserved.