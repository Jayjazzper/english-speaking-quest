import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

export const dynamic = 'force-dynamic';

const prisma = new PrismaClient();

export async function GET() {
  try {
    console.log("Starting database seed via API...");

    // 1. Create a dummy Teacher (optional, but good for relationships)
    const teacher = await prisma.user.upsert({
      where: { email: 'teacher@test.com' },
      update: {},
      create: {
        name: 'Mr. John',
        email: 'teacher@test.com',
        role: 'TEACHER',
      },
    });

    // 2. Create a Dummy Student "Buddy"
    const buddy = await prisma.user.upsert({
      where: { email: 'buddy@test.com' },
      update: {},
      create: {
        name: 'Buddy',
        email: 'buddy@test.com',
        role: 'STUDENT',
        xp: 1240, // Match the mock data
        level: 3,
      },
    });

    // 3. Create a Dummy Classroom
    const classroom = await prisma.classroom.upsert({
      where: { joinCode: 'MAGIC123' },
      update: {},
      create: {
        name: 'Magic Explorer Class',
        joinCode: 'MAGIC123',
        teacherId: teacher.id,
        students: {
          connect: [{ id: buddy.id }],
        },
      },
    });

    // 4. Create Missions
    const missions = [
      {
        id: '1',
        title: 'Say Hello!',
        description: 'Introduce yourself to the class.',
        cefrLevel: 'A1',
        xpReward: 20,
        classroomId: classroom.id,
      },
      {
        id: 'story',
        title: 'Magic Forest',
        description: 'Read a story about a little fox.',
        cefrLevel: 'A1',
        xpReward: 50,
        classroomId: classroom.id,
      },
      {
        id: 'picture',
        title: 'My Family',
        description: 'Describe the picture of a family picnic.',
        cefrLevel: 'A2',
        xpReward: 30,
        classroomId: classroom.id,
      },
      {
        id: 'roleplay',
        title: 'Buying Candy',
        description: 'Roleplay buying candy at a store.',
        cefrLevel: 'A2',
        xpReward: 40,
        classroomId: classroom.id,
      },
    ];

    for (const m of missions) {
      await prisma.mission.upsert({
        where: { id: m.id },
        update: {},
        create: m,
      });
    }

    // 5. Create a Dummy Submission to mark "Say Hello!" as completed
    const existingSubmission = await prisma.submission.findFirst({
      where: { studentId: buddy.id, missionId: '1' }
    });

    if (!existingSubmission) {
      await prisma.submission.create({
        data: {
          audioUrl: 'https://example.com/audio.mp3', // Fake URL
          score: 100,
          studentId: buddy.id,
          missionId: '1',
        }
      });
    }

    return NextResponse.json({ message: "Database seeded successfully via Vercel!" });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: "Failed to seed database", details: error.message }, { status: 500 });
  }
}
