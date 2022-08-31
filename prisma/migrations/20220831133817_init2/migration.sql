-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "uuid" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "birthDate" DATETIME NOT NULL,
    "nickName" TEXT,
    "gender" TEXT,
    "pronouns" TEXT,
    "phoneNumber" TEXT,
    "emergencyPhoneNumber" TEXT,
    "studentAdress" TEXT,
    "ParentAdress" TEXT,
    "school" TEXT,
    "department" TEXT,
    "promotion" INTEGER,
    "permissions" INTEGER NOT NULL DEFAULT 4,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastLogin" DATETIME,
    "organizationId" INTEGER
);
INSERT INTO "new_User" ("ParentAdress", "birthDate", "createdAt", "department", "email", "emergencyPhoneNumber", "firstName", "gender", "isVerified", "lastLogin", "lastName", "nickName", "organizationId", "password", "permissions", "phoneNumber", "promotion", "pronouns", "school", "studentAdress", "username", "uuid") SELECT "ParentAdress", "birthDate", "createdAt", "department", "email", "emergencyPhoneNumber", "firstName", "gender", "isVerified", "lastLogin", "lastName", "nickName", "organizationId", "password", "permissions", "phoneNumber", "promotion", "pronouns", "school", "studentAdress", "username", "uuid" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_uuid_key" ON "User"("uuid");
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");
CREATE UNIQUE INDEX "User_firstName_lastName_key" ON "User"("firstName", "lastName");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
