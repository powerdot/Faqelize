import CryptoJS from "crypto-js";
import * as fs from "fs";
import * as path from "path";
import prompt from "password-prompt";
import faqelizeConfig from "../faqelize.config";

/**
 * Remove raw database or encrypted database from distination folder.
 */
async function CLEAN() {
  if (!faqelizeConfig.encryptDatabase) {
    if (
      fs.existsSync(path.resolve(__dirname, "../docs/database_encrypted.json"))
    ) {
      fs.unlinkSync(path.resolve(__dirname, "../docs/database_encrypted.json"));
    }
    return true;
  }
  if (fs.existsSync(path.resolve(__dirname, "../docs/database.json"))) {
    fs.unlinkSync(path.resolve(__dirname, "../docs/database.json"));
  }
  return true;
}

/**
 * Encrypt database and place it to public folder.
 */
async function BUILD() {
  // Get password
  let password = "";
  if (!faqelizeConfig.encryptDatabase) {
    console.log(
      "Building without encoding. Check config file: ./faqelize.config.js"
    );
    return true;
  }
  if (process.argv[3]) {
    password = process.argv[3];
  } else {
    password = await prompt("Enter the password: ");
  }

  // Encrypt database
  const database_path = path.resolve(__dirname, "../public/database.json");
  if (!fs.existsSync(database_path)) {
    console.error("Database file not found: " + database_path);
    return false;
  }
  const database_content = fs.readFileSync(database_path, "utf8");
  const key = CryptoJS.SHA256(password).toString();
  const text = database_content.toString();
  const encrypted = CryptoJS.AES.encrypt(text, key, {}).toString();

  // Write encrypted database
  fs.writeFileSync(
    path.resolve(__dirname, "../public/database_encrypted.json"),
    `["encrypted","${encrypted}"]`,
    "utf8"
  );
  return true;
}

const vite = {
  EncryptDatabase: {
    name: "encrypt_database",
    buildStart: async () => {
      await BUILD();
    },
  },
  CleanRawDatabaseFromDist: {
    name: "clean_database",
    closeBundle: async () => {
      await CLEAN();
    },
  },
};

export default { vite };
