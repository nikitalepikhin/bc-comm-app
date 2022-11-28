import { PrismaClient } from "@prisma/client";
import { v4 as uuidv4 } from "uuid";

const prisma = new PrismaClient();

export const cvutUuid = "3684a6a2-bcbb-40b6-a23c-169f5c8b75b3";
export const cvutFelUuid = "2aaf92c4-1ed1-4ea0-abe6-58637ff082f5";
export const cvutFitUuid = "5a391a6e-d94b-45e3-a7cb-fd30592a7bd0";
export const cvutFaUuid = "b52db2a9-ffed-419b-a76c-e790c9fc68a8";
export const cvutFdUuid = "321d3ebf-42dd-4950-bf7e-8b3db3c75f48";
export const cvutFsUuid = "f618ef6b-eafc-4256-900d-ce0d43773079";
export const cvutFsvUuid = "3e1821be-30c1-417b-ad6a-b9cfd03b73ab";

export const vseUuid = "8b8271f6-437d-4c03-bab4-ed147367a4d0";
export const ukUuid = "794e947c-f1ca-4174-93dc-66e749041d6e";
export const vutUuid = "ef1cb9a1-d4b4-42d6-b0bb-5c266051743f";

export const adminUuid = "a867ccf0-b9ab-4aff-8e5e-abb9468fe747";
export const studentUuid = "844deb35-571e-48ff-8f70-54ea37775620";
export const teacherUuid = "f154c092-68cc-4cb5-a79e-6c3288135228";
export const represUuid = "97fa43af-7a63-4bdd-8382-5cc05f6c103d";

async function seedAdminUser() {
  await prisma.user.create({
    data: {
      uuid: adminUuid,
      username: "admin001",
      email: "admin@email.com",
      password: "$2b$10$36Pb6gDQLin7mf/miWIOfeh7w5rDVsQS8TeMlx/rHK78MY65IdvGq",
      role: "ADMIN",
      status: "ACTIVE",
    },
  });
}

async function seedSchools() {
  return await prisma.school.createMany({
    data: [
      {
        name: "České vysoké učení technické v Praze",
        countryCode: "CZE",
        city: "Praha",
        addressLineOne: "Jugoslávských partyzánů 1580/3",
        addressLineTwo: "Praha 6 - Dejvice",
        postalCode: "160 00",
        createdByUuid: adminUuid,
        modifiedByUuid: adminUuid,
        uuid: cvutUuid,
      },
      {
        name: "Vysoká škola ekonomická v Praze",
        countryCode: "CZE",
        city: "Praha",
        addressLineOne: "nám. W. Churchilla 1938/4",
        addressLineTwo: "Praha 3 – Žižkov",
        postalCode: "130 67",
        createdByUuid: adminUuid,
        modifiedByUuid: adminUuid,
        uuid: vseUuid,
      },
      {
        name: "Univerzita Karlova",
        countryCode: "CZE",
        city: "Praha",
        addressLineOne: "Ovocný trh 5",
        addressLineTwo: "Praha 1",
        postalCode: "116 36",
        createdByUuid: adminUuid,
        modifiedByUuid: adminUuid,
        uuid: ukUuid,
      },
      {
        name: "Vysoké učení technické v Brně",
        countryCode: "CZE",
        city: "Brno",
        addressLineOne: "Antonínská 548/1",
        addressLineTwo: null,
        postalCode: "601 90",
        createdByUuid: adminUuid,
        modifiedByUuid: adminUuid,
        uuid: vutUuid,
      },
    ],
  });
}

