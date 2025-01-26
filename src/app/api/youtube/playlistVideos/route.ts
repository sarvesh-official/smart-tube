import { google } from "googleapis";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const data = await req.json();
        const { session, playlistId } = data;
        
        if (!session?.accessToken) {
            return Response.json({ error: "Not authenticated" }, { status: 401 });
        }

        const youtube = google.youtube({
            version: 'v3',
            auth: process.env.GOOGLE_API_KEY,
            headers: {
                Authorization: `Bearer ${session.accessToken}`
            }
        });


        const response = await youtube.playlistItems.list({
            part: ['snippet'],
            playlistId: playlistId,
            maxResults: 50,
        });
        return Response.json(response.data);
    } catch (error) {
        console.error("Server Error Details:", {
            message: error instanceof Error ? error.message : "Unknown error",
            error
        });
        return Response.json(
            { error: error instanceof Error ? error.message : "Unknown error" },
            { status: 500 }
        );
    }
} 