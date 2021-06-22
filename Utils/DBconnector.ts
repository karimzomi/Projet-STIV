import {PrismaClient} from "@prisma/client"

declare global{
    var prisma: PrismaClient
}
if (!global.prisma) {
    console.log("Connecting to data base 🐘");
    global.prisma = new PrismaClient()
}
prisma = global.prisma
export default prisma