async function seedFaculties() {
  return await prisma.faculty.createMany({
    data: [
      {
        uuid: cvutFelUuid,
        schoolUuid: cvutUuid,
        name: "Fakulta elektrotechnická",
        countryCode: "CZE",
        city: "Praha",
        addressLineOne: "Technická 2",
        addressLineTwo: "Praha 6",
        postalCode: "166 27",
        createdByUuid: adminUuid,
        modifiedByUuid: adminUuid,
      },
      {
        uuid: cvutFitUuid,
        schoolUuid: cvutUuid,
        name: "Fakulta informačních technologií",
        countryCode: "CZE",
        city: "Praha",
        addressLineOne: "Thákurova 9",
        addressLineTwo: "Praha 6",
        postalCode: "160 00",
        createdByUuid: adminUuid,
        modifiedByUuid: adminUuid,
      },
      {
        uuid: cvutFaUuid,
        schoolUuid: cvutUuid,
        name: "Fakulta architektury",
        countryCode: "CZE",
        city: "Praha",
        addressLineOne: "Thákurova 9",
        addressLineTwo: "Praha 6",
        postalCode: "166 34",
        createdByUuid: adminUuid,
        modifiedByUuid: adminUuid,
      },
      {
        uuid: cvutFsUuid,
        schoolUuid: cvutUuid,
        name: "Fakulta strojní",
        countryCode: "CZE",
        city: "Praha",
        addressLineOne: "Technická 4",
        addressLineTwo: "Praha 6",
        postalCode: "166 07",
        createdByUuid: adminUuid,
        modifiedByUuid: adminUuid,
      },
      {
        uuid: cvutFdUuid,
        schoolUuid: cvutUuid,
        name: "Fakulta dopravní",
        countryCode: "CZE",
        city: "Praha",
        addressLineOne: "Konviktská 20",
        addressLineTwo: "Praha 1",
        postalCode: "110 00",
        createdByUuid: adminUuid,
        modifiedByUuid: adminUuid,
      },
      {
        uuid: cvutFsvUuid,
        schoolUuid: cvutUuid,
        name: "Fakulta stavební",
        countryCode: "CZE",
        city: "Praha",
        addressLineOne: "Thákurova 7",
        addressLineTwo: "Praha 6",
        postalCode: "166 29",
        createdByUuid: adminUuid,
        modifiedByUuid: adminUuid,
      },
    ],
  });
}

async function seedOtherUsers() {
  await prisma.user.create({
    data: {
      uuid: studentUuid,
      username: "student0",
      email: "student@email.com",
      password: "$2b$10$36Pb6gDQLin7mf/miWIOfeh7w5rDVsQS8TeMlx/rHK78MY65IdvGq",
      role: "STUDENT",
      status: "ACTIVE",
    },
  });
  await prisma.representative.create({
    data: {
      name: "Seed Representative",
      user: {
        create: {
          uuid: represUuid,
          username: "represen",
          email: "represen@email.com",
          password: "$2b$10$36Pb6gDQLin7mf/miWIOfeh7w5rDVsQS8TeMlx/rHK78MY65IdvGq",
          role: "REPRESENTATIVE",
          status: "ACTIVE",
        },
      },
      school: {
        connect: {
          uuid: cvutUuid,
        },
      },
    },
  });
  await prisma.teacher.create({
    data: {
      name: "Seed Teacher",
      user: {
        create: {
          uuid: teacherUuid,
          username: "teacher1",
          email: "teacher@email.com",
          password: "$2b$10$36Pb6gDQLin7mf/miWIOfeh7w5rDVsQS8TeMlx/rHK78MY65IdvGq",
          role: "TEACHER",
          status: "ACTIVE",
        },
      },
      school: {
        connect: {
          uuid: cvutUuid,
        },
      },
      faculty: {
        connect: {
          uuid: cvutFelUuid,
        },
      },
    },
  });
}

async function seedChannels() {
  await prisma.channel.create({
    data: {
      uuid: uuidv4(),
      name: "Demo Seeded Channel",
      description: "This is a demo channel that has been seeded by Prisma client.",
      textId: "demo",
      createdBy: {
        connect: {
          uuid: teacherUuid,
        },
      },
      modifiedBy: {
        connect: {
          uuid: teacherUuid,
        },
      },
    },
  });
}

async function main() {
  await seedAdminUser();
  await seedSchools();
  await seedFaculties();
  await seedOtherUsers();
  await seedChannels();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
