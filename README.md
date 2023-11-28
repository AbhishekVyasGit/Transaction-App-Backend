
```markdown
# Google Pay Clone

A simplified clone of Google Pay, allowing users to log in, transfer money, handle cashback, and view transaction history.

## Getting Started

1. Install dependencies:

    ```bash
    npm install
    ```

2. Run the application:

    ```bash
    npm start
    ```

   The application will be running at `http://localhost:5001`.

## Features

1. **Login:**
   - Endpoint: `POST /googlepay/login`
   - Creates or logs in a user, providing available balance.

2. **Transfer Amount:**
   - Endpoint: `POST /googlepay/transfer`
   - Transfers money between users, handling cashback.

3. **Cashback Handling:**
   - Cashback is applied based on transaction amount.

4. **Display Information:**
   - Cashback details are displayed after a successful transaction.

5. **Display Transaction List:**
   - Endpoint: `GET /googlepay/transactions/:phoneNum`
   - Retrieves transaction history for a user.

## Folder Structure

```plaintext
node_project/
├── src/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── configs/
│   └── app.js
```

## Prerequisites

- Node.js
- MongoDB

## Contributing

Feel free to contribute to this project. If you find any issues or have suggestions, please open an issue or create a pull request.

```
