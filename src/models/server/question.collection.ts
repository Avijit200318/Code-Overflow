import {IndexType, Permission} from "node-appwrite"
import {db, questionCollection} from "../name"
import { databases } from "./config"
// we need database configuration

const createQuestionCollection = async () => {
    await databases.createCollection(db, questionCollection, questionCollection, [
        // we want anybody can read but only the login users can create, update and delete
        Permission.read("any"),
        Permission.read("users"),

        Permission.create("users"),
        Permission.delete("users"),
        Permission.update("users"),
    ])
    console.log("Question collections are created")
    // till now only collections are created after that we need to create attribute

    // creating attributes and indexes

    await Promise.all([
        databases.createStringAttribute(db, questionCollection, "title", 100, true),
        databases.createStringAttribute(db, questionCollection, "content", 10000, true),
        databases.createStringAttribute(db, questionCollection, "authorId", 50, true),
        databases.createStringAttribute(db, questionCollection, "tags", 50, true, undefined, true),
        databases.createStringAttribute(db, questionCollection, "attachmentId", 50, false)
        // attachment id is not required
    ]);
     console.log("Question attribute is created");

    //  creation of indexes

    // await Promise.all([
    //     databases.createIndex(
    //         db, questionCollection, "title", IndexType.Fulltext, ["title"], ["asc"]
    //     ),
    //     databases.createIndex(
    //         db, questionCollection, "content", IndexType.Fulltext, ["content"], ["asc"]
    //     ),
    //     databases.createIndex(
    //         db, questionCollection, "authorId", IndexType.Fulltext, ["authorId"], ["asc"]
    //     ),
    //     databases.createIndex(
    //         db, questionCollection, "tags", IndexType.Fulltext, ["tags"], ["asc"]
    //     ),
    //     databases.createIndex(
    //         db, questionCollection, "attachmentId", IndexType.Fulltext, ["attachmentId"], ["asc"]
    //     )
    // ])
}

export default createQuestionCollection;