import { PrismaClient, Role } from "@prisma/client";
import { Permission } from "../src/auth/permission.enum";

const prisma = new PrismaClient();

async function seedAuthorities() {
  return await prisma.authority.createMany({
    data: [
      { name: Permission[Permission.SCHOOL_CREATE], roles: [Role.ADMIN] },
      { name: Permission[Permission.SCHOOL_UPDATE], roles: [Role.ADMIN, Role.REPRESENTATIVE] },
      { name: Permission[Permission.SCHOOL_DELETE], roles: [Role.ADMIN] },
    ],
  });
}

async function main() {
  await seedAuthorities();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
