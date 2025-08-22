import { db } from "../name";
import createAnswerCollection from "./answre.collection";
import createCommentCollection from "./comment.collection";
import createQuestionCollection from "./question.collection";
import createVoteCollection from "./vote.collection";
import { databases } from "./config";

const getOrCreateDb = async () => {
    try {
        // if it already created
        await databases.get(db);
        console.log("Database connected");
    } catch (error) {
        try {
            await databases.create(db, db);
            console.log("database created");

            // collection creation
            await Promise.all([
                createQuestionCollection(),
                createAnswerCollection(),
                createCommentCollection(),
                createVoteCollection()
            ]);
            console.log("collection created successfully");
            console.log("database connected");
        } catch (error) { 
            console.log("Error creating databases and collections: ", error);
        }
    }

    return databases;
}

export default getOrCreateDb