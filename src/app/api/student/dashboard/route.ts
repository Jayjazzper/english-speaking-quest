import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    // 1. Fetch the Dummy User "Buddy"
    // (In the future, we will use next-auth session to get the logged-in user's ID)
    const user = await prisma.user.findUnique({
      where: { email: "buddy@test.com" }
    });

    if (!user) {
      return NextResponse.json({ error: "Dummy user not found. Please run seed." }, { status: 404 });
    }

    // 2. Fetch all available missions
    const missions = await prisma.mission.findMany({
      orderBy: { createdAt: 'asc' } // Keep them in order
    });

    // 3. Fetch user's completed missions (submissions)
    const submissions = await prisma.submission.findMany({
      where: { studentId: user.id }
    });

    // Extract just the mission IDs that the user has completed
    const completedMissionIds = submissions.map(sub => sub.missionId);

    // 4. Map the data to match the frontend expectations
    // Currently frontend expects: { id, title, type (we map description), xp, status, emoji, color }
    const mappedMissions = missions.map((m, index) => {
      const isCompleted = completedMissionIds.includes(m.id);
      
      // Determine status logic:
      // First mission is always pending if not completed.
      // For MVP, let's just make everything 'pending' unless it's completed.
      // Exception: "Buying Candy" (Roleplay) we can hardcode as locked for demonstration if needed, 
      // but let's make it real based on whether the previous one is completed if we wanted to.
      // For now, let's just set all to pending, except completed ones.
      let status = isCompleted ? 'completed' : 'pending';

      // We map some emojis and colors based on ID for visual consistency with the old mock data
      let emoji = "🗺️";
      let color = "bg-sky-100 border-sky-400 text-sky-800";
      let type = m.cefrLevel + " Mission";

      if (m.id === '1') { emoji = "👋"; color = "bg-green-100 border-green-400 text-green-800"; type = "Audio"; }
      if (m.id === 'story') { emoji = "🦄"; color = "bg-pink-100 border-pink-400 text-pink-800"; type = "Story Mode"; }
      if (m.id === 'picture') { emoji = "👨‍👩‍👧"; color = "bg-yellow-100 border-yellow-400 text-yellow-800"; type = "Picture"; }
      if (m.id === 'roleplay') { emoji = "🍬"; color = "bg-gray-100 border-gray-300 text-gray-400"; type = "Role Play"; }

      // Hardcode "Buying Candy" to locked just to keep the UI looking like the original mock data
      if (m.id === 'roleplay' && !isCompleted) {
        status = 'locked';
        color += " grayscale";
      }

      return {
        id: m.id,
        title: m.title,
        type: type,
        xp: m.xpReward,
        status: status,
        emoji: emoji,
        color: color,
      };
    });

    return NextResponse.json({
      user: {
        name: user.name,
        xp: user.xp,
        level: user.level,
        streak: 5, // Mock streak for now
      },
      missions: mappedMissions
    });

  } catch (error) {
    console.error("Dashboard API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
