import { PrismaClient, Role } from "@prisma/client";
import { Permission } from "../src/auth/permission.enum";
import { v4 as uuidv4 } from "uuid";

const prisma = new PrismaClient();

const cvutUuid = uuidv4();
const cvutFelUuid = uuidv4();
const cvutFitUuid = uuidv4();
const cvutFaUuid = uuidv4();
const cvutFdUuid = uuidv4();
const cvutFsUuid = uuidv4();
const cvutFsvUuid = uuidv4();

const vseUuid = uuidv4();
const ukUuid = uuidv4();
const vutUuid = uuidv4();

const adminUuid = uuidv4();
const studentUuid = uuidv4();
const teacherUuid = uuidv4();
const represUuid = uuidv4();

async function seedAuthorities() {
  return await prisma.authority.createMany({
    data: [
      { name: Permission[Permission.SCHOOL_CREATE], roles: [Role.ADMIN] },
      { name: Permission[Permission.SCHOOL_READ], roles: [Role.ADMIN] },
      { name: Permission[Permission.SCHOOL_UPDATE], roles: [Role.ADMIN, Role.REPRESENTATIVE] },
      { name: Permission[Permission.SCHOOL_DELETE], roles: [Role.ADMIN] },

      { name: Permission[Permission.FACULTY_CREATE], roles: [Role.ADMIN, Role.REPRESENTATIVE] },
      { name: Permission[Permission.FACULTY_READ], roles: [Role.ADMIN, Role.REPRESENTATIVE] },
      { name: Permission[Permission.FACULTY_UPDATE], roles: [Role.ADMIN, Role.REPRESENTATIVE] },
      { name: Permission[Permission.FACULTY_DELETE], roles: [Role.ADMIN, Role.REPRESENTATIVE] },

      { name: Permission[Permission.REP_REQ_READ], roles: [Role.ADMIN] },
      { name: Permission[Permission.REP_REQ_UPDATE], roles: [Role.ADMIN] },
      { name: Permission[Permission.REP_REQ_VERIFY], roles: [Role.REPRESENTATIVE] },

      { name: Permission[Permission.TEACHER_REQ_READ], roles: [Role.ADMIN, Role.REPRESENTATIVE] },
      { name: Permission[Permission.TEACHER_REQ_UPDATE], roles: [Role.ADMIN, Role.REPRESENTATIVE] },
      { name: Permission[Permission.TEACHER_REQ_VERIFY], roles: [Role.ADMIN, Role.REPRESENTATIVE] },
    ],
  });
}

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
      name: "Seed Demo Representative",
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
  // todo seed a teacher user
}

async function main() {
  await seedAuthorities();
  await seedAdminUser();
  await seedSchools();
  await seedFaculties();
  await seedOtherUsers();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
