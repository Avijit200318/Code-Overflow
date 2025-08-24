import { answerCollection, db } from "@/models/name";
import { databases, users } from "@/models/server/config";
import { UserPrefs } from "@/store/Auth";
import { NextResponse, NextRequest } from "next/server";
import { ID } from "node-appwrite";

export async function POST(req: NextRequest){
    try {
        const {questionId, answer, authorId} = await req.json();
        // validation

        // we will create the answer section
        const response = await databases.createDocument(db, answerCollection, ID.unique(), {
            content: answer,
            authorId,
            questionId
        });

        // after giving the answer we need to insecrease the reputation of user
        const prefs = await users.getPrefs<UserPrefs>(authorId);
        await users.updatePrefs(authorId, {
            reputation: Number(prefs.reputation) + 1
        })

        return NextResponse.json(response, {
            status: 201
        })

    } catch (error: any) {
        return NextResponse.json(
            {erorr: error?.message || "Error creating answer"},
            {status: error?.status || error?.code || 500}
        )
    }
}

export async function DELETE(req: NextRequest){
    try {
        const {answerId} = await req.json();
        const answer = await databases.getDocument(db, answerCollection, answerId);

        const response = await databases.deleteDocument(db, answerCollection, answerId);

        // decrease the reputation
        const prefs = await users.getPrefs<UserPrefs>(answer.authorId);
        await users.updatePrefs(answer.authorId, {
            reputation: Number(prefs.reputation) - 1
        })

        return NextResponse.json(
        {data: response},   
        {status: 201})
    } catch (error: any) {
        return NextResponse.json(
            {erorr: error?.message || "Error creating answer"},
            {status: error?.status || error?.code || 500}
        )
    }
}