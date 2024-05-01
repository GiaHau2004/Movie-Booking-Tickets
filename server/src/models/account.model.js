const sql = require('./db.model');

class AccountModel {
    constructor(account) {
        this.id = account.account_id;
        this.username = account.username;
        this.password = account.password;
        this.email = account.email;
        this.created_at = account.created_at;
        this.last_login_at = account.last_login_at;
        this.email_verified = account.email_verified;
        this.phone = account.phone;
        this.email_verification_token = account.email_verification_token;
        this.role = account.role;
        this.last_activity_at = account.last_activity_at;
        this.name = account.name;
    }

    static async registerAccount(newAccount, result) {
        try {
            await sql.query(`SELECT EXISTS (SELECT 1 FROM Accounts WHERE username = '${newAccount.username}') AS username_exists, EXISTS (SELECT 1 FROM Accounts WHERE email = '${newAccount.email}') AS email_exists;`, async (err, res, fields) => {
                const usernameExists = res[0].username_exists;
                const emailExists = res[0].email_exists;

                if (usernameExists == 1 || emailExists == 1) {
                    result({ message: "Username or email already exists" }, null);
                    return;
                }

                const query = `INSERT INTO Accounts (username, password, email, created_at, email_verified, role, name) VALUES (?, ?, ?, ?, ?, ?, ?)`;
                const values = [newAccount.username, newAccount.password, newAccount.email, newAccount.created_at, newAccount.email_verified, newAccount.role, newAccount.name];

                await sql.query(query, values);
                result(null, { message: "Account registered successfully" });
            })
        } catch (error) {
            console.error("Error registering account:", error);
            result(error, null);
        }
    }

    static async login(account, result) {
        // console.log(account);
        // result(null, { message: "Test succesfull" })
        try {
            const { username, password } = account;

            await sql.query(`SELECT * FROM Accounts WHERE username = '${username}' AND password = '${password}';`, (err, res, fields) => {
                if (res.length == 0) {
                    result({
                        message: "Invalid username or password"
                    }, null)
                    return;
                }
                console.log(`${username} login!`)
                result(err, res[0]);
            })

        } catch (error) {
            console.error("Error logging in:", error);
            result(error, null);
        }
    }
}

module.exports = AccountModel;
